import { ButtonProps as MaterialButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MaterialButtonProps {
  children?: React.ReactNode;
  variant: 'contained' | 'outlined';
  color: 'primary' | 'secondary' | 'error';
  size?: 'small' | 'medium' | 'large';
}
