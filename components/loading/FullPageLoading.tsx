import { Col, Row, Spin } from "antd";
import React from "react";

export const FullPageLoading: React.FC = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: 9999,
        opacity: 1,
      }}
    >
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  );
};
