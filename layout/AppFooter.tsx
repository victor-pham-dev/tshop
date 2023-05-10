import React from "react";
import Image from "next/image";
import { Col, Divider, Row } from "antd";

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear();

  return (
    <Row
      gutter={[16, 0]}
      align="middle"
      justify="center"
      style={{ padding: "1rem" }}
    >
      <Col>
        <Image src="/favicon.svg" alt="shop" width={80} height={80}></Image>
      </Col>
      <Col>
        <p>
          &#169;&nbsp; Copyright by Mix tech - {thisYear} - Cảm ơn quý khách
          hàng đã ghé thăm {"<3"}
        </p>
      </Col>
    </Row>
  );
};
