import React from 'react';


const EmptyState = () => {
    return (
        <div
            className="
                px-4
                py-0
                sm:px-6
                lg:px-8
                h-full
                flex
                justify-center
                items-center
                bg-gray-100
            "
        >
            <div
                className="text-center items-center flex flex-col"
            >
                <h3
                    className='
                        mt-2
                        text-1xl
                        font-semibold
                        text-gray-700
                    '
                >Select a chat or start new conversation</h3>
            </div>
        </div>
    );
};

export default EmptyState;