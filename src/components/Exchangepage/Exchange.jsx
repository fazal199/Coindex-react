import React, { useEffect, useState } from "react";
import server from "../../main";
import axios from "axios";
import Loader from "../Loader";
import Exchangecard from "./Exchangecard";
import NetworkError from "../NetworkError";


const Exchange = () => {
  //state to set the api data
  let [exchangeData, setExchangeData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error,setError] = useState(false);

  useEffect(() => {
    //make a function to fetch data
    let fetchExhangeData = async () => {

      //making try catch to face the error
      try {

        let { data } = await axios.get(`${server}/exchanges`);
        setExchangeData(data);
        setLoading(false);

      } catch (error) {
          setLoading(false);
          setError(true);
      }
     
    };

    //call the function
    fetchExhangeData();
  }, []);

  if(error)
  return <NetworkError/>

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className="py-10 px-7">
          <h1 className="text-center uppercase text-5xl font-semibold text-white mb-10 tracking-widest main-heading mobile:text-3xl mobile:leading-[1.5] mobile:mb-6">
            top exchange markets
          </h1>
          {/* grid container */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 grid-rows-[auto] gap-7 tablet:grid-cols-2 mobile:grid-cols-1">
            {/* component */}
            {exchangeData.map((platform) => (
              <Exchangecard
                key={platform.id}
                name={platform.name}
                url={platform.url}
                imgsrc={platform.image}
                rank={platform.trust_score_rank}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Exchange;
