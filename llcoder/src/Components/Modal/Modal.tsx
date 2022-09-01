import { Portal } from "../Portal";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

function Modal({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;
  return (
    <Portal>
      <div className="fixed inset-0 z-50">{children}</div>
    </Portal>
  );
}

export default Modal;
