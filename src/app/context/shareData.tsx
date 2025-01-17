// context/DataContext.tsx
"use client"
import { createContext, useState, ReactNode } from 'react';

interface DataContextType {

    getData: string;
    setData: (type: string) => void;

    getMobilenav: boolean;
    setMobilenav: (type: boolean) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [getData, setData] = useState<string>('');
  const [getMobilenav, setMobilenav] = useState<boolean>(false);
  return (
    <DataContext.Provider value={{getData,setData,getMobilenav,setMobilenav}}>
      {children}
    </DataContext.Provider>
  );
};