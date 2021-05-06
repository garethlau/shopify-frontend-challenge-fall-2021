import React from "react";
import {
  Box,
  Flex,
  Spacer,
  useColorModeValue,
  IconButton,
  useColorMode,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavBar: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} p="10px">
      <Flex maxW="6xl" mx="auto">
        <Box>
          <Text mt="5px">Shoppies</Text>
        </Box>
        <Spacer />
        <HStack>
          {colorMode === "light" ? (
            <IconButton
              onClick={toggleColorMode}
              icon={<MoonIcon color="blue.400" />}
              aria-label="toggle dark mode"
            />
          ) : (
            <IconButton
              onClick={toggleColorMode}
              icon={<SunIcon color="yellow.400" />}
              aria-label="toggle light mode"
            />
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
