import { SubItem } from "./SubItem";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

export const NavMenu = () => (
  <PopoverContent
    w="50vh"
    h="auto"
    bgColor="white"
    borderColor="teal"
    borderRadius={0}
  >
    <PopoverBody>
      <SubItem text="Operation"></SubItem>
      <SubItem text="Crew Administration"></SubItem>
      <SubItem text="Queries & Reports"></SubItem>
      <SubItem text="Crew List"></SubItem>

      <Popover placement="bottom-start">
        <PopoverTrigger>
          <IconButton
            width="100%"
            height="auto"
            aria-label="Search links"
            icon={<ChevronDownIcon />}
          />
        </PopoverTrigger>
        <PopoverContent
          w="47vh"
          h="auto"
          bgColor="white"
          borderColor="gray"
          borderRadius={0}
        >
          <PopoverBody>
            <PopoverHeader>
              <Box as="a" color="teal.400" href="#" fontWeight="semi-bold">
                Seafarer Details
              </Box>
            </PopoverHeader>
            <PopoverHeader>
              <Box as="a" color="teal.400" href="#" fontWeight="semi-bold">
                Crew List
              </Box>
            </PopoverHeader>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </PopoverBody>
  </PopoverContent>
);
