import React from 'react';
import Button, {
  ButtonProps as MaterialButtonProps,
} from '@mui/material/Button';

interface ButtonProps extends MaterialButtonProps {
  children?: React.ReactNode;
  variant: 'contained' | 'outlined';
  color: 'primary' | 'secondary' | 'error';
  size?: 'small' | 'medium' | 'large';
}

export default function ButtonStyle({
  children,
  variant,
  color,
  size,
  ...rest
}: ButtonProps) {
  return (
    <Button variant={variant} color={color} size={size} {...rest}>
      {children}
    </Button>
  );
}
