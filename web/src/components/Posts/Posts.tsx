import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { PostForm } from "./Form";
import { Post } from "./Post";

function Posts() {
  return (
    <Box
      paddingBlock={"12px"}
      h="100vh"
      marginInline={["12px"]}
      textAlign="center"
    >
      <Flex
        as="main"
        w={["full", "677px"]}
        flexDir="column"
        marginInline="auto"
        gap="18px"
      >
        <PostForm />
        {Array(6)
          .fill("")
          .map((_, idx) => (
            <Post
              desc=""
              media=""
              metadata={{
                comments: 20,
                creationDate: "19:20",
                likes: 21,
                userLikeIt: true,
              }}
              user={{ name: "Ignacio Fedorenco", profile: "" }}
              key={idx}
            />
          ))}
      </Flex>
    </Box>
  );
}

export default Posts;
