import { useEffect, useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import { v4 } from "uuid";
import images from "../../../assets/images";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
} from "../../../generated/graphql";

const MENU_USER = [{ icon: <MdLogout />, label: "Logout", value: "logout" }];

function Profile({ me }: MeQuery) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const ref = useRef<HTMLDivElement>(null);

  const handleChangeOptions = (val: string) => {
    switch (val) {
      case "logout": {
        logoutUser({
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
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative w-8 h-8 bg-transparent">
      <button
        className="rounded-full overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img className="w-8 h-8" src={images.noImageUser} alt="avatar" />
      </button>
      {isOpen && (
        <div className="absolute animation-fadeIn -translate-x-1/2 left-1/2 top-12 shadow bg-white dark:bg-slate-800 dark:border dark:border-slate-700 p-2 rounded w-48">
          <div className="flex space-x-4 p-2 rounded cursor-pointer hover:bg-slate-700/60">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={images.noImageUser} alt="avatar" />
            </div>
            <div className="flex flex-col">
              <span>{me?.nickname}</span>
              <span>Exp: {me?.exp}</span>
            </div>
          </div>
          <div className="mt-2">
            {MENU_USER.map((item) => (
              <div
                key={v4()}
                className="flex items-center space-x-2 px-2 py-1 rounded cursor-pointer hover:bg-slate-700/60"
                onClick={() => handleChangeOptions(item.value)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
