import ReactDOM from "react-dom/client";
import "./index.css";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </ApolloProvider>
);

reportWebVitals();
