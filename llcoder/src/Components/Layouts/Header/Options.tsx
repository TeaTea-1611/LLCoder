import { useEffect } from "react";
import { BsMoonStars, BsTranslate } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import {
  MeDocument,
  useMeQuery,
  useSetDarkModeSettingMutation,
  useSetLanguageSettingMutation,
} from "../../../generated/graphql";
import Menu from "../../Menu";
import { LANGS } from "./Item";

function Options() {
  const { data } = useMeQuery();
  const [setDarkMode] = useSetDarkModeSettingMutation();
  const [setLanguage] = useSetLanguageSettingMutation();
  useEffect(() => {
    if (data?.me?.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [data]);

  return data?.me ? (
    <div className="space-x-4 pl-6 border-l border-slate-300 flex items-center relative">
      <button
        type="button"
        className="text-lg text-sky-500"
        onClick={() =>
          setDarkMode({
            update(cache, { data: _dataDarkMode }) {
              if (_dataDarkMode?.setDarkModeSetting)
                cache.updateQuery(
                  {
                    query: MeDocument,
                  },
                  (dt) => ({
                    me: {
                      ...dt?.me,
                      darkMode: !data.me?.darkMode,
                    },
                  })
                );
            },
          })
        }
      >
        {data.me?.darkMode ? <BsMoonStars /> : <FaSun />}
      </button>
      <Menu
        className="w-28"
        data={LANGS}
        onChange={(value) => {
          if (value !== data.me?.language)
            setLanguage({
              variables: {
                language: value,
              },
              update(cache, { data: _dataLanguage }) {
                if (_dataLanguage?.setLanguageSetting) {
                  cache.updateQuery({ query: MeDocument }, (dt) => ({
                    me: {
                      ...dt?.me,
                      language: value,
                    },
                  }));
                }
              },
            });
        }}
      >
        <BsTranslate className="text-lg" />
      </Menu>
    </div>
  ) : null;
}

export default Options;
