import React from "react";
import { Link } from "react-router-dom";

const Coincard = ({id,symbol,name,price,imgsrc,currency}) => {

  let currencySymbol = "₹";

  //deciding the currency symbol
  switch(currency)
  {
      case "inr":
        currencySymbol = "₹"
        break;

      case "usd":
        currencySymbol = "$"
        break;

      default:
        currencySymbol = "NA"
  }
  


  return (
    <div className="bg-black py-6 rounded-md shadow-md shadow-white">
      <Link to={`/coins/${id}`}>
        <figure>
          <img
            className="block mx-auto w-20 rounded-full"
            src={`${imgsrc}`}
            alt={`${name} img`}
          />
        </figure>
        <div className="text-white font-semibold text-center text-xl mt-6">
          <h5 className="font-sembold">"{symbol}"</h5>
          <h5 className="mt-2">{name}</h5>
          <p className="mt-2">Price : {currencySymbol}{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Coincard;
