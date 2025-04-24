import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuth();
  const nav = useNavigate();

  const handleLogin = async () => {
    await loginUser(username, password);
  };

  const handleNavigate = () => {
    nav('/register');
  };

  return (
    <div className="flex flex-col w-[70%] max-w-md min-h-[500px] justify-start items-start p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-5">Login</h1>

      <div className="w-full mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="email"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your username here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="w-full mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-3 transition duration-200"
      >
        Login
      </button>

      <p
        onClick={handleNavigate}
        className="text-sm text-gray-600 cursor-pointer hover:underline"
      >
        Don't have an account? Sign up
      </p>
    </div>
  );
};

export default Login;
