import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface NavButtonProps {
  w: number | string;
  children: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({
  w,
  children,
}: NavButtonProps) => {
  const router = useRouter();
  return (
    <Button
      w={w}
      height="inherit"
      bgColor="inherit"
      borderRadius={0}
      onClick={() => router.push("/landing")}
    >
      {children}
    </Button>
  );
};
