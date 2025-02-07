// context/DataContext.tsx
"use client"
import { createContext, useState, ReactNode } from 'react';
import { BlogType } from '../response/responseType';

interface DataContextType {

    getData: string;
    setData: (type: string) => void;

    getMobilenav: boolean;
    setMobilenav: (type: boolean) => void;

    metadata?: BlogType;  // Make metadata optional
    setMetadata: (type: BlogType) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [getData, setData] = useState<string>('');
  const [getMobilenav, setMobilenav] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<BlogType>();
  return (
    <DataContext.Provider value={{getData,setData,getMobilenav,setMobilenav,metadata,setMetadata}}>
      {children}
    </DataContext.Provider>
  );
};