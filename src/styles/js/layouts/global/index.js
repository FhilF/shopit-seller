import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  global: {
    display: "block",
    ".main": {
      display: "flex",
      justifyContent: "center",
      ".container": {
        width: "100%",
        paddingLeft: "16px",
        paddingRight: "16px",
        [theme.fn.largerThan("lg")]: {
          maxWidth: theme.breakpoints.md + 100,
        },
        [theme.fn.largerThan("xl")]: {
          maxWidth: theme.breakpoints.lg,
        },
      },

      ".portal": {
        display: "flex",
        width: "100%",
        ".navbar": {
          display: "none",
          [theme.fn.largerThan("md")]: {
            display: "block",
            width: "200px",
            minWidth: "200px",
          },
          [theme.fn.largerThan("xl")]: {
            // width: "200px",
            // minWidth: "200px",
          },
          // maxWidth: "200px",
          ".nav-group": {
            ".nav-item-container": {
              ".link": {
                fontWeight: 600,
                textDecoration: "none",
                padding: "8px",
                lineHeight: 1,
                ".chevron": {
                  color: theme.colors.dark[6],
                },
                ".label": {},
                ".icon-container": {
                  display: "flex",
                  alignItems: "center",
                  svg: { color: theme.colors.gray[7] },
                },
                ":hover": {
                  background: theme.colors.gray[0],
                },
                "&.active": {
                  ".label": {
                    color: theme.colors.yellow[8],
                  },
                },
              },
              ".sub-link-container": {
                marginLeft: "32px",
                ".sub-link": {
                  textDecoration: "none",
                  "&.active": {
                    div: {
                      color: theme.colors.yellow[8],
                    },
                  },
                  div: {
                    padding: "8px",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    height: "40px",

                    color: "#727272",

                    ":hover": {
                      background: theme.colors.gray[1],
                    },
                    //   paddingLeft: "8px",
                    //   paddingRight: "8px",
                  },
                  // marginLeft: "40px",
                },
              },
            },
          },
        },

        //   background: "red",
      },
      ".content": {
        flex: 1,

        [theme.fn.smallerThan("lg")]: {
          marginLeft: "0px",
        },
        marginLeft: "24px",
      },
    },
  },
}));

export default useStyles;