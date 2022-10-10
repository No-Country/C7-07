import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";

interface Props {
  fotosPrincipales: Array<string>;
}

export const Carousel = ({ fotosPrincipales = [] }: Props) => {
  const images = fotosPrincipales;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? -10 : 10,
        y: direction > 0 ? -5 : 5,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 10 : -10,
        y: direction < 0 ? -5 : 5,
      };
    },
  };

  /**
   * Experimenting with distilling swipe offset and velocity into a single variable, so the
   * less distance a user has swiped, the more velocity they need to register as a swipe.
   * Should accomodate longer swipes and short flicks without having binary checks on
   * just distance thresholds and velocity > 0.
   */
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const MotionImage = motion(Image);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const drag = useBreakpointValue({
    base: "x",
    md: "none",
  });

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <MotionImage
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          drag={drag}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={1}
          onDragEnd={(e: any, { offset, velocity }: any) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          rounded={"lg"}
          width="100%"
          height="100%"
          objectFit={"cover"}
          position="absolute"
        />
      </AnimatePresence>

      <Box
        className="next"
        onClick={() => paginate(1)}
        top="calc(50% - 20px)"
        position="absolute"
        bg="white"
        borderRadius="30px"
        w="20px"
        h="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        userSelect={"none"}
        cursor="pointer"
        fontWeight={"bold"}
        fontSize="20px"
        zIndex={2}
        right="10px"
      >
        <Text paddingBottom="3px" paddingLeft={"2px"}>
          ‣
        </Text>
      </Box>

      <Box
        className="prev"
        onClick={() => paginate(-1)}
        top="calc(50% - 20px)"
        position="absolute"
        bg="white"
        borderRadius="30px"
        w="20px"
        h="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        userSelect={"none"}
        cursor="pointer"
        fontWeight={"bold"}
        fontSize="20px"
        zIndex={2}
        left="10px"
        transform="scale(-1)"
      >
        <Text paddingBottom="3px" paddingLeft={"2px"}>
          ‣
        </Text>
      </Box>
    </>
  );
};
