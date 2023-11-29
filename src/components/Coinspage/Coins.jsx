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
  let [currency,setCurrency] = useState("inr");
  let [pages,setPages] = useState(101);

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
                name={coin.name}
                url={coin.url}
                imgsrc={coin.image}
                rank={coin.trust_score_rank}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Coins;
