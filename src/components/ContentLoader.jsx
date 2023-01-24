import { Box, Loader } from "@mantine/core";
import React from "react";

function ContentLoader() {
  return (
    <Box sx={{ height: "85vh", display: "flex" }}>
        
      <Loader />
    </Box>
  );
}

export default ContentLoader;
