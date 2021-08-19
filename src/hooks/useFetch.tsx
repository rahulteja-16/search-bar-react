import { useEffect, useState } from 'react'

interface ReqOptions {
    method: string,
}

const useFetch = (url:string, options: ReqOptions) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setStatus('loading');
            const response = await fetch(url, options);
            const data = await response.json();
            setData(data);
            setStatus('fetched');
        }

        fetchData();
    }, [url, options]);

    return { status, data };
}

export default useFetch;