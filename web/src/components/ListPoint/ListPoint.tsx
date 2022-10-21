import { Image, ListItem, Text } from "@chakra-ui/react";
import checkIcon from "../../assets/img/check 3.svg";

export interface Props {
  content: string;
}

function ListPoint({ content }: Props) {
  return (
    <ListItem display="flex">
      <Image marginRight="10px" src={checkIcon} />
      <Text>{content}</Text>
    </ListItem>
  );
}

export default ListPoint;
