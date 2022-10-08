import { Box, Flex } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { PostForm } from "../components/Posts/Form";
import { useFetch } from "../hooks/UseFetch";
import { IPost } from "../interfaces/IPost";
import { IMessage } from "../interfaces/IMessage";

export const Home = () => {
  const { call, abort, response, requestStatus } = useFetch<IMessage<IPost[]>>({
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
        {response?.data?.map((post, idx) => (
          <Post
            key={`${post.owner}_${post.id}`}
            owner={post.owner}
            description={post.description}
            media={post.media}
            amountComments={post.amountComments}
            amountReactions={post.amountReactions}
            creationDate={post.creationDate}
          />
        ))}
      </Flex>
    </Box>
  );
};
