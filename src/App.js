import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Pipeline from './components/Pipeline';
import Contacts from './components/Contacts';
import Companies from './components/Companies';
import Marketing from './components/Marketing';
import Welcome from './components/Welcome';
import GrowthAssistant from './components/GrowthAssistant';
import WebScraper from './components/WebScraper';
import InnovationLab from './components/InnovationLab';
import WeeklyCallView from './components/WeeklyCallView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#213343',
    },
    secondary: {
      main: '#00a4bd',
    },
    background: {
      default: '#f5f8fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Header />
          <Sidebar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
              backgroundColor: 'background.default',
            }}
          >
            <Toolbar /> {/* Pour l'espace sous le header fixe */}
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/pipeline" element={<Pipeline />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/webscraper" element={<WebScraper />} />
                <Route path="/innovation" element={<InnovationLab />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Box>
          <GrowthAssistant />
          <div>
            <WeeklyCallView />
          </div>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
