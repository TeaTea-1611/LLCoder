import { IntlProvider } from "react-intl";

import LanguageUtils from "../utils/LanguageUtils";

const messages: {
  [key: string]: {};
} = LanguageUtils.getFlattenedMessages();

function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider locale={"vi"} messages={messages["vi"]}>
      {children}
    </IntlProvider>
  );
}

export default IntlProviderWrapper;
