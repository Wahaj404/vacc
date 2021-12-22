import { NavBar } from "./NavBar/NavBar";
import { Appointment, VaccinationCenter } from "../generated/graphql";
import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text
  } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";

type AppointmentType = Maybe<
  { __typename?: "Appointment" } & Pick<
    Appointment,
    "id" | "vaccineName" | "time" | "completed"
  > & {
      center: { __typename?: "VaccinationCenter" } & Pick<
        VaccinationCenter,
        "name"
      >;
    }
>;

export interface CardProps {
  cnic?: string;
  name?: string;
  first?: AppointmentType;
  second?: AppointmentType;

  nav?: boolean;
}

export const Card: React.FC<CardProps> = ({
  cnic,
  name,
  first,
  second,
  nav,
}) => {
  return (
    <Box>
      {!nav ? <NavBar /> : <></>}
      <Center className="container">
        <Flex
          borderWidth={4}
          borderColor={"blue.900"}
          backgroundImage="linear-gradient(0deg, #67ebe0, #3466a0 100%)"
          color="white"
          direction="column"
          alignItems="center"
          mb={20}
        >
          <Image
            src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png"
            alt="Person"
            className="card__image"
          />
          <Text align="center" mt={2} mb={2} fontSize={24}>
            {name}
          </Text>
          <Flex dir="row" className="grid-container">
            <Box ml={4}>
              <Text align="center" fontSize={14}>
                #{first?.id}
              </Text>
              <Text align="center" fontSize={24} mt={2} mb={2}>
                {first?.vaccineName}
              </Text>
              <Text align="center" fontSize={14}>
                {first?.center.name}
              </Text>
            </Box>
            <Spacer />
            <Box mr={4}>
              <Text align="center" fontSize={14}>
                #{second?.id}
              </Text>
              <Text align="center" fontSize={24} mt={2} mb={2}>
                {second?.vaccineName}
              </Text>
              <Text align="center" fontSize={14}>
                {second?.center.name}
              </Text>
            </Box>
          </Flex>
          <Text mt={12} mb={4} fontSize={20}>
            {cnic}
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};
