import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);

    async function fetchData() {
        const response = await axios.get(endpoint);
        setData(response.data);
    }

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, []);
    return data;
};

export default useFetch;