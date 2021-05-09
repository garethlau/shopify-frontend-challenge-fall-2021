import React from "react";
import {
  Box,
  Image,
  BoxProps,
  CenterProps,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props extends BoxProps {
  poster: string;
  animateOnHover?: boolean;
}

const ImageFallback: React.FC<CenterProps> = ({ ...rest }) => (
  <Center
    p="10px"
    bg={useColorModeValue("gray.200", "gray.500")}
    {...rest}
    w="100%"
    h="100%"
  >
    <Text align="center" opacity={0.6}>
      Missing poster image
    </Text>
  </Center>
);

const anim = {
  transition: "0.3s ease-in-out",
  transform: "scale(1.0)",
  _hover: {
    transform: "scale(1.05)",
  },
};

const MoviePostImage: React.FC<Props> = ({
  poster,
  width,
  height,
  borderRadius,
  animateOnHover = true,
  ...rest
}) => {
  return (
    <Box
      w={width}
      h={height}
      overflow="hidden"
      borderRadius={borderRadius}
      {...rest}
    >
      <Image
        h="100%"
        W="100%"
        src={poster}
        fallback={<ImageFallback w={width} h={height} />}
        objectFit="cover"
        {...(animateOnHover ? anim : {})}
      />
    </Box>
  );
};

export default MoviePostImage;
