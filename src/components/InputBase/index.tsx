import { forwardRef, ForwardRefRenderFunction } from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  defaultValue?: string;
  id: string;
  label: string;
  color?: 'primary' | 'secondary' | 'error';
  type?: string;
  size: 'medium' | 'small';
}

const InputStyle: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { id, label, color, type, size },
  ref,
) => {
  return (
    <TextField
      hiddenLabel
      id={id}
      label={label}
      color={color}
      type={type}
      defaultValue=""
      variant="outlined"
      size={size}
      sx={{
        width: '350px',
        mb: 5,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.light',
          },
          '&:hover fieldset': {
            borderColor: 'primary.light',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.dark',
          },
        },
      }}
      ref={ref}
    />
  );
};

export const Input = forwardRef(InputStyle);
