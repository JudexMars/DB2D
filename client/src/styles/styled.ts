export interface Theme {
  colors: {
    background: string;
    border: string;
    shadow: string;
    font: string;
  };

  borderRadius: number;
  blur: number;

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

  dotMenu: {
    background: string;
    border: string;
    speed: number;
    item: {
      color: string;
      background: string;
    }
  };

  toast: {
    background: string;
  };
}
