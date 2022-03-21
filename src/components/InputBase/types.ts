import { BaseTextFieldProps } from '@mui/material';

export interface InputProps extends BaseTextFieldProps {
  defaultValue?: string;
  label: string;
  color: 'primary' | 'secondary' | 'error';
  type: string;
  size: 'medium' | 'small';
  width?: { xs: string; md: string };
  m?: { xs: string | number; md: string | number };
}
