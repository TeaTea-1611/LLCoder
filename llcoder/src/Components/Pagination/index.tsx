import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../UI/Button";

interface Props {
  className?: string;
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

function Pagination({ page, totalPages, onChangePage }: Props) {
  const handleChangePage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onChangePage(p);
  };

  const elementBtn = (p: number) => {
    return (
      <Button
        key={uuidv4()}
        onClick={() => handleChangePage(p)}
        className={
          page === p
            ? "bg-sky-500 text-white w-8 flex justify-center"
            : "w-8 flex justify-center"
        }
      >
        <span>{p}</span>
      </Button>
    );
  };

  const ellipsis = () => (
    <Button key={uuidv4()} className="">
      <BsThreeDots />
    </Button>
  );

  const renderPageButtons = () => {
    const pageBtns: JSX.Element[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageBtns.push(elementBtn(i));
      }
    } else {
      let start = page - 2;
      let end = page + 2;
      if (start < 1) {
        start = 1;
        end = 5;
      }
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - 4;
      }
      for (let i = start; i <= end; i++) {
        pageBtns.push(elementBtn(i));
      }
      if (start > 1) {
        if (start > 2) {
          pageBtns.unshift(ellipsis());
          pageBtns.unshift(elementBtn(1));
        } else {
          pageBtns.unshift(elementBtn(1));
        }
      }
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageBtns.push(ellipsis());
          pageBtns.push(elementBtn(totalPages));
        } else {
          pageBtns.push(elementBtn(totalPages));
        }
      }
    }
    return pageBtns;
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button className="" onClick={() => handleChangePage(page - 1)}>
          <BsChevronLeft />
        </Button>
        {renderPageButtons()}
        <Button className="" onClick={() => handleChangePage(page + 1)}>
          <BsChevronRight />
        </Button>
      </div>
    </>
  );
}

export default Pagination;
