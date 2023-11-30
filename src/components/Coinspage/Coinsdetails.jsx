import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import axios from "axios";
import server from "../../main";
import NetworkError from "../NetworkError";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Chart from "./Chart";

const Coinsdetails = () => {
  let { id } = useParams();

  let [coinData, setCoinData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [currency, setCurrency] = useState("inr");
  let [chartArray, setChartArray] = useState([]);
  let [days, setDays] = useState("24h");

  let currencySymbol = currency == "inr" ? "₹" : "$";

  const buttons = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  let changeCurrency = (e) => {
    let newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  let switchChartStats = (itemname) => {
    switch (itemname) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
    }
  };

  useEffect(() => {
    //make a function to fetch data
    let fetchCoinData = async () => {
      //making try catch to face the error
      try {
        let { data } = await axios.get(`${server}/coins/${id}`);
        let { data: chartData } = await axios.get(
          `${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);

        setCoinData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    //call the function
    fetchCoinData();
  }, [currency, days]);

  if (error) return <NetworkError />;

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className="py-10 px-7 mobile:px-4">
          <h1 className="text-center uppercase text-5xl font-semibold text-white mb-10 tracking-widest main-heading mobile:text-3xl mobile:leading-[1.5] mobile:mb-6">
            All About {coinData.name}
          </h1>

          {/* currency changer */}
          <div className="relative max-w-[10rem] mx-auto">
            <select
              id="currencychange"
              onChange={changeCurrency}
              className="block mx-auto mb-10 font-mono text-2xl tracking-widest bg-primary text-white py-2 px-2 rounded-md shadow-md shadow-white appearance-none font-semibold w-[9rem] text-center cursor-pointer"
            >
              <option value="inr">INR</option>
              <option value="usd">USD</option>
            </select>
            <label htmlFor="currencychange">
              <IoIosArrowDown className="absolute text-white z-10 top-4 text-xl font-semibold right-8" />
            </label>
          </div>

          {/*Coin Data */}
          <div className="mt-12 max-w-2xl mx-auto">
            <time className="font-mono uppercase text-center text-2xl text-white font-semibold w-full block">
              Last updated: <br />
              {coinData.market_data.last_updated.split(".")[0]}
            </time>
            <figure>
              <img
                className="mx-auto mt-8 shadow-md shadow-white rounded-full"
                src={coinData.image.large}
                alt="bitcoin img"
              />
            </figure>

            {/* Coin main information */}
            <div className="mt-8">
              <div className="uppercase text-center text-2xl text-white font-semibold tracking-widest mb-5 bg-primary rounded w-44 mx-auto py-3 btn-shadow mt-12">
                Rank: #{coinData.market_cap_rank}
              </div>
              <h5 className="uppercase text-center mt-10 text-3xl text-white font-semibold tracking-widest">
                "{coinData.name}"
              </h5>
              <div className="mt-4 uppercase text-center text-2xl text-white font-semibold">
                {currencySymbol}
                {coinData.market_data.current_price[currency]}
              </div>
              <div className="mt-4 uppercase text-center text-2xl text-white font-semibold relative left-[-0.5rem]">
                {/* condition to show increase or decrease logo */}
                {coinData.market_data.market_cap_change_percentage_24h > 0 ? (
                  <IoMdArrowDropup className="inline-block text-green-600" />
                ) : (
                  <IoIosArrowDown className="inline-block mr-1 text-red-600" />
                )}

                <div className="inline-block">
                  {coinData.market_data.market_cap_change_percentage_24h}%
                </div>
              </div>

              {/* progress bar to show min, max, current price of the currency */}
              <div className="text-lg font-semibold text-white mt-16 mobile:text-sm">
                <div className="flex flex-row justify-between">
                  <div>(Lowest)</div>
                  <div>Last 24 Hours Range</div>
                  <div>(Highest)</div>
                </div>
                <progress
                  min={coinData.market_data.low_24h[currency]}
                  max={coinData.market_data.high_24h[currency]}
                  value={coinData.market_data.current_price[currency]}
                  className="w-full"
                ></progress>
                <div className="flex flex-row flex-wrap justify-between mt-1">
                  <div className="bg-red-600 p-1 rounded btn-shadow mobile:px-1">
                    {currencySymbol}
                    {coinData.market_data.low_24h[currency]}
                  </div>
                  <div className="bg-green-600 p-1 rounded btn-shadow mobile:px-1">
                    {currencySymbol}
                    {coinData.market_data.high_24h[currency]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="max-w-[70rem] mx-auto my-28">
          <div>
            <h5 className="uppercase text-center text-3xl text-white font-semibold tracking-widest mb-12 mobile:text-2xl">
              [Chart of {coinData.name}]
            </h5>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>
          {/* Buttons of chart */}
          <div className="flex flex-row gap-8 mt-3 overflow-x-auto appearance-none">
            {buttons.map((item, index) => (
              <button
                key={index}
                onClick={() => switchChartStats(item)}
                className="bg-primary text-white text-lg block font-semibold px-4 py-1 uppercase rounded btn-shadow active:bg-white active:text-black mobile:text-sm cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
          </div>

          {/* more info */}
          <div className="mt-20 max-w-3xl mx-auto tracking-widest">
            <div className="uppercase text-center text-3xl text-white font-semibold mobile:text-2xl">
              More information
            </div>
            <div className="uppercase text-xl font-semibold tracking-wide text-white flex flex-row justify-between mt-8 mobile:text-sm">
              <div>Max Supply</div>
              <div>{coinData.market_data.max_supply}</div>
            </div>
            <div className="uppercase text-xl font-semibold tracking-wide text-white flex flex-row justify-between mt-4 mobile:text-sm">
              <div>Circulating supply</div>
              <div>{coinData.market_data.circulating_supply}</div>
            </div>
            <div className="uppercase text-xl font-semibold tracking-wide text-white flex flex-row justify-between mt-4 mobile:text-sm">
              <div>Market cap</div>
              <div>
                {currencySymbol}
                {coinData.market_data.market_cap[currency]}
              </div>
            </div>
            <div className="uppercase text-xl font-semibold tracking-wide text-white flex flex-row justify-between mt-4 mobile:text-sm">
              <div>All time low</div>
              <div>
                {currencySymbol}
                {coinData.market_data.atl[currency]}
              </div>
            </div>
            <div className="uppercase text-xl font-semibold tracking-wide text-white flex flex-row justify-between mt-4 mobile:text-sm">
              <div>All time high</div>
              <div>
                {currencySymbol}
                {coinData.market_data.ath[currency]}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Coinsdetails;
