import ReactDOM from "react-dom/client";
import "./index.css";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import IntlProviderWrapper from "./translations/IntlProviderWrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <GlobalStyles>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </GlobalStyles>
  </ApolloProvider>
);

reportWebVitals();
