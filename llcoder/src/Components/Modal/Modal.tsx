import ReactDOM from "react-dom";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>,
    document.getElementById("llcoder-modal") as HTMLElement
  );
}

export default Modal;
