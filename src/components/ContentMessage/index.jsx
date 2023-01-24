import { Box, Button, Group, Image, Stack, Text } from "@mantine/core";
import React from "react";
import NotFoundImage from "assets/images/item-not-found.png";
import ErrorImage from "assets/images/page-error.png";
import { useNavigate } from "react-router-dom";

function Fragment({ errorType }) {
  switch (errorType) {
    case "Item404":
      return <Item404 />;

    case "Err500":
      return <Err500 />;

    default:
      return <Default />;
  }
}

function ContentMessage(props) {
  const { errorType, setErrorType } = props;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Box sx={{ height: "85vh", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Fragment errorType={errorType} />
          <Button
            mt={40}
            onClick={() => {
              navigate("/");
              setErrorType(null);
            }}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const Err500 = () => {
  return (
    <>
      <Image width={200} src={ErrorImage} />
      <Text weight={300} size={80} color="gray.6">
        Sorry!
      </Text>
      <Text weight={600} color="gray.5">
        The server encountered an error and was unable to complete your request.
      </Text>
    </>
  );
};

const Default = () => {
  return (
    <>
      <Image width={200} src={NotFoundImage} />
      <Text weight={300} size={80} color="gray.6">
        Sorry!
      </Text>
      <Text weight={600} color="gray.5">
        The page you're looking for doesn't exist.
      </Text>
    </>
  );
};

const Item404 = () => {
  return (
    <>
      <Image width={200} src={NotFoundImage} />
      <Text weight={300} size={80} color="gray.6">
        Sorry!
      </Text>
      <Text weight={600} color="gray.5">
        We couldn't find what you're looking for.
      </Text>
    </>
  );
};

export default ContentMessage;
