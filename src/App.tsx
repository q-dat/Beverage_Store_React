import { ReactElement } from "react";
import Header from "./components/Header";
import FooterFC from "./components/FooterFC";
import { Outlet } from "react-router-dom";

function App(): ReactElement {
  return (
    <div className=" font-mono">
    <Header />
      <div className="bg-gray-100 py-10">
      <Outlet/>
      </div>
      <FooterFC />
    </div>
  );
}

export default App;
