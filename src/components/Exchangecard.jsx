import React from "react";

const Exchangecard = ({ name, rank, imgsrc,url }) => {
  return (
    <div className="bg-black py-6 rounded-md shadow-md shadow-white">
      <a href={url} target="_black">
        <figure>
          <img
            className="block mx-auto w-20 rounded-full"
            src={`${imgsrc}`}
            alt={`${name} img`}
          />
        </figure>
        <div className="text-white font-semibold text-center text-xl mt-4">
          <h5>{name}</h5>
          <p className="mt-1">Rank : {rank}</p>
        </div>
      </a>
    </div>
  );
};

export default Exchangecard;
