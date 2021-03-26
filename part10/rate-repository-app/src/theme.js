import { Platform } from 'react-native';

const mainFontPlatform = Platform.select({
  android: 'Roboto',
  ios: 'Arial',
  default: 'System',
});

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    bar: '#24292e',
    background: '#e1e4e8',
    white: '#fff',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: mainFontPlatform
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;