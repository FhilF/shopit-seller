import { Box } from "@mantine/core";
import React from "react";

function CustomImage(props) {
  const { src, alt, height } = props;
  return (
    <Box
      sx={{ height: height ? height : "100%", overflow: "hidden", zIndex: 0 }}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={src}
          alt={alt}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "200px",
          }}
        />
      </Box>
    </Box>
  );
}

export default CustomImage;
