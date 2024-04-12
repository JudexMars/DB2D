import { Theme } from "./styled";

// eslint-disable-next-line import/prefer-default-export
export const baseTheme: Theme = {
  colors: {
    background: "#FFFFFF",
    border: "#E1E1E1",
    shadow: "rgba(0, 0, 0, 0.10)",
    font: "#333333",
  },

  borderRadius: 8,

  auth: {
    backgroundImage: "linear-gradient(90deg, #677fff, #aa9cbb)",
  },

  form: {
    errorColor: "#D80027",

    input: {
      colors: {
        border: "#E1E1E1",
        font: "#333333",
        placeholder: "#5D5D5D",
      },
    },
  },

  avatar: {
    borderRadius: {
      rounded: "100%",
      squared: "8px",
    },
  },

  button: {
    primary: {
      color: "#FFFFFF",
      background: "#677FFF",
    },
    disable: {
      color: "#919197",
      background: "#E1E1E1",
    },
    speed: 100,
  },

  link: {
    primary: "#677FFF",
  },

  dotMenu: {
    background: "#FFFFFF",
    border: "#989898",
    item: {
      color: "#000000",
      background: "#F2F2F2",
    },
  },

  toast: {
    background: "#FFFFFF",
  },
};
