import { SubPopover } from "./SubPopover";
import { MenuTrigger } from "./SubTrigger";
import { Popover } from "@chakra-ui/react";

interface SubItemProps {
  text: string;
  children?: React.ReactNode;
}

export const SubItem = ({ text, children }: SubItemProps) => (
  <Popover placement="right-start">
    <MenuTrigger text={text} />
    <SubPopover>{children}</SubPopover>
  </Popover>
);
