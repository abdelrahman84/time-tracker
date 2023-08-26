import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import TimerDashboard from './components/TimerDashboard';
import Login from './components/Auth/Login';
import { store } from './redux';
import routes from './routes';
import Register from './components/Auth/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path={routes.auth.login} element={<Login />} />
            <Route path={routes.timerDashboard.main} element={<TimerDashboard />} />
            <Route path={routes.auth.register} element={<Register />} />
          </Routes>
        </ChakraProvider>
      </Router>
    </Provider>
  );
}

export default App;
