import { ModalForm } from "../../../Components/Modal";

function Search({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Search">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <input type="text" className="w-full" />
        </div>
      </div>
    </ModalForm>
  );
}

export default Search;
