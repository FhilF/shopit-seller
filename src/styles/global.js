import { createStyles } from "@mantine/core";

const globalStyles = createStyles((theme) => ({
  parent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },

  pageContent: {
    paddingLeft: "16px",
    paddingRight: "16px",
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
}));

export default globalStyles;
