import { NavButton } from "./NavButton";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useRouter } from "next/router";
import React from "react";
import {
  Avatar,
  Button,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
} from "@chakra-ui/react";

const duration = (login: Date) => {
  let diff = Math.floor((Date.now() - login.getTime()) / 1000),
    unit = "second";
  if (diff >= 60) {
    diff = Math.floor(diff / 60);
    unit = "minute";
  }
  if (diff >= 60) {
    diff = Math.floor(diff / 60);
    unit = "hour";
  }
  return `${diff} ${unit}${diff === 1 ? "" : "s"} ago`;
};

export const NavBar = () => {
  const [{ data }] = useMeQuery({ pause: isServer() });
  const me = data?.workerMeQuery;
  const [, logout] = useLogoutMutation();
  const time = duration(new Date(me?.updatedAt));
  const router = useRouter();
  return (
    <Flex alignItems="center" height="6vh" bgColor="blue.600" color="white">
      <NavButton w="23vh">
        <Text>Vacc</Text>
      </NavButton>
      <Spacer />
      <Flex
        width="18vh"
        alignItems="center"
        height="inherit"
        bgColor="inherit"
        borderRadius={0}
      >
        <Popover>
          <PopoverTrigger>
            <Avatar ml="2vh" size="xs" name={me?.username} src="" />
          </PopoverTrigger>
          <PopoverContent w={100} bgColor="blue.600">
            <PopoverBody>
              <Center>
                <Button
                  h="inherit"
                  w="inherit"
                  // borderWidth={4}
                  // borderColor="grey"
                  onClick={async () => {
                    await logout();
                    router.push("/login");
                  }}
                  color="white"
                  bgColor="inherit"
                >
                  Logout
                </Button>
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Spacer />
        <Flex flexDir="column" alignItems="center">
          <Text fontSize="1.5vh" mr="1vh" color="whiteAlpha.800">
            {me?.username}
          </Text>
          <Text fontSize="1.5vh" mr="1vh" color="whiteAlpha.800">
            {time}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
