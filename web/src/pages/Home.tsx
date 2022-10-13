import { Box, Flex } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { PostForm } from "../components/Posts/Form";
import { useFetch } from "../hooks/UseFetch";
import { IPost } from "../interfaces/IPost";
import { IMessage } from "../interfaces/IMessage";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJBZ2VuY2lhIGRlIHZpYWplcyIsImNvbnRhY3RzIjp7IndoYXRzYXBwIjoiKzU0MTEyMzkxOTI5MyJ9LCJpZCI6IjYzNDg2YTRlMWQ1NmRhZTEzZTE0M2Y1ZCIsImlhdCI6MTY2NTY5MDE5Mn0.qdskdVBtIfSg8NL89RuhgQWYzplfi6UAtJkcoKrQwAg";
export const Home = () => {
  const { call, abort, response, requestStatus } = useFetch<IMessage<IPost[]>>({
    options: {
      headers: {
        Authorization: "bearer " + token,
      },
    },
    url: "http://localhost:3001/posts/",
    inmediate: true,
  });
  console.log(response);
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
