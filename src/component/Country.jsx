/* eslint-disable react/prop-types */

import { useState } from "react";

const Country = ({country, handleCountry}) => {
  // console.log(country.visited)

  const [toggle, setToggle] = useState(country.visited);

  // const buttonHandle = ()=>{
    //     setToggle(!toggle);
    //     handleCountry(country);  // এই ফাংশানে শুধু বাটনের কাজ করবে।
    // };

    // const buttonHandle = (img)=>{
    //     img ? setToggle(!toggle) : setToggle(true);
    //     handleCountry(country);   // এই ফাংশান দিলে ছবিতে ক্লিক করলে মডাল আসবে কিন্তু বাটনে ক্লিক না করলেও বাটন ক্লিক হয়ে ডিজেবল হয়ে যাবে
    // };
    
    // const buttonHandle = (img)=>{
    //     img ? (setToggle(!toggle),
    //     handleCountry(country)) : handleCountry(country); // এই ফাংশান এর কাজ হলো ছবিতে ক্লিক করলে মডাল আসবে কিন্তু যতক্ষন না বাটনে ক্লিক করবো ততক্ষন বাটন ডিসেবল হবে নাহ
    // };

  const buttonHandle = img =>{
    const getCountry = JSON.parse(localStorage.getItem('country')); // এখানে লোকাল স্টর থেকে ডাটা নেয়া হয়েছে
    const findIndex = getCountry.findIndex(index => index.name.common === country.name.common); // এই ফাংশান দিয়ে মূলত লোকাল স্টর এর কোন কান্ট্রির কত নম্বর ইন্ডেক্স সেটা বের করা হয়েছে
    // console.log(findIndex);
    if (findIndex !== -1) {         // এখানে এই if ছাড়াও কাজ করবে
      const updateCountry = [...getCountry];
      updateCountry[findIndex].visited = true;
      localStorage.setItem('country', JSON.stringify(updateCountry));
    }

    img ? ( setToggle(!toggle),
    handleCountry(country)
  ) : (toggle ? handleCountry(country) : false);// এই ফাংশান এর কাজ হলো ছবিতে ক্লিক করলে মডাল আসবে নাহ, যখন বাটনে একবার ক্লিক করে বাটন টা ডিসেবল করে দিবো তখন ছবিতে ক্লিক করলে মডাল আসবে।
    
  };

    return (
        <>
           <div className="bg-slate-400 hover:bg-slate-500 p-5 rounded-md h-auto">
             <h1 className="h-12"><strong>{country?.name?.common}</strong></h1>
             <img onClick={()=>buttonHandle(false)} className="w-40 h-20" src={country?.flags?.svg} alt="" />
             
             {
              country.capital ? <p className="my-3 h-10"><strong>CapiTal: </strong>{country.capital}</p> : <p className="my-3 h-10"><strong>CapiTal: </strong>There is no Capital</p>
             }
             
             {
              toggle ? <button disabled className="bg-red-500 w-full hover:bg-red-600 hover:cursor-not-allowed rounded-md py-2 font-bold" onClick={()=>buttonHandle(1)}>Visited</button> : <button onClick={()=>buttonHandle(1)} className="bg-orange-300 w-full hover:bg-amber-300 rounded-md py-2 font-bold">Details</button>
             }
           </div>
        </>
    );
};

export default Country;