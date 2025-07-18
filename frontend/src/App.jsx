import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/useAuth';

import Login from './routes/login';
import Home from './routes/home';
import Register from './routes/register';

import Layout from './components/layout';
import PrivateRoute from './components/private_route';
import CustomPPT from './routes/customPPT';
import AiPPT from './routes/aiPPT';
import Presentaion from './routes/presentaion';
import Profile from './routes/profile';
import BuildPage from './routes/build';
import PricingPage from './routes/pricing';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout><Home /></Layout>} path='/' />
          <Route element={<PrivateRoute><Layout><BuildPage /></Layout></PrivateRoute>} path='/build' />
          <Route element={<PrivateRoute><Layout><PricingPage /></Layout></PrivateRoute>} path='/pricing' />
          <Route element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} path='/profile' /> 
          <Route element={<PrivateRoute><Layout><Presentaion /></Layout></PrivateRoute>} path='/presentation/:pid' /> 
          <Route element={<Login />} path='/login' /> 
          <Route element={<Register />} path='/register' /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
