import { Box, Flex } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { PostForm } from "../components/Posts/Form";

export const Home = () => {
  return (
    <Box h="100vh" marginInline={["12px"]} textAlign="center">
      <Flex
        as="main"
        w={["full", "677px"]}
        flexDir="column"
        paddingBlock={"12px 5rem"}
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
};
