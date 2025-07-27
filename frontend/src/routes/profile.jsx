import React, { useEffect, useState } from 'react'
import { get_user_info, edit_user_profile } from '../api/endpoints'
import { User, Edit3, Camera, Calendar, Mail, Users, Save, X, Check } from 'lucide-react'
import useUserStore from '../store/useUserStore';
import UserPpts from '../components/user_ppts';

function Profile() {
  // Zustand user info state
  const {
    userInfo,
    userInfoLoading,
    userInfoError,
    setUserInfo,
    setUserInfoLoading,
    setUserInfoError,
  } = useUserStore();

  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({ first_name: '', last_name: '', profile_picture: null })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [editSuccess, setEditSuccess] = useState(null)

  useEffect(() => {
    if (userInfo) {
      setEditData({ first_name: userInfo.first_name || '', last_name: userInfo.last_name || '', profile_picture: null })
    } else if (!userInfoLoading && !userInfoError) {
      // Fetch user info if not present
      const fetchUser = async () => {
        setUserInfoLoading(true)
        setUserInfoError(null)
        const data = await get_user_info()
        if (data && data.username) {
          setUserInfo(data)
          setEditData({ first_name: data.first_name || '', last_name: data.last_name || '', profile_picture: null })
        } else {
          setUserInfoError('Failed to load user info')
        }
        setUserInfoLoading(false)
      }
      fetchUser()
    }
  }, [userInfo, userInfoLoading, userInfoError, setUserInfo, setUserInfoLoading, setUserInfoError])

  if (userInfoLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading profile...</p>
      </div>
    </div>
  )

  if (userInfoError) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-red-800 font-medium">{userInfoError}</p>
        </div>
      </div>
    </div>
  )

  const handleEditChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'profile_picture') {
      setEditData((prev) => ({ ...prev, profile_picture: files[0] }))
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)
    setEditSuccess(null)
    
    const formData = new FormData()
    formData.append('first_name', editData.first_name)
    formData.append('last_name', editData.last_name)
    if (editData.profile_picture) {
      formData.append('profile_picture', editData.profile_picture)
    }
    
    const result = await edit_user_profile(formData)
    if (result && result.success) {
      // Update Zustand store with new user info
      setUserInfo({ ...userInfo, ...result })
      setEditSuccess('Profile updated successfully!')
      setEditMode(false)
    } else {
      setEditError('Failed to update profile')
    }
    setEditLoading(false)
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="px-6 py-12 w-full">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          </div>

          {/* Main Profile Section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

            {/* Profile Header - Horizontal Layout */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                {/* Left Section - Profile Info */}
                <div className="flex items-center space-x-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                      {userInfo?.profile_picture ? (
                        <img
                          src={userInfo.profile_picture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {editMode && (
                      <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1.5 cursor-pointer hover:bg-purple-600 transition-colors">
                        <Camera className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* User Details */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {userInfo?.first_name && userInfo?.last_name
                        ? `${userInfo.first_name} ${userInfo.last_name}`
                        : userInfo?.username}
                    </h2>
                    <p className="text-gray-600 mb-2">@{userInfo?.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {userInfo?.email}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {userInfo?.total_presentations || 0} presentations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Edit Button */}
                <button
                  onClick={() => setEditMode((v) => !v)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  {editMode ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {!editMode ? (
                // View Mode - Horizontal Grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="font-medium text-gray-900">{userInfo?.first_name || 'Not set'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium text-gray-900">{userInfo?.last_name || 'Not set'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Presentations</p>
                        <p className="font-medium text-gray-900">{userInfo?.total_presentations || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Member since</p>
                        <p className="font-medium text-gray-900">
                          {userInfo?.joined_date
                            ? new Date(userInfo.joined_date).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                              })
                            : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                // Edit Mode
                <div className="space-y-6">

                  {/* Form Fields - Horizontal Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={editData.first_name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editData.last_name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={editLoading}
                      onClick={handleEditSubmit}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {editError && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <X className="w-4 h-4 text-red-600" />
                      <p className="text-red-800 text-sm">{editError}</p>
                    </div>
                  )}

                  {editSuccess && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-green-800 text-sm">{editSuccess}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <UserPpts />
      </div>
    </div>
  );
}

export default Profile