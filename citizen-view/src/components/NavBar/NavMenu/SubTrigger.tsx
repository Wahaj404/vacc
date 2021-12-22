import { Button, PopoverTrigger } from "@chakra-ui/react";

interface MenuTriggerProps {
  text: string;
}

export const MenuTrigger = ({ text }: MenuTriggerProps) => (
  <PopoverTrigger>
    <Button bgColor="inherit" width="103%">
      {text}
    </Button>
  </PopoverTrigger>
);
