import { useState } from "react";
import { MobileDialogType } from "../types";

export const useMobileDialog = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<MobileDialogType>(null);

  const handleOpenDialog = (dialogType: Exclude<MobileDialogType, null>) => {
    setIsDropdownOpen(false);
    setTimeout(() => setOpenDialog(dialogType), 100);
  };

  const getDialogProps = (dialogType: Exclude<MobileDialogType, null>) => ({
    open: openDialog === dialogType,
    onOpenChange: (open: boolean) => setOpenDialog(open ? dialogType : null),
  });

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    openDialog,
    handleOpenDialog,
    getDialogProps,
  };
};
