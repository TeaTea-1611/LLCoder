import { BsChevronLeft } from "react-icons/bs";

interface MenuProps {
  title?: string;
  onBack?: () => void;
}

function MenuHeader({ title, onBack }: MenuProps) {
  return (
    <div className="p-2 flex w-full items-center cursor-pointer space-x-2">
      <div
        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
        onClick={onBack}
      >
        <BsChevronLeft />
      </div>
      <span className="text-lg font-bold">{title}</span>
    </div>
  );
}

export default MenuHeader;
