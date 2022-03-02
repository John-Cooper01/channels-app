import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

export interface NotificationProps {
  notify: {
    isOpen: boolean;
    message: string;
    type: 'error' | 'info' | 'success' | 'warning';
  };
  setNotify: (notify: {
    isOpen: boolean;
    message: string;
    type: 'error' | 'info' | 'success' | 'warning';
  }) => void;
}
export default function Notification(props: NotificationProps) {
  const { notify, setNotify } = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert color={notify.type} sx={{ width: '100%' }} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
