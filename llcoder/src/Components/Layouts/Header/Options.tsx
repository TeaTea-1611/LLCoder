import { BsMoonStars, BsTranslate } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { changeTheme, selectTheme } from "../../../store/reducers/appReducer";
import Menu from "../../Menu";
import { LANGS, THEME } from "./Item";

function Options() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleChangeTheme = (val: string) => {
    if (theme === val) return;
    dispatch(changeTheme(val));
  };

  return (
    <div className="space-x-4 pl-6 border-l border-slate-300 lg:flex items-center relative">
      <Menu className="w-32" data={THEME} onChange={handleChangeTheme}>
        <BsMoonStars size={18} />
      </Menu>
      <Menu
        className="w-28"
        data={LANGS}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <BsTranslate size={18} />
      </Menu>
    </div>
  );
}

export default Options;
