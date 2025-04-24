import { useAuth } from "../context/useAuth";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleNavigate = () => {
    nav('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-8">
      <div className="w-full h-70 flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-4xl text-pink-600">SlideGenie</h1>
        <h2 className="font-semibold text-4xl  text-pink-600">Your AI-powered presentation wizard</h2>
      </div>
      <div className="flex gap-16">
        <div onClick={()=>nav('/custom-ppt')} className="h-40 w-60 border-2 border-gray-600 rounded-2xl flex justify-center items-center hover:bg-gray-100 cursor-pointer">
          <h2 className="font-semibold text-pink-400">Create Custom PPT</h2>
        </div>

        <div onClick={()=>nav('/ai-ppt')} className="h-40 w-60 border-2 border-gray-600 rounded-2xl flex justify-center items-center hover:bg-gray-100 cursor-pointer">
          <h2 className="font-semibold text-pink-400">Create PPT With AI</h2>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 mt-30"
      >
        Logout
      </button>
    </div> 
  );
};

export default Home;
