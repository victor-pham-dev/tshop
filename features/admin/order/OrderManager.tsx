import { Col, Row } from "antd";
import { Order } from "./Order";
import { OrderList } from "./OrderList";
import { useState } from "react";
import { Order as OrderPrisma } from "@prisma/client";

export function OrderManager(): JSX.Element {
  const [order, setOrder] = useState<OrderPrisma | undefined>(undefined);

  return (
    <Row gutter={[16, 16]}>
      <Col xxl={12}>
        <div
          style={{ width: "100%", padding: 16 }}
          className="roundedBox boxShadow"
        >
          <OrderList setOrder={setOrder} />
        </div>
      </Col>
      <Col xxl={12}>
        <div className="roundedBox boxShadow">
          <Order data={order} />
        </div>
      </Col>
    </Row>
  );
}
