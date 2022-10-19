import { extendTheme, Image } from "@chakra-ui/react";

Image.defaultProps = {
  ...Image.defaultProps,
  alt: "Image",
  decoding: "async",
  loading: "lazy",
};

export const theme = extendTheme({
  colors: {
    brand: {
      500: "#4ED972",
      700: "#24A745",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});
