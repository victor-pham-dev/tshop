import { Col, Row } from "antd";
import { Product } from "./Product";
import { ProductList } from "./ProductList";

export function ProductManager(): JSX.Element {
  return (
    <Row gutter={[16, 16]}>
      <Col xxl={12}>
        <div className="roundedBox boxShadow">
          <ProductList />
        </div>
      </Col>
      <Col xxl={12}>
        <div className="roundedBox boxShadow">
          <Product />
        </div>
      </Col>
    </Row>
  );
}
