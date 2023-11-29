import React, { useEffect, useState } from "react";
import server from "../../main";
import axios from "axios";
import Loader from "../Loader";
import Coincard from "./Coincard";
import NetworkError from "../NetworkError";

const Coins = () => {

  //state to set the api data
  let [coinsData, setCoinsData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error,setError] = useState(false);
  let [currency,setCurrency] = useState("usd");
  let [pages,setPages] = useState(1);

  let nextPage = ()=>{
     if(pages == 100)
     return 

     setPages(pages + 1);
  }

  let previousPage = ()=>{

    if(pages == 1)
    return 

    setPages(pages - 1);
  }

  useEffect(() => {
    //make a function to fetch data
    let fetchCoinsData = async () => {

      //making try catch to face the error
      try {

        let { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${pages}`);
        setCoinsData(data);
        setLoading(false);
        console.log(data);
        

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
          <h1 className="text-center uppercase text-5xl font-semibold text-white mb-10 tracking-widest main-heading mobile:text-4xl mobile:leading-[1.5] mobile:mb-6">
            Crypto Coins
          </h1>
          {/* grid container */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 grid-rows-[auto] gap-7 tablet:grid-cols-2 mobile:grid-cols-1">
            {/* component */}
            {coinsData.map((coin) => (
              <Coincard
                key={coin.id}
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
