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
import { IPost } from "../../interfaces/IPost";

interface HeaderProps {
  name: IPost["owner"]["name"];
  creationDate: IPost["creationDate"];
  profile: string;
  description: IPost["description"];
}

const Header = ({ creationDate, name, profile, description }: HeaderProps) => {
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
      <GridItem w="35px" h="35px" borderRadius="full" area="profile">
        <Image src={profile} />
      </GridItem>

      <GridItem as={Grid} area="metadata">
        <Grid gap="4px">
          <Text fontSize="12">{name}</Text>
          <Text fontSize="11">{creationDate.toLocaleDateString()}</Text>
        </Grid>
      </GridItem>

      <GridItem area="description">{description}</GridItem>
    </Grid>
  );
};

const Body = ({ media }: { media: IPost["media"] }) => {
  return (
    <Box w="100%" h="17.3125rem" bgColor="#C7C5C5">
      <Image src={media} />
    </Box>
  );
};

type DataProps = {
  amountComments: IPost["amountComments"];
  amountReactions: IPost["amountReactions"];
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

const Others = ({ userLikeIt }: { userLikeIt: boolean }) => {
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
  owner,
  description,
  media,
  creationDate,
  amountComments,
  amountReactions,
}: Omit<IPost, "id" | "comments" | "reactions">) => {
  return (
    <Box as="section" w="auto" border="1px solid #C7C5C5" borderRadius="10px">
      <Grid as="article" w="full" borderRadius={"10px"}>
        <GridItem as="header">
          <Header
            creationDate={creationDate}
            profile={""}
            description={description}
            name={owner.alias}
          />
        </GridItem>
        {media && (
          <GridItem>
            <Body media={media} />
          </GridItem>
        )}
        <GridItem as="footer">
          <Data
            amountReactions={amountReactions}
            amountComments={amountComments}
          />
          <hr />
          <Others userLikeIt={false} />
        </GridItem>
      </Grid>
    </Box>
  );
};
