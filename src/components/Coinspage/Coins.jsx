import React, { useEffect, useState } from "react";
import server from "../../main";
import axios from "axios";
import Loader from "../Loader";
import Coincard from "./Coincard";
import NetworkError from "../NetworkError";
import { IoIosArrowDown } from "react-icons/io";

const Coins = () => {

  //state to set the api data
  let [coinsData, setCoinsData] = useState([]);
  let [loading, setLoading] = useState(true);

  //state to check error
  let [error,setError] = useState(false);
  let [currency,setCurrency] = useState("usd");

  //state to change pages
  let [pages,setPages] = useState(1);

  //function to send user to the next page
  let nextPage = ()=>{
     if(pages == 100)
     return 

     setPages(pages + 1);
  }

  //function to send user to the previous page
  let previousPage = ()=>{

    if(pages == 1)
    return 

    setPages(pages - 1);
  }

  //function to change currency
  let changeCurrency = (e)=>{
    let newCurrency = e.target.value;
    setCurrency(newCurrency);
  }

  useEffect(() => {
    //make a function to fetch data
    let fetchCoinsData = async () => {

      //making try catch to face the error
      try {

        let { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${pages}`);
        setCoinsData(data);
        setLoading(false);
        

      } catch (error) {
          setLoading(false);
          setError(true);
      }
     
    };

    //call the function
    fetchCoinsData();
  }, [currency,pages]);

  if(error)
  return <NetworkError/>


  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className="py-10 px-7">
          <h1 className="text-center uppercase text-5xl font-semibold text-white mb-10 tracking-widest main-heading mobile:text-3xl mobile:leading-[1.5] mobile:mb-6">
            Crypto Coins
          </h1>

          {/* currency changer */}
          <div className="relative max-w-[10rem] mx-auto">
          <select onChange={changeCurrency} className="block mx-auto mb-10 font-mono text-2xl tracking-widest bg-primary text-white py-2 px-2 rounded-md shadow-md shadow-white appearance-none font-semibold w-[9rem] text-center cursor-pointer" name="" id="">
            <option value="usd">USD</option>
            <option value="inr">INR</option>
          </select>
          <IoIosArrowDown className="absolute text-white z-10 top-4 text-xl font-semibold right-7"/>
          </div>

          {/* grid container */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 grid-rows-[auto] gap-7 tablet:grid-cols-2 mobile:grid-cols-1">
            {/* component */}
            {coinsData.map((coin) => (
              <Coincard
                key={coin.id}
                id={coin.id}
                symbol = {coin.symbol}
                name={coin.name}
                price = {coin.current_price}
                imgsrc={coin.image}
                currency = {currency}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto flex flex-row flex-wrap justify-between text-2xl font-semibold text-white mt-8 mobile:text-xl">
            <button onClick={previousPage} disabled={pages == 1} className="tracking-wider disabled:opacity-50 disabled:active:bg-primary disabled:active:text-white bg-primary box-content px-4 py-2 rounded-md btn-shadow cursor-pointer active:bg-white active:text-black">Previous</button>
             
            <button onClick={nextPage} disabled={pages==100} className="tracking-wider disabled:opacity-50 disabled:active:bg-primary disabled:active:text-white bg-primary box-content px-4 py-2 rounded-md btn-shadow cursor-pointer active:bg-white active:text-black">Next</button>
          </div>
        </section>
      )}
    </>
  );

 
};

export default Coins;
