import React from "react";
import { Button } from "react-daisyui";
import InputForm from "../../admin/InputForm";
import { FaPencil } from "react-icons/fa6";
import LabelForm from "../../admin/LabelForm";
//Icon
interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategories: React.FC<ModalCreateAdminProps> = ({
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
      className=" modal-overlay
          fixed inset-0 z-50 flex w-full items-center
     justify-center bg-black bg-opacity-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col  rounded-lg bg-white p-5 text-start  shadow"
      >
        {/*  */}
        <div className="my-10 flex flex-col items-center  xl:mx-16 xl:flex-row xl:items-start xl:justify-between">
          <div className="relative">
            <img src={``} className="h-[150px] w-[150px] rounded-full" alt="" />
            <div className="absolute right-0 top-20 cursor-pointer rounded-full bg-primary p-3">
              <FaPencil className="text-black" />
            </div>
          </div>
          {/* Input  */}
          <div className="flex w-full flex-col space-y-5 md:px-3 xl:w-72">
            <LabelForm title="Họ tên" />
            <InputForm placeholder={``} type={"text"}></InputForm>
            <LabelForm title="Email" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
            <LabelForm title="Phone" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
            <LabelForm title="Giới Tính" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
            <LabelForm title="Chức Vụ" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
          </div>
          {/* Input */}

          <div className="flex w-full flex-col space-y-5 md:px-3 xl:w-72">
            <LabelForm title="Tên tài khoản" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
            <LabelForm title="Chi nhánh" />
            <InputForm placeholder={``} type={"text"}></InputForm>{" "}
            <LabelForm title="Quốc gia" />
            <InputForm placeholder={"Việt Nam"} type={"text"}></InputForm>
          </div>
        </div>
        {/*  */}
        <div className="space-x-5 text-center">
          <Button onClick={onClose} className="border-gray-50 text-black">
            Huỷ bỏ
          </Button>
          <Button type="submit" color="primary" className=" text-white">
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};



export default CreateCategories
