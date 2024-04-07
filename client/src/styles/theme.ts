import { BaseTheme, Theme, ThemeType } from "./styled";

const baseThem: BaseTheme = {
  borderRadius: 8,

  button: {
    primary: {
      color: "#FFFFFF",
      background: "#677FFF",
    },
    disable: {
      color: "#919197",
      background: "#E1E1E1",
    },
  },

  link: {
    primary: "#677FFF",
  },
};

export const lightTheme: Theme = {
  ...baseThem,
  type: ThemeType.Light,

  colors: {
    background: "#00000",
    border: "#E1E1E1",
    shadow: "rgba(0, 0, 0, 0.10)",
    font: "#333333",
  },

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

  toast: {
    background: "rgba(255, 255, 255, 0.7)",
  },

  navigation: {
    color: "#5D5D5D",
    background: "#F2F2F2",
    activeItem: {
      color: "#000000",
      background: "#FFFFFF",
    },
  },
};

export const darkTheme: Theme = {
  ...baseThem,
  type: ThemeType.Dark,

  colors: {
    background: "#31313A",
    border: "#E1E1E1",
    shadow: "rgba(0, 0, 0, 0.10)",
    font: "#333333",
  },

  auth: {
    backgroundImage: "linear-gradient(90deg, #677fff, #aa9cbb)",
  },

  form: {
    errorColor: "#D80027",

    input: {
      colors: {
        border: "#E1E1E1",
        font: "#FFFFFF",
        placeholder: "#7E7E7E",
      },
    },
  },

  avatar: {
    borderRadius: {
      rounded: "100%",
      squared: "8px",
    },
  },

  toast: {
    background: "rgba(0, 0, 33, 0.7)",
  },

  navigation: {
    color: "#B3B3B3",
    background: "#464653",
    activeItem: {
      color: "#FFFFFF",
      background: "#464653",
    },
  },
};
