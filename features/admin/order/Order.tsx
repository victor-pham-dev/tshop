import { useLoading } from "@/hooks";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import "react-quill/dist/quill.snow.css";

import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  STATUS_CODE,
} from "@/const/app-const";
import { useMutation, useQueryClient } from "react-query";

import { Order } from "@prisma/client";

import React, { useMemo, useState } from "react";
import { CartDataProps } from "@/contexts/CartContext";
import { ConfirmOrderProps } from "@/pages/api/order/confirm";
import {
  CancelOrderApi,
  ConfirmOrderApi,
  MarkDoneOrderApi,
  MarkShippingOrderApi,
} from "@/pages/api/order.api";
import { MarkShippingOrderProps } from "@/pages/api/order/markshipping";
import { MarkDoneOrderProps } from "@/pages/api/order/markdone";
import { MarkCancelOrderProps } from "@/pages/api/order/cancel";

const { Text } = Typography;
interface Props {
  data: Order | undefined;
}
export function Order({ data }: Props): JSX.Element {
  const itemsMemo: CartDataProps[] = useMemo(() => {
    if (data !== undefined && data.items !== undefined) {
      return JSON.parse(data.items);
    }
    return [];
  }, [data]);
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openShippingModal, setOpenShippingModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const confirmOrder = useMutation(
    "confirmOrder",
    (data: ConfirmOrderProps) => ConfirmOrderApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Xác nhận thành công");
          queryClient.invalidateQueries("searchOrders");
          setOpenConfirmModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  const markShippingOrder = useMutation(
    "confirmOrder",
    (data: MarkShippingOrderProps) => MarkShippingOrderApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Xác nhận đang vận chuyển thành công");
          queryClient.invalidateQueries("searchOrders");
          setOpenShippingModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  const markDoneOrder = useMutation(
    "confirmOrder",
    (data: MarkDoneOrderProps) => MarkDoneOrderApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Đã xác nhận đơn đã hoàn thành");
          queryClient.invalidateQueries("searchOrders");
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  const markCancelOrder = useMutation(
    "confirmOrder",
    (data: MarkCancelOrderProps) => CancelOrderApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Đã huỷ đơn");
          queryClient.invalidateQueries("searchOrders");
          setOpenCancelModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  return (
    <React.Fragment>
      {data === undefined ? (
        <p>Chọn đơn hàng để xem</p>
      ) : (
        <Row
          gutter={[16, 16]}
          style={{ padding: "1rem", maxHeight: "90vh", overflowY: "scroll" }}
        >
          <Divider className="textTheme">
            <span
              style={
                data.status === ORDER_STATUS.CANCELED
                  ? { color: "red" }
                  : data.status === ORDER_STATUS.WAITING_FOR_CONFIRM
                  ? { color: "yellow" }
                  : data.status === ORDER_STATUS.SHIPPING
                  ? { color: "brown" }
                  : data.status === ORDER_STATUS.DONE
                  ? { color: "green" }
                  : { color: "brown" }
              }
            >
              {data.status}
            </span>
            {data?.id}
          </Divider>
          {data.status === ORDER_STATUS.CANCELED && (
            <Text code>{`Lý do: ${data.cancelReason}`}</Text>
          )}
          <Col xxl={24} xs={24}>
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
                  <Col xxl={6}>Phân loại</Col>
                  <Col xxl={3}>Giá</Col>
                  <Col xxl={3}>Số lượng</Col>
                  <Col xxl={4}>Thành tiền</Col>
                </Row>
              </Col>
            </Row>
            {itemsMemo.map((item) => {
              const classify = item.Product.classifications.find(
                (classifi) => classifi.id === item.classificationId
              );
              return (
                <Row
                  className="roundedBox boxShadow textTheme"
                  align="middle"
                  gutter={[8, 0]}
                  style={{ marginTop: 6 }}
                >
                  <Col xxl={23}>
                    <Row
                      align="middle"
                      style={{ padding: "0.5rem" }}
                      gutter={[8, 0]}
                    >
                      <Col xxl={3}>
                        <img
                          src={item.image}
                          alt="image product"
                          style={{
                            width: "100%",
                            maxHeight: 84,
                            borderRadius: "0.5rem",
                          }}
                        />
                      </Col>
                      <Col xxl={5}>{item.Product?.name}</Col>
                      <Col xxl={6}> {classify?.name}</Col>
                      <Col xxl={4}> {classify?.price.toLocaleString()} đ</Col>
                      <Col xxl={3}>{item.quantity}</Col>
                      <Col xxl={3}>
                        {(
                          item.quantity * (classify?.price ?? 0)
                        ).toLocaleString()}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
            <Row
              gutter={[20, 20]}
              style={{ marginTop: 16 }}
              justify="end"
              align="middle"
            >
              <Col style={{ color: "gold" }}>
                Trạng thái đơn hàng: {data?.status}{" "}
              </Col>
              <Col>Tổng tiền: {data?.total.toLocaleString()} đ </Col>
            </Row>
            <Divider className="textTheme">Thông tin nhận hàng</Divider>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              className="roundedBox boxShadow textTheme"
            >
              <h4>
                Người nhận :<Text code>{data?.receiver}</Text>
              </h4>
              <h4>
                Số điện thoại :<Text code>{data?.phone}</Text>
              </h4>
              <h4>
                Email :<Text code>{data?.email}</Text>
              </h4>
              <h4>
                Địa chỉ :
                <Text
                  code
                >{`${data?.specificAddress}-${data?.ward}-${data?.district}-${data?.province}`}</Text>
              </h4>
              <h4>
                Ghi chú :<Text code>{data?.note}</Text>
              </h4>
            </Space>
          </Col>

          <Col xxl={24} xs={24}>
            <Divider className="textTheme">Thông tin thanh toán</Divider>
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              className="roundedBox boxShadow textTheme"
            >
              <Text
                code
                className="textTheme"
              >{`Phương thức : ${data?.paymentMethod}`}</Text>
              {data?.paymentMethod !== PAYMENT_METHOD.COD && (
                <Text
                  code
                  type={
                    data?.paymentStatus === PAYMENT_STATUS.NOT_YET
                      ? "warning"
                      : "success"
                  }
                >{`Trạng thái thanh toán : ${data?.paymentStatus}`}</Text>
              )}
              <Text
                code
                type="success"
                style={{ width: "100%" }}
              >{`Thông tin thanh toán : ${data?.paymentInfo}`}</Text>
            </Space>
          </Col>

          <Col xxl={24} xs={24}>
            <Divider className="textTheme">Thông tin Vận chuyển</Divider>

            <Text code className="textTheme">{`${data?.shippingInfo}`}</Text>
          </Col>

          <Col xxl={24} xs={24}>
            <Space>
              {data.status === ORDER_STATUS.WAITING_FOR_CONFIRM && (
                <Button
                  onClick={() => setOpenConfirmModal(true)}
                  type="primary"
                >
                  Xác nhận đơn
                </Button>
              )}
              {data.status === ORDER_STATUS.CONFIRMED && (
                <Button
                  onClick={() => setOpenShippingModal(true)}
                  type="primary"
                >
                  Chuyển sang đang vận chuyển
                </Button>
              )}
              {data.status === ORDER_STATUS.SHIPPING && (
                <Popconfirm
                  title="Đánh dấu là đơn đã hoàn thành"
                  onConfirm={() => markDoneOrder.mutate({ id: data.id ?? "" })}
                >
                  <Button type="primary" style={{ background: "green" }}>
                    Đánh dấu là đơn đã hoàn thành
                  </Button>
                </Popconfirm>
              )}
              {data.status !== ORDER_STATUS.DONE &&
                data.status !== ORDER_STATUS.CANCELED && (
                  <Button
                    type="primary"
                    danger
                    onClick={() => setOpenCancelModal(true)}
                  >
                    Huỷ đơn này
                  </Button>
                )}
            </Space>
          </Col>
        </Row>
      )}
      {/* //confirm modal */}
      <Modal
        open={openConfirmModal}
        onCancel={() => setOpenConfirmModal(false)}
        title={"Xác nhận đơn này!"}
        footer={null}
      >
        <Form
          name="confirmOrder"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(values) => {
            let paymentInfo: string = "";
            if (data?.paymentMethod === PAYMENT_METHOD.COD) {
              paymentInfo = "Khách chọn thanh toán khi nhận hàng";
            } else {
              paymentInfo = values.paymentInfo;
            }
            return confirmOrder.mutate({ id: data?.id ?? "", paymentInfo });
          }}
        >
          {data?.paymentMethod === PAYMENT_METHOD.ONLINE && (
            <Form.Item
              label="Thông tin thanh toán"
              name="paymentInfo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thông tin thanh toán!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Xác nhận đơn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* shipping modal */}
      <Modal
        open={openShippingModal}
        onCancel={() => setOpenShippingModal(false)}
        title={"Xác nhận đơn này là đang vận chuyển!"}
        footer={null}
      >
        <Form
          name="shippingModal"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(values) => {
            return markShippingOrder.mutate({ ...values, id: data?.id ?? "" });
          }}
        >
          <Form.Item
            label="Thông tin vận chuyển"
            name="shippingInfo"
            rules={[
              {
                required: true,
                message: "Vui lòng điền thông tin vận chuyển!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Xác nhận đơn đang vận chuyển
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* cancel modal */}
      <Modal
        open={openCancelModal}
        onCancel={() => setOpenCancelModal(false)}
        title={"Xác nhận đơn này là HUỶ!"}
        footer={null}
      >
        <Form
          name="cancelOrder"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={(values) => {
            return markCancelOrder.mutate({ ...values, id: data?.id ?? "" });
          }}
        >
          {data?.paymentMethod === PAYMENT_METHOD.ONLINE && (
            <Form.Item
              label="Lý do huỷ đơn"
              name="cancelReason"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền lý do huỷ đơn!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          )}

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Xác nhận huỷ đơn
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
