import { Box } from "@mantine/core";
import Header from "./Header";

import useStyles from "styles/js/layouts/global";
import { ContentMessageProvider } from "utils/contentMessageProvider";

// import { MantineLogo } from "@mantine/ds";

function Global(props) {
  const { children, sessionedUser, signout } = props;
  const { classes } = useStyles();
  return (
    <Box className={classes.global}>
      <Header sessionedUser={sessionedUser} signout={signout} />
      <ContentMessageProvider>
        <Box className="main">
          <Box className="child">{children}</Box>
        </Box>
      </ContentMessageProvider>
    </Box>
  );
}

export default Global;
