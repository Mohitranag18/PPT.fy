import React, { useEffect, useState } from 'react'
import { get_user_info } from '../api/endpoints'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const data = await get_user_info()
      if (data && data.username) {
        setUser(data)
        setError(null)
      } else {
        setError('Failed to load user info')
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="profile-container" style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Profile</h2>
      {user?.profile_picture && (
        <img src={user.profile_picture} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
      )}
      <div><strong>Username:</strong> {user.username}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>First Name:</strong> {user.first_name}</div>
      <div><strong>Last Name:</strong> {user.last_name}</div>
      <div><strong>Total Presentations:</strong> {user.total_presentations}</div>
      <div><strong>Joined:</strong> {user.joined_date ? new Date(user.joined_date).toLocaleDateString() : ''}</div>
    </div>
  )
}

export default Profile