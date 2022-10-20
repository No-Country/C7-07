import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridItem,
  Box,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Grid
      gap="6px 9px"
      marginInline="13px"
      marginBlock="13px 9px"
      templateAreas={`"profile metadata"
			"description description"`}
      templateColumns="35px 1fr"
      templateRows="35px 1fr"
      textAlign="start"
    >
      <SkeletonCircle
        w="35px"
        h="35px"
        bgColor="#C7C5C5"
        borderRadius="full"
      ></SkeletonCircle>

      <GridItem as={Grid}>
        <Grid gap="4px">
          <SkeletonText noOfLines={1} w="30%">
            Username
          </SkeletonText>
          <SkeletonText noOfLines={1} w="40%">
            12 thus oct
          </SkeletonText>
        </Grid>
      </GridItem>

      <SkeletonText noOfLines={2} w="full" gridColumn="1/4">
        Description
      </SkeletonText>
    </Grid>
  );
};

const Body = () => {
  return <Skeleton w="100%" h="17.3125rem" bgColor="#C7C5C5"></Skeleton>;
};

const Data = () => {
  return (
    <Skeleton
      display="flex"
      justifyContent="space-between"
      padding="13px"
    ></Skeleton>
  );
};

const Others = () => {
  return (
    <Box display="flex" w="inherit" justifyContent="center">
      <Box h="full" borderRight="1px solid #C7C5C5" w="full">
        <Skeleton m="0" borderRadius="none" bg="none" p="13px" w="full">
          Me Encanta
        </Skeleton>
      </Box>
      <Box h="full" w="full" textAlign="center">
        <Skeleton m="0" borderRadius="none" bg="none" p="13px" w="full">
          Comment
        </Skeleton>
      </Box>
    </Box>
  );
};

export const PostSkeleton = React.memo(function Post() {
  return (
    <Grid
      as="article"
      border="1px solid #C7C5C5"
      w="full"
      borderRadius={"10px"}
    >
      <GridItem as="header">
        <Header />
      </GridItem>
      <GridItem>
        <Body />
      </GridItem>
      <GridItem as="footer">
        <Data />
        <hr />
        <Others />
      </GridItem>
    </Grid>
  );
});
