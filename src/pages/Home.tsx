import React, { useEffect, useState } from "react";
import { FaSearch, FaCartPlus, FaHeart } from "react-icons/fa";
import { getProducts } from "../services/ProductService";
import { Products } from "../types/Products";
import { useShoppingContext } from "../context/ShoppingContext";
import { CartItem } from "../types/CartItem";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import { Banner } from "../assets";

const Home: React.FC = () => {
  const { addCartItem } = useShoppingContext();
  // Thêm Sản Phẩm Vào Giỏ Hàng
  const handleAddToCart = (product: Products) => {
    const cartItem: CartItem = {
      id: product.id.toString(), // Chuyển đổi số thành chuỗi
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1,
    };
    addCartItem(cartItem);
  };
  //Get dữ liệu
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="">
      <div>
        <img className="w-full" src={Banner} alt="banner" />
      </div>
      <div className="text-center mt-[20px] md:m-5">
        <img className="mx-auto" src="" alt="" />
        <h1 className="py-2 text-[1.3rem] md:text-[2rem]">Đồ uống ưa thích</h1>
      </div>

      <section className="px-[10px] xl:px-[150px]">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 md:gap-[10px] gap-[10px] justify-center items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative border-gray-300 border-[1px] rounded-[10px]"
            >
              <a href={`/detail/${product.id}`}>
                <img
                  className="rounded-[10px]  w-full  object-cover"
                  loading="lazy"
                  src={`./products/${product.img}`}
                  alt={product.name}
                />
              </a>

              <div className="flex justify-between items-start flex-row">
                <div className="my-[10px] pl-[10px] min-h-[120px] ">
                  <p className="font-light">{product.name}</p>
                  <div className="hidden xl:block md:space-x-2">
                    <span>{product.price}.000đ</span>
                    {product.price && (
                      <del className="text-red-500">{product.sale}.000đ</del>
                    )}
                  </div>

                  <div className="xl:hidden">
                    {product.price && (
                      <p>
                        <del className="text-red-500">{product.sale}.000đ</del>
                      </p>
                    )}
                    <p>{product.price}.000đ</p>
                  </div>
                </div>
                <div className="my-[10px] pr-[10px]">
                  <button className="btn xl:hidden glass bg-red-600 text-white">
                    +
                  </button>
                </div>
              </div>

              <div className="hidden absolute inset-0 xl:flex justify-center items-center flex-row transform transition ease-in-out duration-1000 rounded-[10px] opacity-0 hover:opacity-100 hover:bg-white w-full hover:bg-opacity-30">
                <div className="space-x-2">
                  <Link to={`/detail/${product.id}`}>
                    <Button className="btn bg-transparent border-red-500 rounded-full hover:scale-[1.1] hover:glass hover:bg-red-700 hover:text-white">
                      <FaSearch />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="btn text-white bg-red-600 glass hover:scale-[1.1] hover:text-red-600 hover:bg-white hover:border-solid hover:border-red-500 hover:border-[1px]"
                  >
                    <FaCartPlus />
                    Giỏ Hàng
                  </Button>
                  <Link to="/">
                    <Button className="btn bg-transparent border-red-500 rounded-full hover:scale-[1.1] hover:glass hover:bg-red-700 hover:text-white">
                      <FaHeart />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
