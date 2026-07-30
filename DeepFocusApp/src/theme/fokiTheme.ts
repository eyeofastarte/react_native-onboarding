import { createTheme } from '@rneui/themed';

const palette = {
  indigo: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  warm: {
    white: '#FAF9F6',
    cream: '#F5F1E8',
    sand: '#E8E2D5',
  },
  coral: {
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const fokiLightColors = {
  primary: palette.indigo[600],
  secondary: palette.coral[500],
  background: palette.warm.white,
  white: palette.warm.white,
  black: palette.neutral[900],
  grey0: palette.neutral[50],
  grey1: palette.neutral[100],
  grey2: palette.neutral[200],
  grey3: palette.neutral[300],
  grey4: palette.neutral[400],
  grey5: palette.neutral[500],
  greyOutline: palette.neutral[200],
  searchBg: palette.neutral[100],
  success: '#10B981',
  error: palette.coral[600],
  warning: '#F59E0B',
  disabled: palette.neutral[300],
};

export const fokiDarkColors = {
  primary: palette.indigo[400],
  secondary: palette.coral[400],
  background: palette.neutral[900],
  white: palette.neutral[900],
  black: palette.warm.white,
  grey0: palette.neutral[800],
  grey1: palette.neutral[700],
  grey2: palette.neutral[600],
  grey3: palette.neutral[500],
  grey4: palette.neutral[400],
  grey5: palette.neutral[300],
  greyOutline: palette.neutral[600],
  searchBg: palette.neutral[800],
  success: '#34D399',
  error: palette.coral[400],
  warning: '#FBBF24',
  disabled: palette.neutral[600],
};

export const fokiTheme = createTheme({
  lightColors: fokiLightColors,
  darkColors: fokiDarkColors,
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  components: {
    Button: {
      raised: false,
      radius: 12,
      containerStyle: { borderRadius: 12 },
      titleStyle: { fontWeight: '600' },
    },
    Card: {
      containerStyle: {
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    },
    Input: {
      containerStyle: { paddingHorizontal: 0 },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
      },
    },
    ListItem: {
      containerStyle: {
        borderRadius: 12,
        paddingVertical: 12,
      },
    },
    Switch: {},
    Slider: {},
  },
});
