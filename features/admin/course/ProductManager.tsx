import { Col, Row, Tabs, TabsProps } from "antd";
import { Product } from "./Product";
import { useState } from "react";
import { CourseList } from "./ProductList";
import { CourseProps } from "@/entities/course.entities";

export function ProductManager(): JSX.Element {
  const [activeTab, setActiveTab] = useState("courses");
  const [itemAction, setItemAction] = useState<"add" | "edit">("add");
  const [itemEditData, setItemEditData] = useState<CourseProps>();

  function changeTab(key: string) {
    setActiveTab(key);
  }

  const items: TabsProps["items"] = [
    {
      key: "courses",
      label: <span className="textTheme">Khoá học</span>,
      children: (
        <CourseList
          setItemEditData={setItemEditData}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      ),
    },
    {
      key: "course",
      label: (
        <span className="textTheme">
          {itemAction === "add" ? "Tạo mới" : "Chỉnh sửa"}
        </span>
      ),
      children: (
        <Product
          itemEditData={itemEditData}
          itemAction={itemAction}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xxl={12}>
        <CourseList
          setItemEditData={setItemEditData}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      </Col>
      <Col xxl={12}>
        <Product
          itemEditData={itemEditData}
          itemAction={itemAction}
          changeTab={changeTab}
          setItemAction={setItemAction}
        />
      </Col>
    </Row>
  );
}
