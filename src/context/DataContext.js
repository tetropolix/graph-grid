import React, { useEffect, useState } from "react";
import { dataURL } from "../utils/constants";
export const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(dataURL)
      .then((res) => res.json())
      .then((parsedRes) => {
        setData(parsedRes);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
