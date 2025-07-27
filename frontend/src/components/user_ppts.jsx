import React, { useEffect, useState } from 'react'
import { list_presentations } from '../api/endpoints'
import { FileText, Loader, X, Plus, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function UserPpts() {
  const [presentations, setPresentations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPresentations = async () => {
      setLoading(true)
      setError(null)
      const data = await list_presentations()
      if (data && Array.isArray(data)) {
        setPresentations(data)
      } else {
        setError('Failed to load presentations')
      }
      setLoading(false)
    }
    fetchPresentations()
  }, [])

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Presentations</h2>
        {/* Placeholder for future add button */}
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
          <Plus onClick={() => navigate(`/build`)} className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>
      {loading ? (
        <div className="flex items-center space-x-2 p-6 justify-center">
          <Loader className="w-5 h-5 animate-spin text-purple-500" />
          <span className="text-gray-600 font-medium">Loading presentations...</span>
        </div>
      ) : error ? (
        <div className="flex items-center space-x-2 p-6 bg-red-50 border border-red-200 rounded-lg justify-center">
          <X className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">{error}</span>
        </div>
      ) : presentations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-100">
          <FileText className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-gray-600 font-medium">No presentations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {presentations.map((ppt) => (
            <div
              key={ppt.pid}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold text-lg text-gray-900 truncate" title={ppt.pname}>{ppt.pname}</h3>
              </div>
              <div className="flex-1" />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-4 mb-4">
                <span>Theme: <span className="capitalize">{ppt.theme}</span></span>
                <span>{ppt.pdata ? `${ppt.pdata.length} slides` : '0 slides'}</span>
              </div>
              <button
                onClick={() => navigate(`/presentation/${ppt.pid}`)}
                className="flex items-center justify-center gap-1 w-full py-2 border border-purple-200 text-purple-700 bg-purple-50 rounded-lg font-medium text-sm hover:bg-purple-100 hover:border-purple-400 transition-colors duration-150"
                title="View Presentation"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserPpts