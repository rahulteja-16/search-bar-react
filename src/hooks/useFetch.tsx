import { useEffect, useState } from 'react'
import { apiStatus } from '../constants';


const useFetch = (url:string) => {
    const [status, setStatus] = useState(apiStatus.IDLE);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            try {
                setStatus(apiStatus.LOADING);
                const response = await fetch(url);
                const data = await response.json();
                setData(data.predictions);
                setStatus(apiStatus.FETCHED);
            } catch(err) {
                setStatus(apiStatus.ERROR);
                setData([]);
                const errMessage:any = 'Error Fetching data.'
                setError(errMessage);
            }
        }
        fetchData();
    }, [url]);

    return { status, data, error };
}

export default useFetch;