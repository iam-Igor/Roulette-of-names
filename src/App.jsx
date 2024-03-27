import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Main } from "./comps/Main";
import { NavbarCustom } from "./comps/NavbarCustom";
import { Footer } from "./comps/Footer";

function App() {
  return (
    <>
      <NavbarCustom />
      <Main />
      <Footer />
    </>
  );
}

export default App;
