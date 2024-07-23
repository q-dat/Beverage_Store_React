import React from "react";
import { Table } from "react-daisyui";
import NavtitleAdmin from "../../components/admin/NavtitleAdmin";
import TableListAdmin from "../../components/admin/TablelistAdmin";

const ListProductsPage: React.FC<{}> = () => {
  const data = [
    {
      id: 1,
      name: "Analytics",
    },
  ];
  return (
    <div className="w-full">
      <div className="">
        <NavtitleAdmin
          Title_NavtitleAdmin={"Danh sách sản phẩm"}
          Btn_Create={``}
        />
        {/* DashboardChart */}
        <TableListAdmin
          Title_TableListAdmin={`Danh sách sản phẩm vừa cập nhật gần đây (${data.length})`}
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
            <Table.Body className="text-center text-sm  ">
              {data?.map((row, index) => (
                <Table.Row key={row.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.name}</span> 
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