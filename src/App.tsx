import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Login from './components/Auth/Login';
import TimerDashboard from './components/TimerDashboard';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/timer-dashboard" element={<TimerDashboard />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
