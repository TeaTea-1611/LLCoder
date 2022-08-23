import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./components/Layouts";
import { publicRoutes } from "./routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
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
