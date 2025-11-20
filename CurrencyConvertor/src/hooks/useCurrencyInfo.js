import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    // useEffect hook to fetch data when the component mounts or currency changes
    useEffect(() => {
        // Fetch currency data from the API
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        // Parse the response as JSON
        .then((res) => res.json())
        // Set the fetched data to the state, specifically the data for the given currency
        .then((res) => setData(res[currency]))
        // The dependency array ensures this effect runs when 'currency' changes
    }, [currency])
    // Return the fetched currency data
    return data
}

export default useCurrencyInfo;