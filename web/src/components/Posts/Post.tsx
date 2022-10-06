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
import { LoveIt } from "../../icons/LoveIt";

type MetadataProps = {
  creationDate: string;
  likes: number;
  comments: number;
  userLikeIt: boolean;
};

type User = {
  name: string;
  profile: string;
};
export interface PostProps {
  user: Partial<User>;
  metadata: Partial<MetadataProps>;
  desc?: string;
  media?: string;
}

type HeaderProps = Pick<PostProps["user"], "name" | "profile"> &
  Pick<PostProps["metadata"], "creationDate"> &
  Pick<PostProps, "desc">;

const Header = ({ creationDate, name, profile, desc }: HeaderProps) => {
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
        borderRadius="full"
        bgColor="#796E6E"
        area="profile"
      >
        <Image src={profile} />
      </GridItem>

      <GridItem as={Grid} area="metadata">
        <Grid gap="4px">
          <Text fontSize="12">{name}</Text>
          <Text fontSize="11">{creationDate}</Text>
        </Grid>
      </GridItem>

      <GridItem area="description">{desc}</GridItem>
    </Grid>
  );
};

const Body = ({ media }: { media: PostProps["media"] }) => {
  return (
    <Box w="100%" h="17.3125rem" bgColor="#C7C5C5">
      <Image src={media} />
    </Box>
  );
};

const Data = ({
  comments,
  likes,
  userLikeIt,
}: Omit<PostProps["metadata"], "creationDate">) => {
  return (
    <List display="flex" justifyContent="space-between" padding="13px">
      <ListItem display="flex" alignItems="center">
        <LoveIt fill={userLikeIt ? "#4ED972" : "#C7C5C5"} />
        <Text display="inline-block" marginLeft="5px">
          {likes}
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <Text>{comments} Comments</Text>
      </ListItem>
    </List>
  );
};

const Metadata = ({
  userLikeIt,
}: {
  userLikeIt: MetadataProps["userLikeIt"];
}) => {
  return (
    <List display="flex" w="inherit" justifyContent="center">
      <ListItem
        h="full"
        borderRight="1px solid #C7C5C5"
        w="full"
        textAlign="center"
      >
        <Button m="0" borderRadius="none" bg="none" p="13px" w="full">
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

export const Post = ({
  user = {
    name: undefined,
    profile: undefined,
  },
  desc = undefined,
  media = undefined,
  metadata = {
    comments: undefined,
    creationDate: undefined,
    likes: undefined,
    userLikeIt: undefined,
  },
}: PostProps) => {
  if (Object.values(user).some((v) => v === undefined)) return <></>;
  return (
    <Box as="section" w="auto" border="1px solid #C7C5C5" borderRadius="10px">
      <Grid as="article" w="full" borderRadius={"10px"}>
        <GridItem as="header">
          <Header
            creationDate={metadata.creationDate}
            profile={user.profile}
            desc={desc}
            name={user.name}
          />
        </GridItem>
        <GridItem>
          <Body media={media} />
        </GridItem>
        <GridItem as="footer">
          <Data
            likes={metadata.likes}
            comments={metadata.comments}
            userLikeIt={metadata.userLikeIt}
          />
          <hr />
          <Metadata userLikeIt={metadata.userLikeIt} />
        </GridItem>
      </Grid>
    </Box>
  );
};
