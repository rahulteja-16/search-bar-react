import { useEffect, useState } from 'react'


const useFetch = (url:string) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setStatus('loading');
            const response = await fetch(url);
            const data = await response.json();
            setData(data.predictions);
            setStatus('fetched');
        }

        fetchData();
    }, [url]);

    return { status, data };
}

export default useFetch;