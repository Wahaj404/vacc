import React from "react";
import CountUp from "react-countup";
import {
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";

interface Props {
  heading: string;
  total: number;
  lastDay: number;
  color: string;
}

export const VaccineStats = ({ heading, total, lastDay, color }: Props) => {
  return (
    <Stat
      m={12}
      w={40}
      borderWidth="3px"
      borderColor="teal.600"
      padding={6}
      borderRadius="md"
    >
      <StatLabel color={`${color}.400`}>{heading}</StatLabel>
      <StatNumber color={color}>
        <CountUp end={total} duration={2} />
      </StatNumber>
      <Divider />
      <StatHelpText>Last 24 hours: {lastDay}</StatHelpText>
    </Stat>
  );
};
