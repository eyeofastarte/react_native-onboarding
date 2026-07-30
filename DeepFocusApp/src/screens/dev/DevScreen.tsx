import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiTestButton } from '@/components/api-test-button';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ToDoList from '@/components/to-do-list';
import UseMemoList from '@/components/UseMemoList';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { DevStackParamList } from '@/navigation/types';

type DevNavigation = StackNavigationProp<DevStackParamList, 'DevHome'>;


const LANGUAGES: { code: string; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'hi', name: 'हिन्दी' },
];

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export function DevScreen() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();
  const activeLanguageCode = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().split(/[-_]/)[0];
  const navigation = useNavigation<DevNavigation>()

  return (
    <ThemedView style={ styles.container}>
      <SafeAreaView style={{ ...styles.safeArea, marginTop: 50 }}>
        {/* Temp fix nestedScrollEnabled :( */}
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} id="check" contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.heroSection}>
            <ThemedText type="subtitle">
              {t('choose-subPage')}
            </ThemedText>
            <Button title="Go to Explore" onPress={() => navigation.navigate('DevExplore')} />
          </ThemedView>

          <ThemedText type="subtitle">
            {t('choose-language')}
          </ThemedText>

          <ThemedView style={styles.languageRow}>
            {LANGUAGES.map((lng) => {
              const active = activeLanguageCode === lng.code;
              return (
                <TouchableOpacity
                  key={lng.code}
                  activeOpacity={0.7}
                  onPress={() => i18n.changeLanguage(lng.code)}
                  style={[styles.languageChip, active && styles.languageChipActive]}
                >
                  <ThemedText style={[styles.languageText, active && styles.languageTextActive]}>
                    {lng.name}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>

          <ApiTestButton />

          <ToDoList></ToDoList>

          <Button title={t('increment-count')+' '+`(${count})`} onPress={() => setCount((c) => c + 1)} />
          <UseMemoList count={count} />

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  languageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  languageChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.35)',
    backgroundColor: 'transparent',
  },
  languageChipActive: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  languageText: {
    fontSize: 14,
  },
  languageTextActive: {
    fontWeight: '600',
  },
});
