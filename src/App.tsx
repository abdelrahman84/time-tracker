import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import GuardedRoute from './utils/guardedRoutes';
import GuestRoute from './utils/guestRoutes';
import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <ChangeColorModeSwitch />
          <Routes>
            <Route path="/" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />

            <Route path={routes.auth.login} element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />

            <Route path={routes.auth.register} element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } />

            <Route path={routes.timerDashboard.main} element={
              <GuardedRoute>
                <TimerDashboard
                />
              </GuardedRoute>
            } />

            <Route path={routes.auth.verifyEmail} element={<VerifyEmail />} />
            <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
          </Routes>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
