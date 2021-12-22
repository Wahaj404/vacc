import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Image, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";

const Card: React.FC<{}> = () => {
  return (
    <Box className="container">
      <Box className="card">
        <Image
          src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png"
          alt="Person"
          className="card__image"
        />
        <Text className="card__name">Murray Reeve</Text>
        <Box className="grid-container">
          <Box className="grid-child-posts">305 Post</Box>

          <Box className="grid-child-followers">2643 Likes</Box>
        </Box>
        <button className="btn draw-border">Follow</button> 
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Card);
