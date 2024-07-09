import { createContext, useContext } from "react";

export const DataContext = createContext<any>(null);

export const useData = () => useContext(DataContext);
