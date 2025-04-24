import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const nav = useNavigate();

  return (
    <div className='h-20 w-full flex justify-between items-center px-16 py-8'>
        <div>
            <h1 className='font-bold text-2xl cursor-pointer'>SideGine</h1>
        </div>
        <div className='flex gap-6'>
            <p onClick={()=>nav('/')} className='font-semibold cursor-pointer'>Home</p>
            <p onClick={()=>nav('/custom-ppt')} className='font-semibold cursor-pointer'>Custom-PPT</p>
            <p onClick={()=>nav('/ai-ppt')} className='font-semibold cursor-pointer'>AI-PPT</p>
            <p onClick={()=>nav('/')} className='font-semibold cursor-pointer'>Profile</p>
        </div>
    </div>
  )
}

export default Header