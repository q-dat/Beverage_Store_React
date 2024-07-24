import React, { useEffect, useState } from "react";
import { Table, Button } from "react-daisyui";
import { MdDelete } from "react-icons/md";
import NavtitleAdmin from "../../components/admin/NavtitleAdmin";
import TableListAdmin from "../../components/admin/TablelistAdmin";
import { FaCircleInfo, FaPenToSquare } from "react-icons/fa6";
import { RiAddBoxLine } from "react-icons/ri";
import NavbarMobile from "../../components/Reponsive/Mobile/NavbarMobile";
import CreateProduct from "../../components/Modal/ModalListProducts/CreateProduct";
import EditProduct from "../../components/Modal/ModalListProducts/EditProduct";
import DeleteProduct from "../../components/Modal/ModalListProducts/DeleteProduct";
import { Products } from "../../types/Products";
import { getProducts } from "../../services/ProductService";

const ListProductsPage: React.FC<{}> = () => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [, setSelectedList] = useState<string | null>(null);

  const openModal = (modalName: string, productId?: string) => {
    setCurrentModal(modalName);
    if (productId) setSelectedList(productId);
  };

  const closeModal = () => {
    setCurrentModal(null);
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
//
  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Danh sách sản phẩm" />
      <div>
        <NavtitleAdmin
          Title_NavtitleAdmin="Danh sách sản phẩm"
          Btn_Create={
            <>
              <Button
                color="primary"
                onClick={() => openModal("create")}
                className=" text-sm font-light text-white"
              >
                <div className="flex items-center space-x-1">
                  <RiAddBoxLine className="text-xl" />
                  <p> Thêm</p>
                </div>
              </Button>
            </>
          }
        />
        {/* DashboardChart */}
        <TableListAdmin
          Title_TableListAdmin={`Danh sách sản phẩm vừa cập nhật gần đây (${products.length})`}
          // Table_head
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>Số thứ tự</span>
              <span>Hình ảnh</span>
              <span>Tên sản phẩm</span>
              <span>Danh mục</span>
              <span>Giá</span>
              <span>Trạng thái</span>
            </Table.Head>
          }
          // Table_body
          table_body={
            <Table.Body className="text-center text-sm">
              {products.map((row, index) => (
                <Table.Row key={row.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1"><img width={80} height={80} src={`./products/${row.img}`} alt="" /></span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  {/* Status Btn */}
                  <span>
                    <div>
                      <details>
                        <summary className="inline cursor-pointer text-base text-warning">
                          <div className="flex items-center justify-center px-[55px] py-2">
                            <FaCircleInfo />
                          </div>
                        </summary>
                        {/* Edit Btn */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Button
                            color="primary"
                            onClick={() => openModal("edit", row.id.toString())}
                            className="w-full max-w-[140px] text-sm font-light text-white"
                          >
                            <FaPenToSquare />
                            Cập nhật
                          </Button>
                          {/* Delete Btn */}
                          <Button
                            color="secondary"
                            onClick={() =>
                              openModal("delete", row.id.toString())
                            }
                            className="w-full max-w-[140px] text-sm font-light text-white"
                          >
                            <MdDelete />
                            Xoá
                          </Button>
                        </div>
                      </details>
                      {/* Confirmation Modal */}
                      <div>
                        {/* Create */}
                        <CreateProduct
                          isOpen={currentModal === "create"}
                          onClose={closeModal}
                        />
                        <EditProduct
                          isOpen={currentModal === "edit"}
                          onClose={closeModal}
                        />
                        <DeleteProduct
                          isOpen={currentModal === "delete"}
                          onClose={closeModal}
                        />
                      </div>
                    </div>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          }
        />
      </div>
    </div>
  );
};

export default ListProductsPage;
