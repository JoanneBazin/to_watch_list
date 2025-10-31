export interface ModalProps {
  trigger: React.ReactNode | null;
  title: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export interface LogoProps {
  size?: "x-small" | "small" | "medium" | "large";
  img: string;
  alt: string;
}
