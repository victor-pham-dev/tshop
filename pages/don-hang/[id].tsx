import { Col, Divider, Row, Space, Typography } from "antd";

import React, { useMemo } from "react";

import { GetInfoOrderByIdApi } from "../api/order.api";
import { Order } from "@prisma/client";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { ContentLoading } from "@/components";
import { CartItemCard } from "@/components/card/CartItemCard";
import { CartDataProps } from "@/contexts/CartContext";
import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from "@/const/app-const";
import { useUser } from "@/hooks";
const { Text } = Typography;

export default function Order() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  console.log(id);
  const getOrder = useQuery(`order ${id}`, () => {
    return GetInfoOrderByIdApi(id?.toString() ?? "");
  });
  const dataMemo = useMemo(() => getOrder.data?.data, [getOrder.data?.data]);
  // console.log(dataMemo);
  const itemsMemo: CartDataProps[] = useMemo(() => {
    if (dataMemo?.items !== undefined) {
      return JSON.parse(dataMemo.items);
    }
    return [];
  }, [dataMemo]);
  return (
    <React.Fragment>
      {getOrder.isLoading ? (
        <ContentLoading />
      ) : dataMemo !== undefined && dataMemo !== null ? (
        <Row gutter={[16, 16]} style={{ padding: "1rem" }}>
          <Divider className="textTheme">
            Cảm ơn Quý khách đã đặt hàng - Thông tin đơn hàng {id} -{" "}
            <span
              style={
                dataMemo.status === ORDER_STATUS.CANCELED
                  ? { color: "red" }
                  : dataMemo.status === ORDER_STATUS.WAITING_FOR_CONFIRM
                  ? { color: "yellow" }
                  : dataMemo.status === ORDER_STATUS.SHIPPING
                  ? { color: "brown" }
                  : dataMemo.status === ORDER_STATUS.DONE
                  ? { color: "green" }
                  : { color: "brown" }
              }
            >
              {dataMemo.status}
            </span>
          </Divider>
          {dataMemo.status === ORDER_STATUS.CANCELED && (
            <Text code>{`Lý do: ${dataMemo.cancelReason}`}</Text>
          )}
          <Col xxl={16} xs={24}>
            <Divider className="textTheme">Sản phẩm mua</Divider>
            <Row
              style={{
                background: "#fff",
                marginTop: 16,
                marginBottom: 8,
                color: "#000",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
              className=" boxShadow textTheme"
              align="middle"
              gutter={[8, 0]}
            >
              <Col xxl={23}>
                <Row
                  align="middle"
                  style={{ padding: "0.5rem" }}
                  gutter={[8, 0]}
                >
                  <Col xxl={3}>Ảnh</Col>
                  <Col xxl={5}>Tên sản phẩm</Col>
                  <Col xxl={4}>Phân loại</Col>
                  <Col xxl={3}>Giá</Col>
                  <Col xxl={3}>Số lượng</Col>
                  <Col xxl={3}>Thành tiền</Col>
                  <Col xxl={1}></Col>
                </Row>
              </Col>
            </Row>
            {itemsMemo.map((item) => (
              <CartItemCard
                key={`order item ${item.id}`}
                data={item}
                viewOnly={true}
              />
            ))}
            <Row
              gutter={[20, 20]}
              style={{ marginTop: 16 }}
              justify="end"
              align="middle"
            >
              <Col style={{ color: "gold" }}>
                Trạng thái đơn hàng: {dataMemo?.status}{" "}
              </Col>
              <Col>Tổng tiền: {dataMemo?.total.toLocaleString()} đ </Col>
            </Row>
            <Divider className="textTheme">Thông tin nhận hàng</Divider>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              className="roundedBox boxShadow textTheme"
            >
              <h4>{`Người nhận : ${dataMemo?.receiver}`}</h4>
              <h4>{`Số điện thoại : ${dataMemo?.phone}`}</h4>
              <h4>{`Email : ${dataMemo?.email}`}</h4>
              <h4>{`Địa chỉ : ${dataMemo?.specificAddress}-${dataMemo?.ward}-${dataMemo?.district}-${dataMemo?.province}`}</h4>
              <h4>{`Ghi chú : ${dataMemo?.note}`}</h4>
            </Space>

            <Divider className="textTheme">Thông tin vận chuyển</Divider>
            <p>Sẽ được thông báo qua EMAIL</p>
          </Col>

          <Col xxl={8} xs={24}>
            <Divider className="textTheme">Thông tin thanh toán</Divider>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              className="roundedBox boxShadow textTheme"
            >
              <Text
                code
                className="textTheme"
              >{`Phương thức : ${dataMemo?.paymentMethod}`}</Text>
              {dataMemo?.paymentMethod !== PAYMENT_METHOD.COD && (
                <Text
                  code
                  type={
                    dataMemo?.paymentStatus === PAYMENT_STATUS.NOT_YET
                      ? "warning"
                      : "success"
                  }
                >{`Trạng thái thanh toán : ${dataMemo?.paymentStatus}`}</Text>
              )}
              {dataMemo?.paymentMethod !== PAYMENT_METHOD.COD &&
                dataMemo?.paymentStatus === PAYMENT_STATUS.NOT_YET && (
                  <React.Fragment>
                    <Text className="textTheme">
                      Vui lòng chuyển khoản tới tài khoản sau để thanh toán
                    </Text>
                    <Text code className="textTheme">
                      Nội dung:
                      <Text className="textTheme" code copyable>
                        {dataMemo.email}
                      </Text>
                    </Text>

                    <Text code className="textTheme">
                      Số tiền: {dataMemo.total.toLocaleString()} đ{" "}
                    </Text>
                    <Text code className="textTheme">
                      CTK: PHAM VAN TRUONG - 03960870688 - TP
                    </Text>
                    <Text code type="danger">
                      Đơn hàng của bạn sẽ được xử lý nhanh hơn vào giờ hành
                      chính - LH:{" "}
                      <Text code copyable type="success">
                        0343241299
                      </Text>{" "}
                      hoặc Messenger để nhận tư vấn
                    </Text>
                    <img
                      style={{ width: "100%", borderRadius: "0.5rem" }}
                      src="https://img.vietqr.io/image/TPB-03960870688-compact.png"
                    />

                    <Divider className="textTheme">
                      Xin chân thành cảm ơn quý khách !
                    </Divider>
                  </React.Fragment>
                )}
            </Space>
          </Col>
        </Row>
      ) : (
        <p style={{ paddingTop: 30, textAlign: "center" }}>
          Vui lòng đăng nhập để xem đơn hàng của bạn
        </p>
      )}
      {getOrder.isError && <p>{getOrder.data?.msg}</p>}
    </React.Fragment>
  );
}
