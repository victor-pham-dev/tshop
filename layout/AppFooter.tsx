import React from "react";
import Image from "next/image";
import { Col, Row } from "antd";

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear();

  return (
    <Row
      gutter={[16, 0]}
      align="middle"
      justify="center"
      style={{ padding: "1rem" }}
    >
      <Col xxl={2}>
        <Image src="/favicon.svg" alt="shop" width={80} height={80}></Image>
      </Col>
      <Col xxl={6} xs={20}>
        <Row align="middle" justify="center">
          <Col span={24}>
            <p style={{ textAlign: "center" }}></p> &#169;&nbsp; Copyright by
            ITX Gear - {thisYear}
          </Col>
          <Col span={24}>
            Cảm ơn quý khách hàng đã ghé thăm{" "}
            <span style={{ color: "red" }}>&#10084;</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
