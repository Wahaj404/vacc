import { PopoverBody, PopoverContent } from "@chakra-ui/react";

interface SubPopoverProps {
  children?: React.ReactNode;
}

export const SubPopover = ({ children }: SubPopoverProps) => (
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
