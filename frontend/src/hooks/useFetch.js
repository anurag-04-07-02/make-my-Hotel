import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    // We pull an api request and while loading or fetching the data the "loading" will be true and we store the
    // data in the "data" and if we fail to fetch, then "error" will be true
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
        };
        
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
        const res = await axios.get(url);
        setData(res.data);
        } catch (err) {
        setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
