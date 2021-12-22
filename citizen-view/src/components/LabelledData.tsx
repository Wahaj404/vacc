import { Flex, Text, Heading } from "@chakra-ui/react";

interface Props {
  label: string;
  data: string;
}

export const LabelledData = (props: Props) => {
  return (
    <Flex direction="column">
      <Text color="Gray">{props.label}</Text>
      <Heading size="xs" mb={2}>
        {props.data}
      </Heading>
    </Flex>
  );
};
