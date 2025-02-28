import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/archivo-black/400.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/600.css';

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      color1: string;
      color2: string;
    };
  }

  interface PaletteOptions {
    customColors?: {
      color1?: string;
      color2?: string;
    };
  }

  interface TypeText {
    tertiary: string; // Add tertiary here
  }
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Space Grotesk',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Archivo Black',
      fontSize: '4rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'Archivo Black',
      fontSize: '2.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: 'Archivo Black',
      fontSize: '2.2rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: 'Archivo Black',
      fontSize: '1.6rem',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'Space Grotesk',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#FF5E1A',
    },
    background: {
      default: '#282828',
      paper: '#DAD9D9',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#282828',
      tertiary: '#f7f5f3',
    },
    customColors: {
      color1: '#1e1e1e',
      color2: '#303030',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Space Grotesk',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'uppercase',
        },
        containedPrimary: {
          borderRadius: '9999px', // pill shape
          padding: '0.3em 1em',
          '&:hover': {
            backgroundColor: '#FF5E1A', // slightly different hover state if needed
          },
        },
        outlinedPrimary: {
          borderRadius: '9999px',
          padding: '0.3em 1em',
          border: '1px solid #FF5E1A',
          '&:hover': {
            border: '1px solid #FF5E1A',
            backgroundColor: 'rgba(255, 94, 26, 0.1)',
          },
        },
        textPrimary: {
          borderRadius: '9999px',
          padding: '0.3em 0',
          textDecoration: 'underline',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '9999px',
            '& fieldset': {
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#FF5E1A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF5E1A',
            },
          },
          '& .MuiInputBase-input': {
            padding: '8px 15px',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        button, a, .transition-element {
          transition: all 0.3s ease;
        }
      `,
    },
  },
  shape: {
    borderRadius: 9999,
  },
});

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default theme;