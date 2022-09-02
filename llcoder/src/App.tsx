import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./components/Layouts";
import { ThemeType, useMeQuery } from "./generated/graphql";
import PrivatePage from "./pages/PrivatePage";
import { pageRoutes } from "./routes";

function App() {
  const { data } = useMeQuery();

  useEffect(() => {
    if (data?.me?.theme === ThemeType.Dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [data?.me?.theme]);
  return (
    <>
      <Router>
        <Routes>
          {pageRoutes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <DefaultLayout>
                    {route.private ? (
                      <PrivatePage>
                        <Page />
                      </PrivatePage>
                    ) : (
                      <Page />
                    )}
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2888}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
