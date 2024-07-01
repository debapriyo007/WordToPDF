import React from 'react'
import { FaGithub } from "react-icons/fa6";

const Navbar = () => {
  return (
    <>
        <div className='max-w-full py-2  mx-auto container px-6
        md:px-40 shadow-lg h-16 fixed'>

          <div className='flex justify-between items-center'>
            <h1 className='md:text-3xl text-2xl cursor-pointer font-bold'>Word <span className='md:text-4xl text-3xl text-green-500'>To </span>PDF</h1>
            {/* <div className='flex gap-7 pt-1'>
            <h1 className='text-xl cursor-pointer '>Home</h1>
            <h1 className='text-xl cursor-pointer '>About</h1>
            <h1 className='text-xl cursor-pointer '>Info</h1>
            </div> */}

            
            <a href="https://github.com/debapriyo007" target='_blank'>
                <div className='flex gap-2 border-2 border-black py-1 px-3 rounded-xl cursor-pointer'>
                <FaGithub className='md:text-4xl text-2xl cursor-pointer'/>
                <h2 className=' md:text-xl  text-md mt-1 '>GitHub</h2>
                </div>
            </a>
            
          </div>

        </div>
    </>
  )
}

export default Navbar
