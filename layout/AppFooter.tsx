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
      <Col xxl={12}>
        <Row align="middle"></Row>
        <Col xxl={24}> &#169;&nbsp; Copyright by Mix tech - {thisYear}</Col>
        <Col xxl={24}>
          Cảm ơn quý khách hàng đã ghé thăm{" "}
          <span style={{ color: "red" }}>&#10084;</span>
        </Col>
      </Col>
    </Row>
  );
};
