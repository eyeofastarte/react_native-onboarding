import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

let overlayNotificationId: string | null = null;

// Notification guard to stop feature conflict on ExpoGo
function shouldDisableNotificationsRuntime() {
  if (Platform.OS !== 'android') return false;

  const executionEnvironment = (Constants as any)?.executionEnvironment;
  const appOwnership = (Constants as any)?.appOwnership;
  return executionEnvironment === 'storeClient' || appOwnership === 'expo';
}

async function ensureAndroidNotificationChannel() {
  if (Platform.OS !== 'android') return;
  if (shouldDisableNotificationsRuntime()) return;
  if (typeof Notifications.setNotificationChannelAsync !== 'function') return;

  await Notifications.setNotificationChannelAsync('session-overlay', {
    name: 'Session Overlay',
    importance: Notifications.AndroidImportance.HIGH,
    sound: null,
    vibrationPattern: [0],
  });
}

async function ensureNotificationsPermission() {
  if (shouldDisableNotificationsRuntime()) return false;

  await ensureAndroidNotificationChannel();

  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') return true;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.status === 'granted';
}

export async function showLightModeTimerOverlayNotification(remaining: string) {
  try {
    const granted = await ensureNotificationsPermission();
    if (!granted) return;

    if (overlayNotificationId != null) {
      await Notifications.dismissNotificationAsync(overlayNotificationId);
      overlayNotificationId = null;
    }

    overlayNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Foki Study Session Running',
        body: `Focus timer: ${remaining} remaining`,
        sticky: true,
        sound: false,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        channelId: 'session-overlay',
      },
    });
  } catch {
    // best-effort overlay notification
  }
}

export async function clearLightModeTimerOverlayNotification() {
  try {
    if (shouldDisableNotificationsRuntime()) return;

    if (overlayNotificationId != null) {
      await Notifications.dismissNotificationAsync(overlayNotificationId);
      overlayNotificationId = null;
    }
  } catch {
    // noop
  }
}
