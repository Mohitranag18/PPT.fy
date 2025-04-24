import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/useAuth';

import Login from './routes/login';
import Home from './routes/home';
import Register from './routes/register';

import Layout from './components/layout';
import PrivateRoute from './components/private_route';
import CustomPPT from './routes/customPPT';
import AiPPT from './routes/aiPPT';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} path='/' /> 
          <Route element={<PrivateRoute><Layout><CustomPPT /></Layout></PrivateRoute>} path='/custom-ppt' />
          <Route element={<PrivateRoute><Layout><AiPPT /></Layout></PrivateRoute>} path='/ai-ppt' /> 
          <Route element={<Layout><Login /></Layout>} path='/login' /> 
          <Route element={<Layout><Register /></Layout>} path='/register' /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
