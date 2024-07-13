import { ReactElement } from "react";
import Header from "./components/Header";
import FooterFC from "./components/FooterFC";
import { Outlet } from "react-router-dom";

function App(): ReactElement {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterFC />
    </div>
  );
}

export default App;
