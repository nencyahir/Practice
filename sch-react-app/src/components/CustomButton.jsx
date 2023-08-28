import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({ children, color, ...props }) => {
  const colorToVariantMap = {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    danger: "danger",
    warning: "warning",
    info: "info",
    light: "light",
    dark: "dark",
  };

  const variant = color ? colorToVariantMap[color] : "primary";

  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
