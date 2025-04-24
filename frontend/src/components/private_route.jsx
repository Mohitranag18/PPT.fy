import React, { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import Layout from './layout';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-3xl font-bold">Loading...</h1>
      </Layout>
    );
  }

  if (user) {
    return children;
  }

  return null;
};

export default PrivateRoute;
