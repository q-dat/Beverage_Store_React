import React from "react";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <>
      <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
        <ul className="font-light">
          <li>
            <Link to="/">
              <i className="fa-solid fa-house pr-2"></i>Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="fa-solid fa-circle-info pr-2"></i>Liên Hệ
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- ------------------------------------------------------------------------------------------------------- --> */}
    </>
  );
};

export default Contact;
