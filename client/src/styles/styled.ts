export enum ThemeType {
  Light = "light",
  Dark = "dark",
}

export interface BaseTheme {
  borderRadius: number;

  button: {
    primary: {
      color: string;
      background: string;
    };
    disable: {
      color: string;
      background: string;
    };
  };

  link: {
    primary: string;
  };
}

export interface Theme {
  type: ThemeType;

  colors: {
    background: string;
    border: string;
    shadow: string;
    font: string;
  };

  auth: {
    backgroundImage: string;
  };

  form: {
    errorColor: string;

    input: {
      colors: {
        border: string;
        font: string;
        placeholder: string;
      };
    };
  };

  avatar: {
    borderRadius: {
      rounded: string;
      squared: string;
    };
  };

  navigation: {
    color: string;
    background: string;
    activeItem: {
      color: string;
      background: string;
    };
  };

  toast: {
    background: string;
  };

  toggle: {
    background: string;
  };
}
