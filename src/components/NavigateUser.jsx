import { Flex, Loader, LoadingOverlay, Text } from "@mantine/core";
import { isProduction } from "config";
import React, { useEffect } from "react";

function NavigateUser({ message }) {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(
        isProduction ? "https://shopit-demo.com" : "http://localhost:3000"
      );
    }, 3000);
  }, []);

  return (
    <Flex align="center" sx={{ flexDirection: "column" }}>
      <Loader sx={{ marginTop: "20vh" }} size={50} />
      <Text color="blueGray.6" size="md" mt="xl">
        Redirecting you to{" "}
        {message ? message : "main website to setup your account..."}
      </Text>
    </Flex>
  );
}

export default NavigateUser;
