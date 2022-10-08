import { Box, Flex } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { PostForm } from "../components/Posts/Form";
import { useFetch } from "../hooks/UseFetch";
import { IPost } from "../interfaces/IPost";

export const Home = () => {
  const { call, abort, response, requestStatus } = useFetch<{
    data: Array<IPost>;
  }>({
    url: "http://localhost:3001/posts/",
    inmediate: true,
  });

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
        {response?.data?.map((_, idx) => (
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
