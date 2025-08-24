import { Container, createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    primary: [
      "#f4d6d5", // lighter tint (100)
      "#e9adaa", // 200
      "#df847f", // 300
      "#d45b54", // 400
      "#b02622", // 500 (main)
      "#7e1b18", // 600 (dark)
    ],
    secondary: [
      "#fde6c9", // 100
      "#fbcf92", // 200
      "#f9b85c", // 300
      "#f6a126", // 400
      "#f08b02", // 500 (main)
      "#b86500", // 600 (dark)
    ],
    neutral: [
      "#f9f9f9", // light
      "#e0e0e0", // border
      "#666666", // text secondary
      "#222222", // text primary
      "#1c1c1c", // dark
    ],
  },
  primaryColor: "primary",
  primaryShade: { light: 4, dark: 5 },

  components: {
    Container: Container.extend({
      defaultProps: {
        bg: "#f9f9f9",
      },
    }),
  },
});

export default theme;
