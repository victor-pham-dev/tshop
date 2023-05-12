import { useQuery } from "react-query";
import { GetMyOrdersApi } from "../api/order.api";
import React, { useMemo } from "react";
import { ContentLoading } from "@/components";
import { Button, Col, Divider, Row, Typography } from "antd";
import { CartDataProps } from "@/contexts/CartContext";
import Link from "next/link";
import { PATH } from "@/const/app-const";
import { useUser } from "@/hooks";
const { Text } = Typography;
export default function MyOrders() {
  const { token } = useUser();
  const getMyOrders = useQuery("getMyOrders", () =>
    GetMyOrdersApi(token ?? "")
  );

  const ordersMemo = useMemo(() => {
    if (
      getMyOrders.data?.data !== null &&
      getMyOrders.data?.data !== undefined
    ) {
      return getMyOrders.data?.data;
    }
    return [];
  }, [getMyOrders.data?.data]);
  return (
    <React.Fragment>
      {getMyOrders.isLoading ? (
        <ContentLoading />
      ) : (
        <Row justify="center">
          <Col
            xxl={16}
            xs={24}
            style={{
              background: "#bdbdbd",
              marginTop: 24,
              marginBottom: 30,

              padding: "1rem",
            }}
            className="roundedBox"
          >
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
                      gutter={[16, 16]}
                      className="roundedBox boxShadow hoverEffect textTheme"
                    >
                      <Col span={24}>
                        Ngày tạo:{" "}
                        {new Date(item.createdAt).toLocaleDateString()}-
                        <Text code type="danger" copyable>
                          {item.id}
                        </Text>
                      </Col>
                      <Col xxl={3} xs={24}>
                        <Text>{items.length}</Text> Sản phẩm
                      </Col>
                      <Col xxl={4} xs={24}>
                        <p>Tổng tiền:</p>
                        <Text code> {item.total.toLocaleString()}</Text>đ
                      </Col>
                      <Col xxl={6} xs={24}>
                        <p>Phương thức:</p>{" "}
                        <Text code>{item.paymentMethod}</Text>
                      </Col>
                      <Col xxl={4} xs={24}>
                        <p>Thanh toán:</p>
                        <Text code> {item.paymentStatus}</Text>
                      </Col>
                      <Col xxl={4} xs={24}>
                        <p>Trạng thái :</p>
                        <Text code>{item.status}</Text>
                      </Col>
                      <Col xxl={3} xs={24}>
                        <Link href={`/${PATH.ORDER}/${item.id}`}>
                          <Button block type="primary">
                            Chi tiết
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
              {ordersMemo.length === 0 && (
                <p
                  className="textTheme"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  Bạn chưa có đơn hàng nào cả
                </p>
              )}
            </Row>
          </Col>
        </Row>
      )}
      {getMyOrders.isError && <p>Có lỗi khi lấy đơn hàng</p>}
    </React.Fragment>
  );
}
