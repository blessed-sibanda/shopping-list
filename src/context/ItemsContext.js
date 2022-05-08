import { createContext, useCallback, useState } from "react";

export const ItemsContext = createContext();

export const ItemsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async (listId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`
      );
      const result = await data.json();
      if (result) {
        setItems(result);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  return (
    <ItemsContext.Provider value={{ items, loading, error, fetchItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
