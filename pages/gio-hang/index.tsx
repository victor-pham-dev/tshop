import { CartItemCard } from "@/components/card/CartItemCard";
import { useCart, useLoading, useUser } from "@/hooks/useAppContext";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";

import {
  DeleteCartItemApi,
  UpdateCartItemApi,
  UpdateCartItemProps,
} from "../api/cart.api";
import { PATH, PaymentMethodOptions, STATUS_CODE } from "@/const/app-const";
import { Cart, Order } from "@prisma/client";
import { provinceList } from "@/const/provincesList";
import { REGEX } from "@/const/regexp";
import { CreateOrderApi } from "../api/order.api";
import { useRouter } from "next/router";
const { Text } = Typography;
interface DeleteProps {
  id: string;
  token: string;
}
interface OrderDataProps {
  checkedItems: Cart[];
  total: number;
}
export default function UserCart() {
  const router = useRouter();
  const { user } = useUser();
  const { updateAll, cart, remove } = useCart();
  const { setIsLoading } = useLoading();

  const updateQuantity = useMutation(
    "updateQuantity",
    (data: UpdateCartItemProps) => UpdateCartItemApi(data, user.token ?? "")
  );

  const deleteCartItem = useMutation(
    "deleteCart",
    ({ id, token }: DeleteProps) => DeleteCartItemApi(id, token),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data, { id }) => {
        if (data.code === STATUS_CODE.OK) {
          remove(id);
          setIsLoading(false);
        } else {
          message.error("Đã có lỗi xảy ra");
          setIsLoading(false);
        }
      },
      onError: () => {
        setIsLoading(false);
        message.error("Đã có lỗi xảy ra");
      },
    }
  );

  function CheckAll(checked: Boolean) {
    const checkAllCart = cart.map((item) => {
      if (checked === true) {
        const classifi = item.Product.classifications.find(
          (cls) => cls.id === item.classificationId
        );
        if (classifi !== undefined && item.quantity <= classifi?.quantity) {
          return { ...item, checked };
        } else {
          return item;
        }
      } else {
        return { ...item, checked };
      }
    });
    return updateAll(checkAllCart);
  }

  const orderData: OrderDataProps = useMemo(() => {
    let checkedItems: Cart[] = [];
    let total = 0;
    cart.forEach((cartItem) => {
      if (cartItem.checked !== undefined && cartItem.checked) {
        const classifyData = cartItem.Product.classifications.find(
          (item) => item.id === cartItem.classificationId
        );

        checkedItems.push(cartItem);
        total = total + cartItem.quantity * (classifyData?.price ?? 0);
      }
    });

    return {
      checkedItems,
      total,
    };
  }, [cart]);

  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const initFormValue = {
    receiver: user.name,
    email: user.email,
  };
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  function handleChangeProvince(level: number) {
    if (level < 2) {
      form.resetFields(["district"]);
    }
    form.resetFields(["ward"]);
  }
  console.log(cart);
  const createOrder = useMutation(
    "createOrder",
    (values: Order) => CreateOrderApi(values, user.token ?? ""),
    {
      onMutate: () => {
        setIsLoading(true);
        setOpenModal(false);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.CREATED) {
          message.success("Đơn hàng của bạn đã được tạo");
          updateAll(
            cart.filter(
              (item) => item.checked === false || item.checked === undefined
            )
          );
          router.push(`${PATH.ORDER}/${data.data}`);
          setIsLoading(false);
        } else {
          message.error(data.msg);
          setIsLoading(false);
        }
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  function onFinish(values: any) {
    const items = JSON.stringify(orderData.checkedItems);
    return createOrder.mutate({
      ...values,
      total: orderData.total,
      items,
      userId: user.id,
    });
  }

  return (
    <Row justify="center">
      <Col
        xxl={16}
        xs={24}
        style={{
          background: "#bdbdbd",
          marginTop: 30,
          marginBottom: 30,
          opacity: 0.95,
        }}
        className="roundedBox"
      >
        <Row
          className="roundedBox "
          style={{ background: "#fff", marginTop: 16, marginBottom: 8 }}
        >
          <Space>
            <Checkbox onChange={(e) => CheckAll(e.target.checked)} />{" "}
            <span style={{ color: "#000" }}>{`Chọn tất cả`}</span>
          </Space>
        </Row>

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
          <Col xxl={1}></Col>
          <Col xxl={23} xs={24}>
            <Row align="middle" style={{ padding: "0.5rem" }} gutter={[8, 0]}>
              <Col xxl={3} xs={6}>
                Ảnh
              </Col>
              <Col xxl={5} xs={0}>
                Tên sản phẩm
              </Col>
              <Col xxl={4} xs={6}>
                Phân loại
              </Col>
              <Col xxl={3} xs={6}>
                Giá
              </Col>
              <Col xxl={3} xs={5}>
                Số lượng
              </Col>
              <Col xxl={3} xs={0}>
                Thành tiền
              </Col>
              <Col xxl={1} xs={0}></Col>
            </Row>
          </Col>
        </Row>
        {cart.length === 0 && (
          <Divider className="textTheme">
            Quý khách chưa có sản phẩm nào trong giỏ hàng
          </Divider>
        )}
        {cart.map((item) => (
          <CartItemCard
            viewOnly={false}
            key={`${item.id}`}
            data={item}
            updateQuantity={(data) => updateQuantity.mutate(data)}
            deleteCartItem={(id) => {
              if (user.token !== undefined) {
                return deleteCartItem.mutate({ id, token: user.token });
              } else {
                return message.warning("Đã có lỗi xảy ra vui lòng thử  lại");
              }
            }}
          />
        ))}
        <Row
          gutter={[20, 20]}
          style={{ marginTop: 16 }}
          justify="end"
          align="middle"
        >
          <Col>Đã chọn {orderData.checkedItems.length} sản phẩm </Col>
          <Col>Tổng tiền {orderData.total.toLocaleString()} đ </Col>
          <Col>
            <Button
              disabled={orderData.checkedItems.length === 0}
              type="primary"
              onClick={() => setOpenModal(true)}
            >
              Đặt hàng
            </Button>
          </Col>
        </Row>
      </Col>
      <PreOrderInfo />
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Row>
          <Form
            form={form}
            name="createOrder"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={initFormValue}
            onFinish={(values) => onFinish(values)}
            autoComplete="off"
          >
            <Divider>Địa chỉ nhận hàng</Divider>
            <Form.Item
              label="Tỉnh / Thành phố"
              name="province"
              rules={[
                { required: true, message: "Hãy chọn tỉnh / thành phố!" },
              ]}
            >
              <Select
                placeholder="Chọn tỉnh-thành phố"
                onChange={(value) => {
                  handleChangeProvince(1);
                  setProvince(value);
                }}
                options={provinceList.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Quận / Huyện"
              name="district"
              rules={[{ required: true, message: "Hãy chọn quận / huyện!" }]}
            >
              <Select
                placeholder="Chọn Quận-huyện"
                onChange={(value) => {
                  handleChangeProvince(2);
                  setDistrict(value);
                }}
                options={provinceList
                  .find((item) => item.name === province)
                  ?.districts.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
              />
            </Form.Item>

            <Form.Item
              label="Phường / Xã"
              name="ward"
              rules={[{ required: true, message: "Hãy chọn phường / xã!" }]}
            >
              <Select
                placeholder="Chọn phường-xã"
                onChange={(value) => {
                  setDistrict(value);
                }}
                options={provinceList
                  .find((item) => item.name === province)
                  ?.districts.find((item) => item.name === district)
                  ?.wards.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
              />
            </Form.Item>
            <Form.Item
              label="Nhập địa chỉ cụ thể (số nhà, xóm, đội, ấp ...v..v..)"
              name="specificAddress"
              rules={[
                {
                  required: true,
                  message: "Hãy ghi địa chỉ cụ thể nhận hàng của bạn!",
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ cụ thể (số nhà, xóm, đội, ấp ...v..v..)" />
            </Form.Item>

            <Divider>Thông tin người nhận</Divider>
            <Form.Item
              label="Tên người nhận"
              name="receiver"
              rules={[
                {
                  required: true,
                  message: "Hãy điền tên người nhận hàng!",
                },
              ]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
            <Form.Item
              label="Email (nhận thông tin đơn hàng)"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Hãy điền email!",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Email nhận thông tin đơn hàng" />
            </Form.Item>
            <Form.Item
              label="Phương thức thanh toán & Nhận hàng"
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn phương thức thanh toán!",
                },
              ]}
            >
              <Select
                options={PaymentMethodOptions}
                placeholder="Chọn phương thức thanh toán"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại người nhận"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số điện thoại nhận hàng!",
                },
                {
                  validator: (_, value) => {
                    if (REGEX.PHONE.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Số điện thoại không hợp lệ");
                  },
                },
              ]}
            >
              <Input placeholder="Số điện thoại nhận hàng" />
            </Form.Item>

            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea placeholder="Ghi chú" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Đặt hàng
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Modal>
    </Row>
  );
}

function PreOrderInfo() {
  return (
    <Col xxl={16} xs={24}>
      <Space direction="vertical">
        <Text style={{ color: "white" }}> Về đặt hàng và đơn hàng:</Text>
        <Text keyboard type="warning" style={{ width: "100%" }}>
          Với phương thức thanh toán là: COD - quý khách vui lòng đặt hàng và
          chờ xác nhận
        </Text>
        <Text keyboard type="warning" style={{ width: "100%" }}>
          Với phương thức thanh toán là: Online/Banking - quý khách vui lòng đặt
          hàng và tiến hành thanh toán
        </Text>
        <Text keyboard type="success" style={{ width: "100%" }}>
          Freeship Nội thành Hà Nội với đơn hàng trên 1 triệu
        </Text>
        <Text keyboard type="success" style={{ width: "100%" }}>
          Cảm ơn quý khách !
        </Text>
      </Space>
    </Col>
  );
}
