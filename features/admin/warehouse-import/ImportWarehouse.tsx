import { useLoading, useUser } from "@/hooks";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";
import "react-quill/dist/quill.snow.css";

import { STATUS_CODE } from "@/const/app-const";
import { useMutation, useQueryClient } from "react-query";

import { WarehouseImport } from "@prisma/client";
import { ProductWithClassifyProps } from "@/contexts/CartContext";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CreateWarehouseImportApi } from "@/pages/api/warehouse.api";
interface Props {
  setProduct: Dispatch<SetStateAction<ProductWithClassifyProps | undefined>>;
  product: ProductWithClassifyProps | undefined;
}
export function ImportWarehouse({ product, setProduct }: Props): JSX.Element {
  const { token } = useUser();
  const data = useMemo(() => product, [product]);
  const [form] = Form.useForm();
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const [classifyImg, setClassifyImg] = useState<string | undefined>(undefined);
  const createProduct = useMutation(
    "createWarehouseImport",
    (data: WarehouseImport) => CreateWarehouseImportApi(data, token),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.CREATED) {
          message.success("Tạo đơn nhập sản phẩm thành công");
          setProduct(undefined);
          form.resetFields();
          queryClient.invalidateQueries("wareHouseBills");
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Đã có lỗi xảy ra");
      },
    }
  );

  return (
    <Row justify="center">
      {data === undefined ? (
        <Divider className="textTheme">Chọn sản phẩm để thêm</Divider>
      ) : (
        <Col xxl={24}>
          <Divider className="textTheme">
            Chọn phân loại và nhập thông tin
          </Divider>
          <p style={{ width: "100%" }} className="textTheme">
            {data.name}
          </p>
          <img src={data.images[0]} alt="anh san pham" width={80} height={80} />
          <Form
            form={form}
            name="new-bill"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={(values) =>
              createProduct.mutate({ ...values, productId: product?.id })
            }
            autoComplete="off"
          >
            <Form.Item
              name="classificationId"
              label={<label className="textTheme">Phân loại sản phẩm</label>}
              rules={[
                {
                  required: true,
                  message: "Vui chọn  phân loại!",
                },
              ]}
            >
              <Select
                placeholder="Chọn phân loại"
                onChange={(value) =>
                  setClassifyImg(
                    data.classifications.find((cls) => cls.id === value)?.image
                  )
                }
                options={data.classifications.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            {classifyImg !== undefined && (
              <img
                src={classifyImg}
                alt="anh san pham"
                width={80}
                height={80}
              />
            )}

            <Form.Item
              name="quantity"
              label={<label className="textTheme">Số lượng nhập</label>}
              rules={[{ required: true, message: "Số lượng nhập đâu" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Số lượng nhập thêm"
              />
            </Form.Item>
            <Form.Item
              name="importPrice"
              label={
                <label className="textTheme">
                  Giá nhập (đã bao gồm tất cả chi phí nhập)
                </label>
              }
              rules={[{ required: true, message: "Giá nhập / 1 đâu ?" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Giá nhập cho 1 đơn vị"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>

            <Form.Item
              name="note"
              label={<label className="textTheme">Ghi chú</label>}
            >
              <Input.TextArea placeholder="Ghi chú" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Nhập hàng
              </Button>
            </Form.Item>
          </Form>
        </Col>
      )}
    </Row>
  );
}
