import { ModalProps } from "@/src/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export const Modal = ({
  trigger,
  title,
  children,
  open,
  setOpen,
}: ModalProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogContent className="rounded-md overflow-y-auto max-w-xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="text-left text-base w-3/4">{title}</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);
