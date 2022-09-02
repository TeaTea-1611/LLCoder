import Tippy from "@tippyjs/react/headless";
import React, { useState } from "react";
import {
  BsChevronDown,
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsGearFill,
} from "react-icons/bs";
import { MdGTranslate, MdLogout, MdOutlineLiveHelp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  LanguageType,
  MeDocument,
  MeQuery,
  ThemeType,
  useLogoutMutation,
  useMeQuery,
  useSetLanguageSettingsMutation,
  useSetThemeSettingsMutation,
} from "../../../generated/graphql";
import Image from "../../Image";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";

interface MenuItems {
  icon?: React.ReactNode;
  title: React.ReactNode | string;
  children?: MenuItems[];
  type?: string;
  code?: string;
  to?: string;
}

const MENU_ITEMS: MenuItems[] = [
  {
    icon: <BsGearFill />,
    title: "Settings",
    children: [
      {
        icon: <BsFillMoonStarsFill />,
        title: "Theme",
        children: [
          {
            icon: <BsFillMoonStarsFill />,
            title: "Dark",
            type: "theme",
            code: ThemeType.Dark,
          },
          {
            icon: <BsFillSunFill />,
            title: "Light",
            type: "theme",
            code: ThemeType.Light,
          },
        ],
      },
      {
        icon: <MdGTranslate />,
        title: "Language",
        children: [
          { title: "English", type: "language", code: LanguageType.En },
          { title: "Vietnamese", type: "language", code: LanguageType.Vi },
        ],
      },
    ],
  },
  {
    icon: <MdOutlineLiveHelp />,
    title: "Help",
    to: "/help",
  },
  {
    icon: <MdLogout />,
    title: "Logout",
    type: "logout",
  },
];

function Profile() {
  const navigate = useNavigate();
  const { data } = useMeQuery();
  const [logoutUser] = useLogoutMutation();
  const [setTheme] = useSetThemeSettingsMutation();
  const [setLanguage] = useSetLanguageSettingsMutation();

  const handleChangeMenu = async (menu: any) => {
    switch (menu.type) {
      case "logout":
        await logoutUser({
          update(cache, { data }) {
            if (data?.logout) {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: null,
                },
              });
            }
          },
        });
        break;
      case "theme":
        if (menu.code !== data?.me?.theme)
          await setTheme({
            variables: {
              themeType: menu.code,
            },
            update(cache, { data: _dataTheme }) {
              if (_dataTheme?.setThemeSetting) {
                cache.updateQuery({ query: MeDocument }, (dt) => ({
                  me: {
                    ...dt?.me,
                    theme: menu.code,
                  },
                }));
              }
            },
          });
        break;
      case "language":
        if (menu.code !== data?.me?.language)
          await setLanguage({
            variables: {
              languageType: menu.code,
            },
            update(cache, { data: _dataLanguage }) {
              if (_dataLanguage?.setLanguageSetting) {
                cache.updateQuery({ query: MeDocument }, (dt) => ({
                  me: {
                    ...dt?.me,
                    language: menu.code,
                  },
                }));
              }
            },
          });
        break;
      default:
        break;
    }
  };

  const [history, setHistory] = useState([{ data: MENU_ITEMS, title: "" }]);
  const currentHistory = history[history.length - 1];

  const renderItems = () => {
    return currentHistory.data?.map((item, index) => {
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (!!item.children) {
              setHistory(
                (pre) =>
                  [...pre, { data: item.children, title: item.title }] as any
              );
            } else {
              if (!!item.to) navigate(item.to);
              else handleChangeMenu(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      interactive
      trigger="click"
      placement="bottom-end"
      zIndex={999}
      render={(attrs) => (
        <div
          className="z-10 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-64 p-2 text-base text-slate-700 font-semibold dark:bg-slate-900 dark:ring-white/5 dark:highlight-white/5 dark:text-slate-300 animate-fade-in"
          tabIndex={-1}
          {...attrs}
        >
          {history.length > 1 ? (
            <MenuHeader
              title={currentHistory.title}
              onBack={() => {
                setHistory(history.slice(0, history.length - 1));
              }}
            />
          ) : (
            <>
              <div
                className="p-2 flex rounded-lg items-center cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-600/50 space-x-2 duration-300"
                onClick={() => navigate("/profile")}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image src={data?.me?.avatar} alt="avatar" />
                </div>
                <div>
                  <div>
                    <span>{data?.me?.nickname}</span>
                  </div>
                  <div>
                    <span>{`Exp: ${data?.me?.exp}`}</span>
                  </div>
                </div>
              </div>
              <hr className="border-t-slate-500/50 my-2" />
            </>
          )}
          <ul>{renderItems()}</ul>
        </div>
      )}
      onHide={() => setHistory([{ data: MENU_ITEMS, title: "" }])}
    >
      <div className="relative rounded-full cursor-pointer w-10 h-10">
        <div className="rounded-full overflow-hidden">
          <Image src={data?.me?.avatar} alt="avatar" />
        </div>
        <div className="absolute bottom-0 right-0 shadow p-[1px] rounded-full bg-slate-200/80 dark:bg-slate-800/80">
          <BsChevronDown size={12} />
        </div>
      </div>
    </Tippy>
  );
}

export default Profile;
