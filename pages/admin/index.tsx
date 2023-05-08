import { ROLE } from "@/const/app-const";
import { ProductManager } from "@/features/admin";
import { OrderManager } from "@/features/admin/order/OrderManager";
import { ProtectPage } from "@/middleware/client/ProtectPage";
import { Row, Tabs, TabsProps } from "antd";

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
  ];
  return (
    <ProtectPage role={ROLE.ADMIN}>
      <Row style={{ minHeight: "80vh", padding: "0.5rem" }}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: "100%" }}
          items={items}
        />
      </Row>
    </ProtectPage>
  );
}
