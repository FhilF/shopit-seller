import { Box } from "@mantine/core";
import Header from "./Header";

import useStyles from "styles/js/layouts/global";

// import { MantineLogo } from "@mantine/ds";

function Global(props) {
  const { children, sessionedUser, signout } = props;
  const { classes } = useStyles();
  return (
    <Box className={classes.global}>
      <Header sessionedUser={sessionedUser} signout={signout} />
      <Box className="main">{children}</Box>
    </Box>
  );
}

export default Global;
