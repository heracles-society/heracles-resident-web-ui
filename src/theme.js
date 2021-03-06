import {createMuiTheme} from '@material-ui/core/styles';

// A custom theme for this app
const theme = themeType => {
  const isDark = themeType === 'dark';
  return createMuiTheme({
    typography: {
      fontFamily: 'Roboto',
      fontFamilyTitle: 'Rubik',
    },
    palette: {
      type: themeType,
      background: {
        // default: isDark ? '#333745' : '#F9F6F0',
        // paper: isDark ? '#292C3B' : '#FFFFFF',
        default: isDark ? '#0D0E0B' : '#F9F6F0',
        paper: isDark ? '#151712' : '#FFFFFF',
      },
      primary: {
        main: '#E0607E',
      },
      secondary: {
        main: '#0081A7',
      },
      error: {
        main: '#E63462',
      },
      success: {
        main: '#64B6AC',
      },
    },
  });
};

export default theme;
