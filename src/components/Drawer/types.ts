export interface DrawerProps {
  width: number;
  anchor: 'top' | 'left' | 'bottom' | 'right';
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}
