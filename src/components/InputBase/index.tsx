import { forwardRef, ForwardRefRenderFunction } from 'react';
import { TextField } from '@mui/material';
import { InputProps } from './types';

const InputStyle: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, color, type, defaultValue, size, width, m, ...rest },
  ref,
) => {
  return (
    <TextField
      hiddenLabel
      id={type}
      label={label}
      color={color}
      type={type}
      defaultValue={defaultValue}
      variant="outlined"
      size={size}
      sx={{
        width: width,
        m: m,
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
      inputRef={ref}
      {...rest}
    />
  );
};

export const Input = forwardRef(InputStyle);
