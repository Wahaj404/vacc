import { NavBar } from "../components/NavBar/NavBar";
import { VaccineStats } from "../components/VaccineStats/VaccineStats";
import { useStatsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spacer,
  Stack,
  StatGroup,
  Text,
} from "@chakra-ui/react";

const Landing: React.FC<{}> = () => {
  const [{ data }] = useStatsQuery({ pause: isServer() });
  const stats = data?.getStats;
  const router = useRouter();
  return (
    <Box>
      <NavBar />
      <Center>
        <Stack mt={10} spacing={5} width="inherit">
          <Center>
            <Text fontSize={40} fontFamily="roboto" color="blue.900">
              Vaccine
            </Text>
            <Text fontSize={40} fontFamily="roboto" color="blue.400">
              Stats
            </Text>
          </Center>
          <StatGroup display="flex">
            <VaccineStats
              heading="First Dose"
              total={stats?.firstDose?.total || 0}
              lastDay={stats?.firstDose?.lastDay || 0}
              color="blue"
            />
            <VaccineStats
              heading="Fully Vaccinated"
              total={stats?.fullyVaccinated?.total || 0}
              lastDay={stats?.fullyVaccinated?.lastDay || 0}
              color="green"
            />
            <VaccineStats
              heading="Total Doses"
              total={stats?.totalDoses?.total || 0}
              lastDay={stats?.totalDoses?.lastDay || 0}
              color="purple"
            />
          </StatGroup>
          <Center>
            <Button
              _hover={{ bg: "blue.400" }}
              w="30%"
              bgColor="blue.500"
              color="whiteAlpha.900"
              onClick={() => {
                router.push("/appointment");
              }}
            >
              Get Vaccinated Now!
            </Button>
          </Center>
        </Stack>
      </Center>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Landing);
