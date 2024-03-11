import "styled-components";

import { Theme } from "./styled";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
