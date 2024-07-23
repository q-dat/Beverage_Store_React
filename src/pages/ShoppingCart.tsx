import React from "react";
import { Link } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  return <>
  <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
    <ul className="font-light">
      <li>
        <Link to="/">
          <i className="fa-solid fa-house pr-2"></i>Trang Chủ
        </Link>
      </li>
      <li>
        <Link to="/shopping-cart">
          <i className="fa-solid fa-circle-info pr-2"></i>Giỏ Hàng
        </Link>
      </li>
    </ul>
  </div>
  {/* <!-- ------------------------------------------------------------------------------------------------------- --> */}
</>;
};

export default ShoppingCart;
