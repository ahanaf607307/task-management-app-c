import { Spinner } from 'flowbite-react';
import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
           <Spinner aria-label="Extra large spinner example" size="xl" /> 
        </div>
    );
};

export default Loading;