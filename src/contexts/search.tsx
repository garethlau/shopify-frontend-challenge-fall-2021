import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} | null>(null);

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  return (
    <SearchContext.Provider
      value={{
        value: query,
        onChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
export default SearchContext;
