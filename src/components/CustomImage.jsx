import { Box } from "@mantine/core";
import React from "react";

function CustomImage(props) {
  const { src, alt, height, width } = props;
  return (
    <Box sx={{ height: "100%", overflow: "hidden", zIndex: 0 }}>
      <Box sx={{ position: "relative" }}>
        <img
          src={src}
          alt={alt}
          style={{
            objectFit: "contain",
            width: width ? width : "100%",
            height: height ? height : "200px",
          }}
        />
      </Box>
    </Box>
  );
}

export default CustomImage;
