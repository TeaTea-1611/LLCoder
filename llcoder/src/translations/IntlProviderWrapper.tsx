import { IntlProvider } from "react-intl";
import { useMeQuery } from "../generated/graphql";

import LanguageUtils from "../utils/LanguageUtils";

const messages: {
  [key: string]: {};
} = LanguageUtils.getFlattenedMessages();

function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const { data } = useMeQuery();

  return (
    <IntlProvider
      locale={data?.me?.language || "vi"}
      messages={messages[data?.me?.language || "vi"]}
    >
      {children}
    </IntlProvider>
  );
}

export default IntlProviderWrapper;
