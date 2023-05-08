import { useQuery } from "react-query";
import { GetMyOrdersApi } from "../api/order.api";
import React, { useMemo } from "react";
import { ContentLoading } from "@/components";
import { Button, Col, Divider, Row } from "antd";
import { CartDataProps } from "@/contexts/CartContext";
import Link from "next/link";
import { PATH } from "@/const/app-const";

export default function MyOrders() {
  const getMyOrders = useQuery("getMyOrders", () => GetMyOrdersApi());

  const ordersMemo = useMemo(() => {
    if (
      getMyOrders.data?.data !== null &&
      getMyOrders.data?.data !== undefined
    ) {
      return getMyOrders.data?.data;
    }
    return [];
  }, [getMyOrders.data?.data]);
  console.log(ordersMemo);
  return (
    <React.Fragment>
      {getMyOrders.isLoading ? (
        <ContentLoading />
      ) : (
        <Row justify="center">
          <Col xxl={16} xs={24}>
            <Row gutter={[0, 16]}>
              <Divider className="textTheme">
                Danh sách đơn hàng của bạn
              </Divider>

              {ordersMemo.map((item) => {
                const items = JSON.parse(item.items) as CartDataProps[];
                return (
                  <Col
                    style={{ marginTop: 20 }}
                    key={`order ${item.id}`}
                    span={24}
                  >
                    <Row
                      align="middle"
                      gutter={[16, 0]}
                      className="roundedBox boxShadow hoverEffect textTheme"
                    >
                      <Col xxl={3}>{items.length} Sản phẩm</Col>
                      <Col xxl={4}>{item.total.toLocaleString()}đ</Col>
                      <Col xxl={6}>{item.paymentMethod}</Col>
                      <Col xxl={4}>{item.paymentStatus}</Col>
                      <Col xxl={4}>{item.status}</Col>
                      <Col xxl={2}>
                        <Link href={`/${PATH.ORDER}/${item.id}`}>
                          <Button type="primary">Chi tiết</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      )}
      {getMyOrders.isError && <p>Có lỗi khi lấy đơn hàng</p>}
    </React.Fragment>
  );
}
