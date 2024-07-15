import React, { useEffect, useState } from "react";
import { FaSearch, FaCartPlus, FaHeart } from "react-icons/fa";
import { Catalogs, Products } from "../types/Products";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/CategoryService";
import { Button, Input } from "react-daisyui";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Shop: React.FC = () => {
  //Tìm Kiếm/Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Products[]>([]);

  // Danh Mục/Catalog
  const [categories, setCategories] = useState<Catalogs[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Sản Phẩm/Products
  const [products, setProducts] = useState<Products[]>([]);

  // Tìm Kiếm/Search
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  // Lấy tất cả sản phẩm ban đầu
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  // Lấy danh mục ban đầu
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    loadCategories();
  }, []);

  // Lấy sản phẩm theo danh mục khi danh mục được chọn
  useEffect(() => {
    const loadProductsByCategory = async () => {
      if (selectedCategory !== null) {
        try {
          const fetchedProducts = await fetchProductsByCategory(
            selectedCategory
          );
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Lỗi khi lấy sản phẩm:", error);
        }
      }
    };
    loadProductsByCategory();
  }, [selectedCategory]);
  //Sự kiện ấn vào tên danh mục
  const handleCategoryClick = (id: number | null) => {
    setSelectedCategory(id);
    if (id === null) {
      const loadProducts = async () => {
        try {
          const fetchedProducts = await fetchAllProducts();
          setProducts(fetchedProducts);
        } catch (error) {
          console.error(error);
        }
      };
      loadProducts();
    }
  };

  return (
    <div>
      {/* Input search */}
      <div className="relative mx-[10px] xl:mx-[150px] flex items-center ">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="border-black focus:outline-none w-full"
          type="text"
          placeholder="Tìm Kiếm..."
        />
        <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer text-black " />
      </div>
      {/* Button Categories */}
      <div className="px-[10px] xl:px-[150px] ">
        <p className="font-bold my-5 text-4xl">Danh Mục</p>
        <Button
          className=" bg-primary text-white hover:bg-white hover:text-primary hover:bg-opacity-50"
          onClick={() => handleCategoryClick(null)}
        >
          Tất cả sản phẩm
        </Button>
        {categories.map((category) => (
          <Button
            onClick={() => handleCategoryClick(category.id)}
            key={category.id}
            className="md:mx-2 bg-primary text-white hover:bg-white hover:text-primary hover:bg-opacity-50"
          >
            {category.name}
          </Button>
        ))}
      </div>
      {/* Products */}
      <section className="mt-10 px-[10px] xl:px-[150px]">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 md:gap-[10px] gap-[10px] justify-center items-center">
          {(searchTerm ? searchResults : products).map((product) => (
            <div
              key={product.id}
              className="relative border-gray-300 border-[1px] rounded-[10px]"
            >
              <Link to={`/detail/${product.id}`}>
                <img
                  className="rounded-[10px] lg:w-[350px] lg:h-[350px] xl:w-[240px] xl:h-[220px] object-cover"
                  loading="lazy"
                  src={`./products/${product.img}`}
                  alt={product.name}
                />
              </Link>

              <div className="flex justify-between items-start flex-row">
                <div className="my-[10px] pl-[10px] min-h-[120px] font-serif">
                  <p className="font-light">{product.name}</p>
                  <div className="hidden xl:block md:space-x-2">
                    <span>{product.price}.000đ</span>
                    {product.sale && (
                      <del className="text-red-500">{product.sale}.000đ</del>
                    )}
                  </div>

                  <div className="xl:hidden">
                    {product.sale && (
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
                    <button className="btn bg-transparent border-red-500 rounded-full hover:scale-[1.1] hover:glass hover:bg-red-700 hover:text-white">
                      <FaSearch />
                    </button>
                  </Link>
                  <button className="btn text-white bg-red-600 glass hover:scale-[1.1] hover:text-red-600 hover:bg-white hover:border-solid hover:border-red-500 hover:border-[1px]">
                    <FaCartPlus />
                    Giỏ Hàng
                  </button>
                  <Link to="/">
                    <button className="btn bg-transparent border-red-500 rounded-full hover:scale-[1.1] hover:glass hover:bg-red-700 hover:text-white">
                      <FaHeart />
                    </button>
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

export default Shop;
