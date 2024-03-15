import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import TimerDashboard from './components/TimerDashboard';
import Login from './components/Auth/Login';
import { store } from './redux';
import routes from './routes';
import Register from './components/Auth/Register';
import VerifyEmail from './components/Auth/VerifyEmail';
import theme from './theme';
import ChangeColorModeSwitch from './components/Features/ChangeColorModeSwitch';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <ChangeColorModeSwitch />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path={routes.auth.login} element={<Login />} />
            <Route path={routes.timerDashboard.main} element={<TimerDashboard />} />
            <Route path={routes.auth.register} element={<Register />} />
            <Route path={routes.auth.verifyEmail} element={<VerifyEmail />} />
          </Routes>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
