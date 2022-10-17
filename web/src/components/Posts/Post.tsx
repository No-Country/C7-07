import {
  Text,
  Box,
  Grid,
  GridItem,
  ListItem,
  List,
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { LoveIt } from "../../icons/LoveIt";
import { IPost } from "../../interfaces/IPost";
import { IUser } from "../../interfaces/IUser";
import { useSetLikeMutation } from "../../services/social";

interface PostProps extends Omit<IPost<IUser>, "comments"> {}
interface HeaderProps {
  name: PostProps["owner"]["alias"];
  creationDate: PostProps["creationDate"];
  profile: string;
  description: PostProps["description"];
}

const Header = ({ creationDate, name, profile, description }: HeaderProps) => {
  creationDate = new Date(creationDate).toDateString();
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
      <GridItem
        w="35px"
        h="35px"
        bgColor="#C7C5C5"
        borderRadius="full"
        area="profile"
      >
        <Image overflow="hidden" src={profile} />
      </GridItem>

      <GridItem as={Grid} area="metadata">
        <Grid gap="4px">
          <Text fontSize="12">{name}</Text>
          <Text fontSize="11">{creationDate}</Text>
        </Grid>
      </GridItem>

      <GridItem area="description">{description}</GridItem>
    </Grid>
  );
};

const Body = ({ media }: { media: PostProps["media"] }) => {
  return (
    <>
      {media && (
        <Box h="30em" bgColor="#C7C5C5">
          <Image objectFit="cover" w="100%" h="100%" src={media} />
        </Box>
      )}
    </>
  );
};

type DataProps = {
  amountComments: PostProps["amountComments"];
  amountReactions: PostProps["amountReactions"];
  userLikeIt?: boolean;
};

const Data = ({ amountComments, amountReactions, userLikeIt }: DataProps) => {
  return (
    <List display="flex" justifyContent="space-between" padding="13px">
      <ListItem display="flex" alignItems="center">
        <LoveIt fill={userLikeIt ? "#4ED972" : "#C7C5C5"} />
        <Text display="inline-block" marginLeft="5px">
          {amountReactions}
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <Text>{amountComments} Comments</Text>
      </ListItem>
    </List>
  );
};

const Others = ({
  userLikeIt,
  postId,
}: {
  userLikeIt: boolean;
  postId: string;
}) => {
  const [setLike] = useSetLikeMutation();
  return (
    <List display="flex" w="inherit" justifyContent="center">
      <ListItem
        h="full"
        borderRight="1px solid #C7C5C5"
        w="full"
        textAlign="center"
      >
        <Button
          onClick={() => {
            setLike(postId);
          }}
          m="0"
          borderRadius="none"
          bg="none"
          p="13px"
          w="full"
        >
          <LoveIt fill={userLikeIt ? "#4ED972" : "#C7C5C5"} />
          <Text color={userLikeIt ? "#4ED972" : "#000000"} marginLeft="5px">
            Me Encanta
          </Text>
        </Button>
      </ListItem>
      <ListItem h="full" w="full" textAlign="center">
        <Button m="0" borderRadius="none" bg="none" p="13px" w="full">
          Comment
        </Button>
      </ListItem>
    </List>
  );
};

export const Post = React.memo(function Post({
  id = "",
  owner = {} as IUser,
  description = "",
  media = "",
  creationDate = "",
  amountComments = 0,
  amountReactions = 0,
  reactions = [],
}: PostProps) {
  const userLikeIt = reactions?.some(
    (value) =>
      "634cc858eb1bbd2f9f290c57" === value.owner ||
      "634cc682eb1bbd2f9f290b5d" === value.owner
  );

  return (
    <Grid
      as="article"
      border="1px solid #C7C5C5"
      w="full"
      borderRadius={"10px"}
    >
      <GridItem as="header">
        <Header
          creationDate={creationDate}
          profile={""}
          description={description}
          name={owner?.alias}
        />
      </GridItem>
      {media && (
        <GridItem>
          <Body media={media} />
        </GridItem>
      )}
      <GridItem as="footer">
        <Data
          userLikeIt={userLikeIt}
          amountReactions={amountReactions}
          amountComments={amountComments}
        />
        <hr />
        <Others postId={id} userLikeIt={userLikeIt} />
      </GridItem>
    </Grid>
  );
});
