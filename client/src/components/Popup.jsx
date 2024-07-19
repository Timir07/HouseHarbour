import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="max-sm:w-1/2 max-sm:flex-col fixed top-1/2 right-8 p-1 sm:p-4 rounded-md shadow-md bg-white flex sm:gap-4 justify-center items-center z-[1000] text-blue-600 ">
  
        <h2 className='text-center'>{message}</h2>
        <button onClick={onClose} className='text-red-500'>Close</button>
    
    </div>
  );
};

export default Popup;

