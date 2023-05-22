"use client";
import { Divider, Row } from "antd";
import { useRouter } from "next/router";

export default function ConfirmRegister() {
  const router = useRouter();
  const isFalse = router.asPath.includes("error");
  return (
    <Row>
      {!isFalse ? (
        <Divider style={{ color: "white" }}>Xác thực thành công</Divider>
      ) : (
        <Divider style={{ color: "white" }}>
          Link xác thực đã hết hạn hoặc không hợp lệ
        </Divider>
      )}
    </Row>
  );
}
