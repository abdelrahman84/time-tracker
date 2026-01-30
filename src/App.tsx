import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

import './App.scss';
import TimerDashboard from './components/TimerDashboard';
import Login from './components/Auth/Login';
import { store, useAppDispatch } from './state';
import routes from './routes';
import Register from './components/Auth/Register';
import VerifyEmail from './components/Auth/VerifyEmail';
import theme from './theme';
import ChangeColorModeSwitch from './components/Features/ChangeColorModeSwitch';
import BetaRibbon from './components/Features/BetaRibbon';
import GuardedRoute from './utils/guardedRoutes';
import GuestRoute from './utils/guestRoutes';
import ResetPassword from './components/Auth/ResetPassword';
import { refreshToken } from './state/UserReducer';
import { User } from './types/user';

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for access token in localStorage on app boot
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        const accessToken = user.access_tokens?.access;
        const refreshTokenValue = user.access_tokens?.refresh;

        // If we have an access token, try to refresh it
        if (accessToken && refreshTokenValue) {
          dispatch(refreshToken());
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <>
      <BetaRibbon />
      <ChangeColorModeSwitch />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path={routes.auth.login}
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path={routes.auth.register}
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path={routes.timerDashboard.main}
          element={
            <GuardedRoute>
              <TimerDashboard />
            </GuardedRoute>
          }
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
