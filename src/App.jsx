import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Main } from "./comps/Main";
import { NavbarCustom } from "./comps/NavbarCustom";
import { Footer } from "./comps/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./comps/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <NavbarCustom />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
