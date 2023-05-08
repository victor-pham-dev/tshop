import { Col, Row } from "antd";
import { Order } from "./Order";
import { OrderList } from "./OrderList";

export function OrderManager(): JSX.Element {
  return (
    <Row gutter={[16, 16]}>
      <Col xxl={10}>
        <div className="roundedBox boxShadow">
          <OrderList />
        </div>
      </Col>
      <Col xxl={14}>
        <div className="roundedBox boxShadow">
          <Order />
        </div>
      </Col>
    </Row>
  );
}
