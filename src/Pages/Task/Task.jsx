import React from 'react';
import Drag from '../../Components/Drag';

const Task = () => {
    return (
        <div className='pt-10 p-2 min-h-screen bg-white dark:bg-gray-800'>
            <div className='max-w-7xl mx-auto'>
          
          <h1 className="text-center text-4xl font-bold text-black dark:text-white">Make Your Day</h1>
          <Drag/>
         </div>
        </div>
    );
};

export default Task;