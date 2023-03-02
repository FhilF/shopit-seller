import { Box, Button, Text } from "@mantine/core";
import Header from "./Header";

import useStyles from "styles/js/layouts/global";
import { ContentMessageProvider } from "utils/contentMessageProvider";
import Footer from "./Footer";

// import { MantineLogo } from "@mantine/ds";

function Global(props) {
  const { children, sessionedUserData, signout } = props;
  const { classes } = useStyles();
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: "40vh", zIndex: 10 }}>
        <Button
          color="yellow.8"
          radius={0}
          component="a"
          href="/guide"
          sx={{
            height: "110px",
            paddingLeft: "1px",
            paddingRight: "1px",
            backgroundColor: "#f08c00b3",
          }}
        >
          <Text size="sm" weight={600} sx={{ writingMode: "vertical-rl" }}>
            Tester Guides
          </Text>
        </Button>
      </Box>
      <Box className={classes.global}>
        <Header sessionedUserData={sessionedUserData} signout={signout} />
        <ContentMessageProvider>
          <Box className="main">
            <Box className="child responsive">{children}</Box>
          </Box>
        </ContentMessageProvider>
        
        <Footer />
      </Box>
    </Box>
  );
}

export default Global;
