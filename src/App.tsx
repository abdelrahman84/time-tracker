import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import TimerDashboard from './components/TimerDashboard';
import Login from './components/Auth/Login';
import { store } from './state';
import routes from './routes';
import Register from './components/Auth/Register';
import VerifyEmail from './components/Auth/VerifyEmail';
import theme from './theme';
import ChangeColorModeSwitch from './components/Features/ChangeColorModeSwitch';
import BetaRibbon from './components/Features/BetaRibbon';
import ResetPassword from './components/Auth/ResetPassword';

function AppContent() {
  return (
    <>
      <BetaRibbon />
      <ChangeColorModeSwitch />
      <Routes>
        <Route path="/" element={<Navigate to={routes.timerDashboard.main} />} />

        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.register} element={<Register />} />

        <Route
          path={routes.timerDashboard.main}
          element={<TimerDashboard />}
        />

        <Route path={routes.auth.verifyEmail} element={<VerifyEmail />} />
        <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <AppContent />
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
