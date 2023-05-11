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
  const { token } = useUser();
  const { id } = router.query;
  const getOrder = useQuery([`order ${id}`, token], () => {
    return GetInfoOrderByIdApi(id?.toString() ?? "", token ?? "");
  });
  const dataMemo = useMemo(() => getOrder.data?.data, [getOrder.data?.data]);
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
          <Col span={24}>
            {" "}
            <h4>
              Cảm ơn Quý khách đã đặt hàng - Thông tin đơn hàng {id} -
              {" Trạng thái:"}
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
            </h4>
            {dataMemo.status === ORDER_STATUS.CANCELED && (
              <Text code>{`Lý do: ${dataMemo.cancelReason}`}</Text>
            )}
          </Col>

          <Col xxl={16} xs={{ span: 24, order: 1 }}>
            <Divider style={{ color: "white" }}>Sản phẩm mua</Divider>
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
              <Col xxl={23} xs={24}>
                <Row
                  align="middle"
                  style={{ padding: "0.5rem" }}
                  gutter={[8, 0]}
                >
                  <Col xxl={3} xs={6}>
                    Ảnh
                  </Col>
                  <Col xxl={5} xs={0}>
                    Tên sản phẩm
                  </Col>
                  <Col xxl={4} xs={6}>
                    Phân loại
                  </Col>
                  <Col xxl={3} xs={5}>
                    Giá
                  </Col>
                  <Col xxl={3} xs={5}>
                    Số lượng
                  </Col>
                  <Col xxl={3} xs={0}>
                    Thành tiền
                  </Col>
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
            <Divider style={{ color: "white" }}>Thông tin nhận hàng</Divider>
            <Space
              style={{ width: "100%", color: "white" }}
              direction="vertical"
              className="roundedBox boxShadow"
            >
              <h4>{`Người nhận : ${dataMemo?.receiver}`}</h4>
              <h4>{`Số điện thoại : ${dataMemo?.phone}`}</h4>
              <h4>{`Email : ${dataMemo?.email}`}</h4>
              <h4>{`Địa chỉ : ${dataMemo?.specificAddress}-${dataMemo?.ward}-${dataMemo?.district}-${dataMemo?.province}`}</h4>
              <h4>{`Ghi chú : ${dataMemo?.note}`}</h4>
            </Space>

            <Divider style={{ color: "white" }}>Thông tin vận chuyển</Divider>
            <p style={{ color: "white" }}>
              {" "}
              {dataMemo.shippingInfo.trim().length > 0
                ? dataMemo.shippingInfo.trim().length
                : "Chưa có thông tin vận chuyển"}
            </p>
          </Col>

          <Col xxl={8} xs={{ span: 24, order: 0 }}>
            {dataMemo.paymentMethod === PAYMENT_METHOD.ONLINE &&
              dataMemo.paymentStatus === PAYMENT_STATUS.NOT_YET && (
                <p style={{ color: "red" }}>
                  Đơn hàng của quý khách đã chọn thanh toán Online, quý khách
                  vui lòng thanh toán tới tài khoản sau
                </p>
              )}

            <Divider style={{ color: "white" }}>Thông tin thanh toán</Divider>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              className="roundedBox boxShadow textTheme"
            >
              <Text
                style={{ color: "white" }}
              >{`Phương thức : ${dataMemo?.paymentMethod}`}</Text>
              {dataMemo?.paymentMethod !== PAYMENT_METHOD.COD && (
                <Text
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
                    <Text style={{ color: "white" }}>
                      Vui lòng chuyển khoản tới tài khoản sau để thanh toán
                    </Text>
                    <Text style={{ color: "white" }}>
                      Nội dung:
                      <Text code copyable type="success">
                        {dataMemo.email}
                      </Text>
                    </Text>

                    <Text style={{ color: "white" }}>
                      Số tiền: {dataMemo.total.toLocaleString()} đ{" "}
                    </Text>
                    <Text style={{ color: "white" }}>
                      CTK: PHAM VAN TRUONG -
                      <Text code copyable type="success">
                        03960870688
                      </Text>{" "}
                      - TP
                    </Text>
                    <Text type="warning">
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

                    <Divider style={{ color: "white" }}>
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
