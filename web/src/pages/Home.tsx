import { Box, Flex } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { PostForm } from "../components/Posts/Form";
import { useGetAllPostsQuery } from "../services/social";
import { PostSkeleton } from "../components/Posts/PostSkeleton";

export const Home = () => {
  const {
    data: response,
    isFetching,
    isLoading,
  } = useGetAllPostsQuery(undefined);
  console.log(isFetching);
  return (
    <Box paddingBlock={"12px"} marginInline={["12px"]} textAlign="center">
      <Flex
        as="main"
        w={["full", "677px"]}
        flexDir="column"
        marginInline="auto"
        gap="18px"
      >
        <PostForm />
        <Flex
          as="section"
          w="auto"
          h="auto"
          pb="2rem"
          borderRadius="10px"
          direction="column"
          gap="3rem"
        >
          {!response?.data ? (
            <>
              <PostSkeleton />
            </>
          ) : (
            <>
              {isLoading && <PostSkeleton />}
              {response?.data?.map((post) => (
                <Post
                  id={post.id}
                  key={`${post.owner}_${post.id}`}
                  owner={post.owner[0]}
                  description={post.description}
                  media={post.media}
                  amountComments={post.amountComments}
                  amountReactions={post.amountReactions}
                  creationDate={post.creationDate}
                  reactions={post.reactions}
                />
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
