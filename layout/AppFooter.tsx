import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Image from "next/image";
import { Col, Divider, Row } from "antd";

export const AppFooter: React.FC = () => {
  const thisYear = new Date().getFullYear();

  return (
    <div style={{ lineHeight: 2 }}>
      <Divider style={{ backgroundColor: "white" }} />
      <Row align="middle">
        <Col>
          <Image
            src="/favicon.svg"
            alt="mina"
            width={80}
            height={80}
            style={{ margin: "-1rem -0.8rem 0 0" }}
          ></Image>
        </Col>
        <Col>
          <p>&#169;&nbsp; Mini PC - Nhỏ nhưng có võ - {thisYear}</p>
        </Col>
      </Row>
    </div>
  );
};
