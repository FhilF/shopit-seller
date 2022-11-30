import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: 0,
    display: "flex",
    justifyContent: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
    backgroundColor: theme.colors.gray[8],
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      // paddingLeft: "0px",
      // paddingRight: "0px",
    },
  },
  child: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
      width: "75%",
    },
  },
}));

export default useStyles;
