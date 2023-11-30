import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  let navigate = useNavigate();

  return (
    <section className="py-10 block px-10 tablet:px-5 mobile-lg:px-3 mobile-lg:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 grid-row-[auto] gap-16 mobile-lg:grid-cols-1 mobile-lg:gap-5">
          {/* text container */}
          <div className="text-white capitalize flex flex-col justify-center mobile-lg:text-center">
            <h1 className="text-5xl font-semibold tracking-wide laptop:text-4xl tablet-small:text-3xl">Welcome to <span className="text-red-600">Coindex</span>!</h1>
            <p className="text-2xl mt-5 laptop:text-xl tablet-small:text-lg">Get all the lastest information related to crypto coins!</p>
            <div className="flex flex-row gap-12 mt-7 tablet-small:gap-8 mobile-lg:justify-center">
            <button onClick={() => navigate('/coins')} className="text-upppercase text-2xl py-2 px-4 font-bold tracking-widest rounded-md btn-shadow bg-blue-600 active:bg-white active:text-black laptop:text-lg">Coins</button>
            <button onClick={() => navigate('/exchanges')} className="text-upppercase text-2xl py-2 px-4 font-bold tracking-widest rounded-md btn-shadow bg-primary active:bg-white active:text-black laptop:text-lg">Markets</button>
            </div>
          </div>

          {/* img container */}
          <figure className="mobile-lg:row-start-1">
            <img src="images/bitcoin.webp" className="relative animate-up-down mobile-lg:w-9/12 mobile-lg:block mobile-lg:mx-auto" alt="bitcoin image" />
          </figure>
        </div>
    </section>
  )
}

export default Home;
