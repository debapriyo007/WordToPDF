import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [selectedFile, SetselectedFile] = useState(null)
  const handleChange = (e)=>{
    // console.log(e.target.files[0]);
    SetselectedFile(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedFile){
      toast.error('Please Select File!', {
      });
    }
    const formData = new FormData()
    formData.append('file', selectedFile)
    try{
      //call our api
      const response = await axios.post("http://localhost:3000/convertFile", formData, {
        responseType: 'blob',

      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, ".pdf"));
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      

      toast.success('File Converted Successfully!', {
      });
      toast.success('File Downloaded!', {
      });
      selectedFile(null)
     
    }catch(err){
      console.log(err.message);
    }
    
  }
  return (
   
    <>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition: Bounce
          />
    
      <div
        className="max-w-screen-2xl py-3 mx-auto container px-6
        md:px-40" 
        >
        <div className="flex h-screen items-center justify-center ">
          <div
            className="border-2 border-dashed px-4 py-7 
                md:px-10  md:py-16 border-green-500 rounded-lg shadow-lg "
          >
            <h1 className="md:text-4xl text-3xl font-bold text-center mb-4 ">
              Convert <span className='md:text-4xl text-3xl text-green-500'>Word To PDF</span> Online Here<span className='text-4xl text-green-500'> .</span>
            </h1>
            <p className="md:text-md  text-sm text-center mb-5 text-gray-400">
              Easily convert Word Document to PDF format online , without having
              to install any software.
            </p>
         
          <div className="flex flex-col items-center space-y-4 gap-y-5">
            <input
              type="file"
              accept=".doc, .docx"
              onChange={handleChange}
              className="hidden"
              id="FileInput"
            />
            <label htmlFor="FileInput"
            className="w-full flex items-center justify-center px-4 py-6
            bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-green-700 hover:text-white"
            >
                <FaFileWord className="text-2xl mr-3" />
                <span className="md:text-xl text-md mr-2 hover:text-white uppercase">{selectedFile ? selectedFile.name :
                  "Choose File "}</span>
            </label>

            <div>
                 <button 
                 onClick={handleSubmit}
                //  disabled = {!selectedFile }
                 className=" text-white md:text-xl text-md bg-green-600 hover:bg-green-700 duration-300 px-3 py-2 md:px-5 md:py-2.5 rounded-md
                 disabled:opacity-50 disabled:cursor-not-allowed
                 ">Convert File</button>
            </div>
           
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
