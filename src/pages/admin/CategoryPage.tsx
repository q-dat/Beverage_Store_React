import React, { useEffect, useState } from "react";
import { Table, Button } from "react-daisyui";
import { MdDelete } from "react-icons/md";
import NavtitleAdmin from "../../components/admin/NavtitleAdmin";
import TableListAdmin from "../../components/admin/TablelistAdmin";
import { FaPenToSquare } from "react-icons/fa6";
import { RiAddBoxLine } from "react-icons/ri";
import NavbarMobile from "../../components/Reponsive/Mobile/NavbarMobile";
import { fetchCategories } from "../../services/CategoryService";
import DeleteCategories from "../../components/Modal/ModalListCategories/DeleteCategories";
import CreateCategories from "../../components/Modal/ModalListCategories/CreateCategories";
import { Catalogs } from "../../types/Products";
import EditCategories from "../../components/Modal/ModalListCategories/EditCategories";

const CategoryPage: React.FC<{}> = () => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [, setSelectedList] = useState<string | null>(null);

  const openModal = (modalName: string, CatDeleteCategoriesId?: string) => {
    setCurrentModal(modalName);
    if (CatDeleteCategoriesId) setSelectedList(CatDeleteCategoriesId);
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
                        <CreateCategories
                          isOpen={currentModal === "create"}
                          onClose={closeModal}
                        />
                        <EditCategories
                          isOpen={currentModal === "edit"}
                          onClose={closeModal}
                        />
                        <DeleteCategories
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
