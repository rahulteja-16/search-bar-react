import { useEffect, useState, useRef } from 'react'
import { apiStatus } from '../constants';


const useFetch = (url: string, headers: any, key: string) => {
    const cache = useRef<{ [key: string]: any }>({})
    const [status, setStatus] = useState(apiStatus.IDLE);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        let cancelRequest = false;
        if (!url) return;
        const fetchData = async () => {
            if (cache.current[url]) {
                const data = cache.current[url];
                setData(data);
                setStatus(apiStatus.FETCHED);
            } else {
                try {
                    setStatus(apiStatus.LOADING);
                    const response = await fetch(url, headers);
                    const data = await response.json();
                    cache.current[url] = data[key]
                    setData(data[key]);
                    if (cancelRequest) return;
                    setStatus(apiStatus.FETCHED);
                } catch(err) {
                    setStatus(apiStatus.ERROR);
                    setData([]);
                    if (cancelRequest) return;
                    setError('Error Fetching data.');
                }
            }
            
        }
        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
        
    }, [url, headers, key]);

    return {  data, status, error };
}

export default useFetch;