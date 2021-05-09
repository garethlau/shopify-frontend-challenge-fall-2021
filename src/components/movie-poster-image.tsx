import React from "react";
import {
  Box,
  Image,
  BoxProps,
  CenterProps,
  Center,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

interface Props extends BoxProps {
  title?: string;
  poster: string;
  animateOnHover?: boolean;
}

const ImageFallback: React.FC<CenterProps> = ({ title, ...rest }) => (
  <Center
    p="10px"
    bg={useColorModeValue("gray.200", "gray.500")}
    {...rest}
    w="100%"
    h="100%"
  >
    <Stack>
      {title && (
        <Text align="center" opacity={0.6}>
          {title}
        </Text>
      )}
      <Text align="center" opacity={0.6} as="i">
        Missing poster image
      </Text>
    </Stack>
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
  title,
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
        fallback={<ImageFallback title={title} w={width} h={height} />}
        objectFit="cover"
        {...(animateOnHover ? anim : {})}
      />
    </Box>
  );
};

export default MoviePostImage;
