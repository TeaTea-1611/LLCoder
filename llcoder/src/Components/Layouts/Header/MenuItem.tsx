import { BsChevronRight } from "react-icons/bs";

interface MenuProps {
  data: any;
  onClick: () => void;
}

function MenuItem({ data, onClick }: MenuProps) {
  return (
    <li
      className="p-2 flex rounded-lg items-center cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-600/50 space-x-2 duration-300"
      onClick={onClick}
    >
      <div
        className={
          data.icon && "p-2 bg-slate-200 dark:bg-slate-800 rounded-full"
        }
      >
        {data.icon}
      </div>
      <div className="w-full flex justify-between items-center">
        <span>{data.title}</span>
        {data.children && <BsChevronRight />}
      </div>
    </li>
  );
}

export default MenuItem;
