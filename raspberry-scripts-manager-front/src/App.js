
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import {
  HashRouter, Route, Routes
} from "react-router-dom";
import './App.css';
import Test from './components/Test';

function App() {
  const colorMode = "暗色"
  const dark = useMemo(() => {
    if (colorMode === "跟随系统") {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      return colorMode === "暗色"
    }
  }, [colorMode])

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#303030' : '#ECEFF1')
  }, [dark])
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: dark ? '#303030' : "#ECEFF1",
            "a: link": {
              color: dark ? '#00796b' : "#00796b",
            },
            "a: visited": {
              color: dark ? '#00796b' : "#00796b",
            },
            "a: active": {
              color: dark ? '#00796b' : "#00796b",
            },
          },
        },
      },
    },

    palette: dark ? {
      primary: {
        main: "#00796B",
      },
      secondary: {
        main: "#d90051",
      },
      background: {
        main: "#303030",
        secondary: "#fefefe",
        mainCard: "#fdfdfd",
        read: "#9E9E9E",
        readHover: "#BDBDBD",
        tag: "#00796b",
        tagHover: "#009688",
        pageShadow: "8px 8px 16px #c4c4c4,-8px -8px 16px #ffffff"
      },
      text: {
        primary: "#ffffff",
        secondary: "#dddddd",
      },
      page: {
        background: "#303030",
        shadow: "8px 8px 16px #252525,-8px -8px 16px #3b3b3b"
      },

      keyBase:{
        color: "#fefefe",
        backgroundColor: "#303030",
        borderColor: "#00796B", 
        down:{
          backgroundColor: "#AFAFAF"
        }
      }
    }
      :
      {
        primary: {
          main: "#d90051",
        },
        secondary: {
          main: "#00796B",
        },
        background: {
          main: "#ECEFF1",
          secondary: "#fefefe",
          mainCard: "#fdfdfd",
          read: "#9E9E9E",
          readHover: "#BDBDBD",
          tag: "#00796b",
          tagHover: "#009688",
          pageShadow: "8px 8px 16px #c4c4c4,-8px -8px 16px #ffffff"
        },
        text: {
          primary: "#000000",
          secondary: "#757575",
        },
        page: {
          background: "#ECEFF1",
        },
        keyBase:{
          color: "#000000",
          backgroundColor: "#ECEFF1",
          borderColor: "#d90051", 
          down:{
            backgroundColor: "#AFAFAF"
          }
        }
      }
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id='mainContainer' style={{ backgroundColor: theme.palette.page.background, width: "100%" }}    >
        <HashRouter>
          <Routes>
            <Route path="*" element={<Test/>} />
          </Routes>
        </HashRouter>
      </div >
    </ThemeProvider>
  );
}

export default App;
