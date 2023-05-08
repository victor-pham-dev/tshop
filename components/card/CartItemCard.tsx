import {
  Button,
  Checkbox,
  Col,
  InputNumber,
  Popconfirm,
  Row,
  message,
} from "antd";
import React from "react";
import { CartDataProps } from "@/contexts/CartContext";
import { UpdateCartItemProps } from "@/pages/api/cart.api";
import { useCart } from "@/hooks/useAppContext";
interface Props {
  viewOnly: Boolean;
  data: CartDataProps;
  updateQuantity?: (data: UpdateCartItemProps) => void;
  deleteCartItem?: (id: string) => void;
}
export function CartItemCard({
  data,
  updateQuantity,
  deleteCartItem,
  viewOnly,
}: Props) {
  const classify = data.Product.classifications.find(
    (item) => item.id === data.classificationId
  );
  const { update, markCheck } = useCart();

  function handleQuantityChange(quantity: number) {
    if (classify?.quantity !== undefined) {
      if (quantity > classify.quantity) {
        message.warning(`Số lượng tối đa có thể mua là ${classify.quantity}`);
      } else {
        update(quantity, data.id);
        updateQuantity && updateQuantity({ id: data.id, quantity });
      }
    }
  }

  const disabled = data.quantity > (classify?.quantity ?? 1000);

  return (
    <Row
      className="roundedBox boxShadow textTheme"
      align="middle"
      gutter={[8, 0]}
      style={{ marginTop: 6 }}
    >
      {!viewOnly && (
        <Col xxl={1}>
          <Checkbox
            disabled={disabled}
            checked={data.checked ? true : false}
            onChange={(e) => markCheck(data.id, e.target.checked)}
          />
        </Col>
      )}

      <Col xxl={23}>
        <Row align="middle" style={{ padding: "0.5rem" }} gutter={[8, 0]}>
          <Col xxl={3}>
            <img
              src={data.image}
              alt="image product"
              style={{
                width: "100%",
                maxHeight: 84,
                borderRadius: "0.5rem",
              }}
            />
          </Col>
          <Col xxl={5}>{data.Product?.name}</Col>
          <Col xxl={4}> {classify?.name}</Col>
          <Col xxl={3}> {classify?.price.toLocaleString()} đ</Col>
          <Col xxl={3}>
            {disabled ? (
              <span className="textTheme">Hết hàng</span>
            ) : (
              <InputNumber
                readOnly={viewOnly ? true : false}
                min={1}
                onChange={(value) => handleQuantityChange(value ?? 1)}
                value={data.quantity}
              />
            )}
          </Col>
          <Col xxl={3}>
            {classify?.price &&
              (classify?.price * data.quantity).toLocaleString()}{" "}
            đ
          </Col>
          {!viewOnly && (
            <Col xxl={1}>
              <Popconfirm
                title="Bạn có chắc muốn xoá"
                onConfirm={() => deleteCartItem && deleteCartItem(data.id)}
              >
                <Button type="primary" danger>
                  Xoá
                </Button>
              </Popconfirm>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}
