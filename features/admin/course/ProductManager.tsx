import { Col, Row, Tabs, TabsProps } from "antd";
import { Product } from "./Product";
import { useState } from "react";
import { ProductList } from "./ProductList";

export function ProductManager(): JSX.Element {
  return (
    <Row gutter={[16, 16]}>
      <Col xxl={10}>
        <div className="roundedBox boxShadow">
          <ProductList />
        </div>
      </Col>
      <Col xxl={14}>
        <div className="roundedBox boxShadow">
          <Product />
        </div>
      </Col>
    </Row>
  );
}
