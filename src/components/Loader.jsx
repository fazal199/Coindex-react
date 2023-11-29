import React from 'react'

const Loader = () => {
  return (
    <div className='h-[75vh] flex flex-row justify-center items-center'>
      <div className="animate-spin h-36 w-36 rounded-full border-8 border-solid border-white boder-left-transparent mobile:h-20 mobile:w-20">
      </div>
    </div>
  )
}

export default Loader
