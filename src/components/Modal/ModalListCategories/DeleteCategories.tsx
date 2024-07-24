import React from "react";
import { Button } from "react-daisyui";

interface ModalDeleteAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCategories: React.FC<ModalDeleteAdminProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-10"
    >
      <div className="flex flex-col items-center rounded-lg bg-white p-5 shadow ">
        <div className="">
          <p className="font-bold text-black ">
            Xác nhận xoá
            <label className="pl-1 text-secondary">Task</label>
          </p>
        </div>

        <div className="py-5 text-gray-500">
          Task này sẽ bị xoá <br /> sau khi bạn nhấn "
          <label className="font-bold text-primary">Đồng ý</label>"
        </div>
        <div className="flex w-64 flex-col space-y-3 text-center">
          <Button color="primary" type="button" className="text-white">
            Đồng ý
          </Button>

          <Button onClick={onClose} className="border-gray-50 text-black">
            Huỷ bỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategories;
