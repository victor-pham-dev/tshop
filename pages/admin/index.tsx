import { ROLE } from "@/const/app-const";
import { ProductManager } from "@/features/admin";
import { ProtectPage } from "@/middleware/client/ProtectPage";
import { Row, Tabs, TabsProps } from "antd";

export default function AdminPage() {
  const items: TabsProps["items"] = [
    {
      label: <p className="textTheme">Quản lý sản phẩm</p>,
      key: "product-manager",
      children: <ProductManager />,
    },
  ];
  return (
    <ProtectPage role={ROLE.ADMIN}>
      <Row style={{ minHeight: "80vh" }}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: "80vh" }}
          items={items}
        />
      </Row>
    </ProtectPage>
  );
}
