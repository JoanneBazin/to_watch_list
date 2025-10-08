export interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}
