import { useEffect, useState } from 'react'
import { apiStatus } from '../constants';


const useFetch = (url: string, headers: any) => {
    const [status, setStatus] = useState(apiStatus.IDLE);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            try {
                setStatus(apiStatus.LOADING);
                const response = await fetch(url, headers);
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
    }, [url, headers]);

    return {  data, status, error };
}

export default useFetch;