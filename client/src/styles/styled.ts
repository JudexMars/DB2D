export interface Theme {
  colors: {
    background: string;
    border: string;
    font: string;
  };

  borderRadius: number;

  auth: {
    backgroundImage: string;
  };

  input: {
    colors: {
      border: string;
      font: string;
      placeholder: string;
    };
  };

  button: {
    primary: {
      color: string;
      background: string;
    };
  };

  link: {
    primary: string;
  };
}
