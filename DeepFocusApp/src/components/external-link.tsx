import { Link } from '@react-navigation/native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

// type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, onPress, ...rest }: any) {
  return (
    <Link
      {...rest}
      href={href}
      target="_blank"
      onPress={async (event) => {
        onPress?.(event);
        if (event.defaultPrevented) return;

        if (Platform.OS !== 'web') {
          event.preventDefault();
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
