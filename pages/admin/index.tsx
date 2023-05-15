import { ROLE } from "@/const/app-const";
import {
  Overview,
  ProductManager,
  WarehouseImportManager,
} from "@/features/admin";
import { OrderManager } from "@/features/admin/order/OrderManager";
import { ProtectPage } from "@/middleware/client/ProtectPage";
import { Row, Tabs, TabsProps } from "antd";
import { useEffect } from "react";

export default function AdminPage() {
  const items: TabsProps["items"] = [
    {
      label: <p className="textTheme">Quản lý sản phẩm</p>,
      key: "product-manager",
      children: <ProductManager />,
    },
    {
      label: <p className="textTheme">Quản lý đơn hàng</p>,
      key: "order-manager",
      children: <OrderManager />,
    },
    {
      label: <p className="textTheme">Nhập hàng</p>,
      key: "import-manager",
      children: <WarehouseImportManager />,
    },
    {
      label: <p className="textTheme">Tổng quan bán hàng</p>,
      key: "overview-manager",
      children: <Overview />,
    },
  ];

  return (
    <ProtectPage role={ROLE.ADMIN}>
      <Row
        style={{
          minHeight: "80vh",
          padding: "0.5rem",
          background: "white",

          opacity: 0.95,
        }}
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: "100%", width: "100%" }}
          items={items}
        />
      </Row>
    </ProtectPage>
  );
}
