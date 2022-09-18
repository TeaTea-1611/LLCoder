import Modal, { ModalProps } from "./Modal";
import { useEffect } from "react";

interface ModalFormProps extends ModalProps {
  title: string;
  className?: string;
  onClose: () => void;
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

  return (
    <Modal isOpen={isOpen}>
      <>
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 z-0"
          onClick={onClose}
        />
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={
              "min-w-[288px] bg-slate-50 dark:bg-slate-800 rounded p-4"
            }
          >
            <header className="flex items-center mb-4 py-2">
              <h2 className="flex-1">{title}</h2>
              <button
                className="rounded-md shadow-lg dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 px-2 py-1 uppercase text-xs"
                onClick={onClose}
              >
                ESC
              </button>
            </header>
            <div>{children}</div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default ModalForm;
