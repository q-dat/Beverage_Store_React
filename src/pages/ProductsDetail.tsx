import React, { useEffect, useState } from "react";
import { getProduct } from "../services/ProductService";
import { Link, useParams } from "react-router-dom";
import { Products } from "../types/Products";

const ProductsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Products | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const fetchedProduct = await getProduct(id);
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="glass mb-10 lg:px-20 py-2 px-[10px] text-sm breadcrumbs">
        <ul className="font-light">
          <li>
            <Link to="/">
              <i className="fa-solid fa-house pr-2"></i>Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/detail">
              <i className="fa-solid fa-circle-info pr-2"></i>Chi Tiết
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div
          className="flex flex-col md:flex-row md:px-[20px] px-[10px]
justify-center items-start "
        >
          <div className="">
            <div className=" flex flex-col">
              <img
                className="w-[360px] md:w-[400px] h-auto rounded"
                src={`/products/${product.img}`}
                alt="Product"
              />
              <div className="flex flex-row mt-[10px] space-x-4">
                <img
                  className="w-[70px] md:w-[100px] rounded "
                  src={`/products/${product.img_child}`}
                  alt="Product"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:px-10 px-[10px] md:w-1/3">
            <h1 className="font-semibold text-[25px]">{product.name}</h1>
            <h1 className=""></h1>
            <div>
              Giá: {product.price}.000đ
              <span>
                &nbsp;Còn:
                <del className="text-red-500">{product.sale}.000đ</del>
              </span>
            </div>
            <hr className="border  border-gray-200 h-[1px] my-2 " />
            <div className="font-light "> {product.description}</div>
            <hr className="border border-gray-200 h-[1px] my-2 mb-5" />
            <div className="space-x-3">
              <input
                className="rounded-[5px] p-3 w-[100px] glass"
                type="number"
                value="1"
                min="1"
                max="10"
              />
              <button className="btn glass font-semibold bg-red-500 hover:bg-red-600 text-white">
                Thêm Vào Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
        <div className="px-[20px] xl:px-[100px] pb-[20px]">
          <div className="flex flex-col w-full">
            <div className="divider">Thông Tin Sản Phẩm</div>
            <p>{product.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
