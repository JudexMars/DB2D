import React, { forwardRef } from "react";

import icons from "./Icons";

export type IconType = keyof typeof icons;

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  type: IconType;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ type, ...rest }: IconProps, ref): JSX.Element =>
    React.createElement(icons[type], { ref, ...rest }),
);

export default Icon;
