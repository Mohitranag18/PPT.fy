import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";
import { ChevronDown, Menu, X, User, Settings, LogOut, Sparkles } from 'lucide-react';
import useUserStore from '../store/useUserStore';
import { get_user_info } from '../api/endpoints';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Zustand user info state
  const {
    userInfo,
    userInfoLoading,
    userInfoError,
    setUserInfo,
    setUserInfoLoading,
    setUserInfoError,
  } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUserInfoLoading(true);
      setUserInfoError(null);
      const data = await get_user_info();
      if (data && data.username) {
        setUserInfo(data);
      } else {
        setUserInfoError('Failed to load user info');
      }
      setUserInfoLoading(false);
    };
    if (!userInfo && !userInfoLoading && !userInfoError) {
      fetchUserInfo();
    }
  }, [userInfo, userInfoLoading, userInfoError, setUserInfo, setUserInfoLoading, setUserInfoError]);

  const { logoutUser } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };
  
  const handleLogout = async () => {
    // Clear user info from store on logout
    setUserInfo(null);
    await logoutUser();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Custom PPT', path: '/custom-ppt' },
    { label: 'AI Generator', path: '/ai-ppt' },
    { label: 'Pricing', path: '/pricing' }
  ];

  return (
    <header className='h-16 w-full flex justify-between items-center px-6 bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
      {/* Logo */}
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center'>
          <Sparkles size={16} className='text-white' />
        </div>
        <h1 
          onClick={() => handleNavigation('/')}
          className='font-bold text-xl cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
        >
          PPT.fy
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex items-center gap-1'>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200'
          >
            {item.label}
          </button>
        ))}
        
        {/* Profile Dropdown */}
        <div className='relative ml-4'>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200'
          >
            <div className='w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center overflow-hidden'>
              {userInfo && userInfo.profile_picture ? (
                <img src={userInfo.profile_picture} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={12} className='text-white' />
              )}
            </div>
            <ChevronDown size={14} className={`transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isProfileOpen && (
            <div className='absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <p className='text-sm font-medium text-gray-900'>
                  {userInfo && (userInfo.first_name || userInfo.last_name)
                    ? `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim()
                    : userInfo?.username || 'User'}
                </p>
                <p className='text-xs text-gray-500'>{userInfo?.email || ''}</p>
              </div>
              <button
                onClick={() => handleNavigation('/profile')}
                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                <User size={16} />
                Profile Settings
              </button>
              <button
                onClick={() => handleNavigation('/account')}
                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
              >
                <Settings size={16} />
                Account Settings
              </button>
              <div className='border-t border-gray-100 mt-2 pt-2'>
                <button
                  onClick={handleLogout}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200'
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden'>
          <div className='px-6 py-4 space-y-2'>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className='w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200'
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Profile Section */}
            <div className='border-t border-gray-200 pt-4 mt-4'>
              <div className='px-4 py-2 mb-2 flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden'>
                  {userInfo && userInfo.profile_picture ? (
                    <img src={userInfo.profile_picture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={18} className='text-white' />
                  )}
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {userInfo && (userInfo.first_name || userInfo.last_name)
                      ? `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim()
                      : userInfo?.username || 'User'}
                  </p>
                  <p className='text-xs text-gray-500'>{userInfo?.email || ''}</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation('/profile')}
                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors'
              >
                <User size={16} />
                Profile Settings
              </button>
              <button
                onClick={() => handleNavigation('/account')}
                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors'
              >
                <Settings size={16} />
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors'
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;