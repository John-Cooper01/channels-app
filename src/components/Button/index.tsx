import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from './types';

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
