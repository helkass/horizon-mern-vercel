import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';

const useFetchGet = (dataUrl) => {
    const [data, setData] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setloading] = useState(true);

    const fetchData = async (url) => {
        
        try {
            const response = await publicRequest.get(url);
            setData(response.data);
            
            setTimeout(() => {
                setloading(false)
            },2000)

        } catch (error) {
            setError(true)
            setData([])
        }

    };

    useEffect(() => {
        fetchData(dataUrl);
    }, [dataUrl]);

    // custom hook returns value
    return { data, isError, isLoading };
};

export default useFetchGet;