import { Col, Row, Skeleton, Space } from "antd";
import React from "react";

export const ContentLoading: React.FC = () => {
  return (
    <Space style={{ padding: "1rem" }} direction="vertical">
      <Row
        style={{ background: "#bdbdbd" }}
        className="roundedBox"
        gutter={[8, 8]}
      >
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
          <Skeleton.Button />
          <Skeleton.Button />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
          <Skeleton.Button />
          <Skeleton.Button />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
          <Skeleton.Button />
          <Skeleton.Button />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
          <Skeleton.Button />
          <Skeleton.Button />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
          <Skeleton.Button />
          <Skeleton.Button />
        </Col>
        <Col lg={24}>
          <Skeleton.Input active={true} size="default" />
        </Col>
        <Col lg={24}>
          <Skeleton.Input block active={true} size="default" />
        </Col>
      </Row>
    </Space>
  );
};
