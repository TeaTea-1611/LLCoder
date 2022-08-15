import Modal, { ModalProps } from "./Modal";
import { useEffect } from "react";

interface ModalFormProps extends ModalProps {
  title: string;
  className?: string;
}

function ModalForm({
  children,
  isOpen,
  className,
  onClose,
  title,
}: ModalFormProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isOpen]);

  const classes = `min-w-[288px] bg-slate-50 dark:bg-slate-800 rounded p-4${
    className ? ` ${className}` : ""
  }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classes}>
        <header className="flex items-center mb-4 py-2">
          <h2 className="flex-1">{title}</h2>
          <button
            className="rounded-md border border-dark-border-color px-2 py-1 uppercase w-7 h-6 text-center flex items-center justify-center hover:bg-dark-hover-color"
            onClick={onClose}
          >
            <span className="text-xs">ESC</span>
          </button>
        </header>
        <div>{children}</div>
      </div>
    </Modal>
  );
}

export default ModalForm;
