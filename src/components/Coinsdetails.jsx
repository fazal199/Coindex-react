import React from 'react'
import { useParams } from 'react-router-dom';

const Coinsdetails = () => {

  let {coinname} = useParams();

  return (
    <div>
      {coinname}
      Coinsdetails
    </div>
  )
}

export default Coinsdetails;
