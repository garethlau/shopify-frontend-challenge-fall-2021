import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import NavBar from "../nav-bar";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const WithNavBar: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Box display="grid" gridTemplateRows="58px auto" h="100vh">
      <NavBar />
      <Box overflowY="auto" {...rest}>
        {children}
      </Box>
    </Box>
  );
};

export default WithNavBar;
