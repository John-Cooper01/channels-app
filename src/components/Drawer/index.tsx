import { SwipeableDrawer, Box } from '@mui/material';
import { DrawerProps } from './types';

export default function Drawer({
  width,
  anchor,
  open,
  onOpen,
  onClose,
  children,
}: DrawerProps) {
  return (
    <>
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onOpen={onClose}
        onClose={onOpen}
      >
        <Box width={width}>
          <Box>{children}</Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
