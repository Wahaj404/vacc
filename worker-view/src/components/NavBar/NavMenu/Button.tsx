import { NavMenu } from "./NavMenu";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

interface MenuTriggerProps {
  text: string;
}

const MenuTrigger = ({ text }: MenuTriggerProps) => (
  <PopoverTrigger>
    <Button bgColor="inherit" width="103%">
      {text}
    </Button>
  </PopoverTrigger>
);

interface MenuPopoverProps {
  children?: React.ReactNode;
}

const MenuPopover = ({ children }: MenuPopoverProps) => (
  <PopoverContent
    w="50vh"
    h="70vh"
    bgColor="blue.600"
    borderColor="teal"
    borderRadius={0}
  >
    <PopoverBody>{children}</PopoverBody>
  </PopoverContent>
);

type MenuItemProps = MenuTriggerProps & MenuPopoverProps;

const MenuItem = ({ text, children }: MenuItemProps) => (
  <Popover placement="right-start">
    <MenuTrigger text={text} />
    <MenuPopover>{children}</MenuPopover>
  </Popover>
);

export const MenuButton = () => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          aria-label=""
          borderRadius={0}
          height="inherit"
          bgColor="inherit"
          icon={<HamburgerIcon />}
        />
      </PopoverTrigger>
      <NavMenu />
    </Popover>
  );
};
