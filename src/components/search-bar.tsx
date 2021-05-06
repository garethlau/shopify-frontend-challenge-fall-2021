import React from "react";
import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useSearch from "../hooks/useSearch";

const SearchBar: React.FC<{}> = () => {
  const { value, onChange } = useSearch();

  return (
    <Box p={{ base: 2, md: 0 }}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          value={value}
          onChange={onChange}
          placeholder="I'm looking for ..."
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
