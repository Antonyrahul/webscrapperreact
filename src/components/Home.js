import React, { useRef, useEffect,useState } from 'react';
import '../App.css'
import { Tabs } from "flowbite-react";
import axios from 'axios';




function Home(){


    const [googleImg,setGoogleImg]=useState([])
    const [bingImg,setBingImg]=useState([])
    const [images,setImages]=useState([])
    const [identifier,setIdentifier]=useState(0)
    const [isGoogleSelected, setIsGoogleSelected] = useState(false);
    const [isBingSelected, setIsBingSelected] = useState(false);
    const [isLoading,setIsLoading]=useState(false)
    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

function search(evt){
    evt.preventDefault()
    setIsLoading(true)
    setImages([])
    setIsGoogleSelected(false)
    setIsBingSelected(false)
    const submitData = { keyword:inputValue}
    console.log(submitData)
    axios.post('http://localhost:8000/search', submitData)
        .then(function (response) {
            console.log(response);
            if (response.status==200)
            {
            
            setGoogleImg(response.data.googleimages)
            setBingImg(response.data.bingimages)
            setImages(response.data.googleimages)
            setIsGoogleSelected(true)
            }
            else{
                alert("Error. Please try another search term . If the issue persists contact admin")
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Error. Please try another search term . If the issue persists contact admin")
        });
}

function selectSite(value,site){
   
        value?setImages(bingImg):setImages(googleImg)
        
        if(site=="google")
        {
            setIsGoogleSelected(true)
            setIsBingSelected(false)

        }
        else
        {setIsBingSelected(true)
            setIsGoogleSelected(false)}
}
  return (
    <div>
        <div>
<form className='pt-4' onSubmit={search}>   
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" value={inputValue} onChange={handleInputChange} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>
<div>
<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
        <li class="me-2" onClick={()=>selectSite(0,"google")}>
            <a id="google"  className={isGoogleSelected?"inline-block p-4 border-b-2 border-blue-600 rounded-t-lg hover:text-green-600  dark:hover:text-gray-300 cursor-pointer":"inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"} >GOOGLE</a>
        </li>
        <li class="me-2" onClick={()=>selectSite(1,"bing")}>
            <a id="bing"  className={isBingSelected?"inline-block p-4 border-b-2 border-blue-600 rounded-t-lg hover:text-green-600  dark:hover:text-gray-300 cursor-pointer":"inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"} aria-current="page">BING</a>
        </li>

    </ul>
</div>
    </div>
    <div className='flex flex-wrap space-x-4 space-y-4'>
   { images.length>0? images.map((url)=>(

<div class="max-w-sm rounded overflow-hidden shadow-2xl border border-sky-500">
<img class="w-full" src={url} alt="Sunset in the mountains" />

</div>
   )):
   (
isLoading?(
   <div>
    Loading
   </div>
):null
   )
  
   }

</div>
</div>
  );
};

export default Home;