import { useEffect, useState } from "react";
import api from "../lib/api";

const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await api.get("/languages");
      console.log(res.data.data);
      
      setLanguages(res.data.data);
      setIsLoading(false);
    };
    fetchLanguages();
  }, []);

  return {
    data:languages,
    isLoading,
  }
  ;
};

export default useLanguages;