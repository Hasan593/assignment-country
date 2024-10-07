import { useEffect, useState } from "react";
import Country from "./Country";
import Header from "./Header";
const Countrys = () => {

    const [country, setCountries] = useState([]);
    const [details, setDetails] = useState({});
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        const storeCountries = localStorage.getItem('country');  // লোকাল স্টরে কিছু থাকলে সেটা string হিসেবে থাকে
        if (storeCountries) {
            setCountries(JSON.parse(storeCountries));
            setFilter(JSON.parse(storeCountries));      // কোনো কিছু যখন string থেকে object এ নিয়ে আসতে হয় তখন JSON.parse() ব্যাবহার করতে হয়
        } else {
            fetch(`https://restcountries.com/v3.1/all`)
            .then(res => res.json())
            .then(fetchData => {
                const data = fetchData.map(cn => {
                    return {...cn, visited: false}        // // এই ফাংশান এর দ্বারা data এর প্রত্যেক অবজেক্ট এর ভিতরে একটা করে isVisible নামে key যোগ করা হয়েছে।
                });
                localStorage.setItem('country', JSON.stringify(data));  // // কোনো কিছু লোকাল স্টরে রাখতে সেটাকে string করে রাখতে হয় তাই data কে string করা হয়েছে লোকাল স্টরে কিছু রাখলে সেটা key এবং value আকারে রাখতে হয় এখানে 'country' হলো key আর JSON.stringify(data)) এটা value  আবার লোকাল স্টর থেকে কিছু নিলে লোকাল স্টর এর key ধরে নিতে হয়। 13 নম্বর লাইনে যেভাবে নেওয়া হয়েছে।
                setCountries(data), setFilter(data)
                // console.log(data)
            });
        }
    }, []);

    useEffect(()=>{
        if (searchQuery) {
            const timerId = setTimeout(() => {
                const searchFilter = country.filter(cn => {
                    return cn.name.common.toLowerCase().includes(searchQuery.toLowerCase());
                  });
                  setFilter(searchFilter);
                //   console.log(searchQuery)
            }, 1000);
            return ()=>clearTimeout(timerId);
        } else {
            setFilter(country);
        };
    }, [filter, searchQuery, country])
  
    const handleCountry = (country)=> {
        const currency = Object.entries(country.currencies || {}).map( curr => {
            const[code, {name, symbol}] = curr || {};
            // const {name, symbol} = info || {};
            return {code, name, symbol};
        });
        console.log(country)

        setDetails(
            {
                name: country.name.common,
                img: country.flags.svg,
                population: country.population,
                region: country.region,
                currencies: currency
            }
        );
        setModal(true);
      };

      const rejectCountry = filter.filter(country =>  
        country.name.common !== 'India' && 
        country.name.common !== 'Israel' &&
        country.region !== 'Americas' &&
        country.region !== 'Europe'
      );

      const handleSearch = e => {
        const value = e.target.value;
        setSearchQuery(value);
        // const searchFilter = country.filter(cn => {
        //   return cn.name.common.toLowerCase().includes(value.toLowerCase());
        // });
        // setFilter(searchFilter);
        // console.log(value)
      };

    return (
        <>
            < Header 
            handleSearch={handleSearch} 
            searchQuery={searchQuery} 
            />
            
            { modal &&
                <div onClick={()=>setModal(false)} className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
                    <div onClick={(e)=>e.stopPropagation()} className="bg-gray-200 p-3 rounded-lg max-w-xl h-1/2 shadow-lg">
                        <button onClick={()=>setModal(false)} className="py-2 px-8 mb-3 bg-green-500 hover:bg-green-700 hover:text-white">X</button>
                        <h1><strong>Country Name:</strong> {details.name}</h1>
                        <h1 className="my-3"><strong>Country Region:</strong> {details.region}</h1>
                        <img className="h-14 w-28" src={details.img} alt="" />
                        {
                            details.population ? <h1 className="py-3"><strong>Population Of Country: </strong>{details.population}</h1> : <h1 className="py-3"><strong>Population Of Country: </strong> There is no People </h1>
                        }

                        {
                            details.currencies.length > 0 ? details.currencies.map( ({code, name, symbol}) => (
                                <h1 key={name}><strong>Currencies: </strong>{code}- {name}- {symbol}</h1>
                            )) : <h1><strong>Currencies: </strong>Currency not found</h1>
                        }
                    </div>
                </div>
            }

            {
                filter.length <= 0 && <h1 className="text-5xl font-bold text-center mt-32">No Data found</h1>
            }

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:mt-32 mt-24">
            {
                rejectCountry.sort((a,b)=> a.population - b.population)
                // .filter(country => 
                // country.name.common !== 'India' && 
                // country.name.common !== 'Israel' &&
                // country.region !== 'Americas' &&
                // country.region !== 'Europe')
                .map(country =><Country handleCountry={handleCountry} key={country.name.common} country={country} />)
            }
            </div>
        </>
    );
};

export default Countrys;