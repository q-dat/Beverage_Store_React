import React, { useEffect, useState } from "react";
import { Table, Button } from "react-daisyui";
import { MdDelete } from "react-icons/md";
import NavtitleAdmin from "../../components/admin/NavtitleAdmin";
import TableListAdmin from "../../components/admin/TablelistAdmin";
import { FaPenToSquare } from "react-icons/fa6";
import { RiAddBoxLine } from "react-icons/ri";
import NavbarMobile from "../../components/Reponsive/Mobile/NavbarMobile";
import CreateProduct from "../../components/Modal/ModalListProducts/CreateProduct";
import EditProduct from "../../components/Modal/ModalListProducts/EditProduct";
import DeleteProduct from "../../components/Modal/ModalListProducts/DeleteProduct";
import { Catalogs } from "../../types/Products";
import { fetchCategories } from "../../services/CategoryService";

const CategoryPage: React.FC<{}> = () => {
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
  // Danh Mục/Catalog
  const [categories, setCategories] = useState<Catalogs[]>([]);

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

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Danh mục sản phẩm" />
      <div>
        <NavtitleAdmin
          Title_NavtitleAdmin="Danh mục sản phẩm"
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
          Title_TableListAdmin={`Danh mục sản phẩm vừa cập nhật gần đây (${categories.length})`}
          // Table_head
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>Số thứ tự</span>
              <span>Tên Danh Mục</span>
              <span>Trạng thái</span>
            </Table.Head>
          }
          // Table_body
          table_body={
            <Table.Body className="text-center text-sm">
              {categories.map((row, index) => (
                <Table.Row key={row.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  {/* Status Btn */}
                  <span>
                    {/* Edit Btn */}
                    <div className="flex flex-row items-center justify-center gap-2">
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
                        onClick={() => openModal("delete", row.id.toString())}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <MdDelete />
                        Xoá
                      </Button>

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

export default CategoryPage;
