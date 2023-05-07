import { RichTextEditor } from "@/components/richTexteditor/RichTextEditor";
import { CropImageUploader } from "@/components/upload-files/CropImageUploader";
import { useLoading, useUser } from "@/hooks";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  message,
} from "antd";
import "react-quill/dist/quill.snow.css";
import { CreatePostApi } from "@/pages/api/post.api";
import { checkRes } from "@/network/services/api-handler";
import {
  POST_STATUS,
  POST_TYPE,
  STATUS_CODE,
  classLevelOption,
  productStatusOptions,
} from "@/const/app-const";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateCourseApi,
  EditCourseApi,
  GetCourseByIdApi,
} from "@/pages/api/course.api";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Product } from "@prisma/client";

export function Product(): JSX.Element {
  const [form] = Form.useForm();
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();

  const createProduct = useMutation(
    "createProduct",
    (data: Product) => CreateCourseApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.CREATED) {
          message.success("Đã tạo");
          form.resetFields();
          queryClient.invalidateQueries("getListRegis");
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
      <Divider className="textTheme">Thêm sản phẩm</Divider>
      <Col xxl={24}>
        <Form
          form={form}
          name="newPost"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => createProduct.mutate(values)}
          autoComplete="off"
        >
          <Form.Item
            name="status"
            label={<label className="textTheme">Tình trạng sản phẩm</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tình trạng!",
              },
            ]}
          >
            <Select
              placeholder="Tình trạng sản phẩm"
              allowClear
              options={productStatusOptions}
            />
          </Form.Item>
          <p style={{ width: "100%" }} className="textTheme">
            Phân loại sản phẩm
          </p>
          <Form.List name="classifications">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row align="middle" key={key} gutter={[16, 0]}>
                    <Col span={20}>
                      <p className="textTheme">Phân loại {key + 1}</p>
                      <Form.Item
                        {...restField}
                        name={[name, "image"]}
                        rules={[{ required: true, message: "Link ảnh đâu ?" }]}
                      >
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Link ảnh"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Tên phân loại đâu ?" },
                        ]}
                      >
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Tên phân loại"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        rules={[{ required: true, message: "Giá đâu" }]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder="Giá"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        danger
                        type="primary"
                        onClick={() => remove(name)}
                      >
                        Xoá
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm phân loại
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            label={
              <label className="textTheme">
                List ảnh thêm cho sản phẩm (Phân cách nhau bằng dấu phảy ",")
              </label>
            }
            name="images"
            rules={[
              {
                required: true,
                message: "Vui lòng điền!",
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              min={1}
              placeholder="Link, phân cách bởi dấu , "
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<label className="textTheme">Nôi dung mô tả sản phẩm</label>}
            rules={[
              {
                required: true,
                message: "Nội dung không được để trống!",
              },
              { min: 8, message: "Nội dung không được để trống!" },
            ]}
          >
            <RichTextEditor
              value={form.getFieldValue("description")}
              onChange={(value) => form.setFieldValue("description", value)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Tạo khoá học
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
