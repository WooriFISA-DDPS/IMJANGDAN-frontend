import React from 'react'

const IconButton = ({ textColor, icon }) => {
    const pd = (e) => {
        e.preventDefault();
        e.stopPropagation()
    }

    return (
        <button 
            className={`w-8 text-xl font-semibold cursor-pointer ${textColor}`}
            onClick={pd}
        >
            {icon}
        </button>
    )
}

export default IconButton