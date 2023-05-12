import { CardLoading, ProductCard, RichTextEditor } from "@/components";
import {
  STATUS_CODE,
  productCategoryOptions,
  productStatusOptions,
} from "@/const/app-const";
import { ProductWithClassifyProps } from "@/contexts/CartContext";
import { useLoading } from "@/hooks";
import {
  CreateClassifyProductApi,
  EditClassifyProductApi,
  EditProductApi,
  SearchProductApi,
  SearchProductParamsProps,
} from "@/pages/api/product.api";
import { Classification, Product } from "@prisma/client";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Tabs,
  message,
} from "antd";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function ProductList() {
  const [filter, setFilter] = useState<SearchProductParamsProps>({
    pageSize: 6,
  });
  const [params, setParams] = useState<string>("page=1&pageSize=9");

  const getProducts = useQuery(["searchProduct", params], () =>
    SearchProductApi(params)
  );

  const productsResult = useMemo(
    () => getProducts.data?.data,
    [getProducts.data?.data]
  );

  //handle filter change
  function handleFilterChange(
    name: keyof SearchProductParamsProps,
    value: string | number
  ) {
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  function onSearch(type: "name" | "newPage", newPage?: number) {
    let cloneFilter = { ...filter };

    if (type === "name") {
      cloneFilter.page = 1;
    } else if (type === "newPage") {
      cloneFilter.page = newPage ?? 1;
    }
    const searchParamsString = queryString.stringify(cloneFilter);
    return setParams(searchParamsString);
  }

  const [product, setProduct] = useState<ProductWithClassifyProps | undefined>(
    undefined
  );
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <Row style={{ minHeight: "80vh" }} gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="center" className="roundedBox" gutter={[16, 0]}>
          <Col span={16}>
            <Input
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Nhập tên sản phẩm hoặc từ khoá để tìm kiếm"
            />
          </Col>
          <Col span={4}>
            <Button onClick={() => onSearch("name")} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {getProducts.isLoading && (
          <Row gutter={[16, 16]}>
            <Col xxl={12}>
              <CardLoading />
            </Col>
            <Col xxl={12}>
              <CardLoading />
            </Col>
            <Col xxl={12}>
              <CardLoading />
            </Col>
            <Col xxl={12}>
              <CardLoading />
            </Col>
          </Row>
        )}
        <Row gutter={[16, 16]}>
          {productsResult?.dataTable !== undefined &&
            productsResult?.dataTable.map((item) => (
              <Col
                onClick={() => {
                  setOpenEditModal(true);
                  setProduct(item);
                }}
                key={`product so ${item.id}`}
                xxl={12}
              >
                <ProductCard {...item} />
              </Col>
            ))}
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center">
          <Pagination
            className="roundedBox"
            style={{ background: "#fff" }}
            pageSize={filter.pageSize}
            showQuickJumper={
              productsResult?.totalCount !== undefined &&
              productsResult?.totalCount > 100
            }
            defaultCurrent={1}
            total={productsResult?.totalCount}
            onChange={(page) => onSearch("newPage", page)}
          />
        </Row>
      </Col>

      <Modal
        onCancel={() => setOpenEditModal(false)}
        open={openEditModal}
        title={null}
        footer={null}
      >
        <Divider className="textTheme">{product?.name}</Divider>
        <Tabs
          items={[
            {
              key: "product",
              label: "Sửa thông tin sản phẩm",
              children: (
                <EditProduct
                  setProduct={setProduct}
                  product={product}
                  setOpenEditModal={setOpenEditModal}
                />
              ),
            },
            {
              key: "classfy",
              label: "Sửa thông tin phân loại",
              children: (
                <EditClassifies
                  productId={product?.id}
                  setOpenEditModal={setOpenEditModal}
                  classifies={product?.classifications ?? []}
                  setProduct={setProduct}
                />
              ),
            },
          ]}
        ></Tabs>
      </Modal>
    </Row>
  );
}

interface EditProductProps {
  product: Product | undefined;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductWithClassifyProps | undefined>
  >;
}
function EditProduct({
  product,
  setOpenEditModal,
  setProduct,
}: EditProductProps) {
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  useEffect(() => {
    if (product !== undefined) {
      return form.setFieldsValue({ ...product });
    } else {
      return form.resetFields();
    }
  }, [product]);
  const editProduct = useMutation(
    "createProduct",
    (data: Product) => EditProductApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Cập nhật thành công");
          queryClient.invalidateQueries("searchProduct");
          setOpenEditModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
        setProduct(undefined);
      },
      onError: () => {
        setIsLoading(false);
        setProduct(undefined);
        message.error("Lỗi server");
      },
    }
  );
  return (
    <Row>
      {product === undefined ? (
        <>Không lấy được thông tin</>
      ) : (
        <Form
          form={form}
          name="editProduct"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ ...product }}
          onFinish={(values) =>
            editProduct.mutate({ ...values, id: product.id })
          }
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label={<label className="textTheme">Tên sản phẩm</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng điền!",
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
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
          <Form.Item
            name="category"
            label={<label className="textTheme">Danh mục sản phẩm</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục!",
              },
            ]}
          >
            <Select
              placeholder="danh mục sản phẩm"
              allowClear
              options={productCategoryOptions}
            />
          </Form.Item>
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
            <Input.TextArea
              allowClear
              style={{ width: "100%" }}
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
            <RichTextEditor />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Cập nhật sản phẩm
            </Button>
          </Form.Item>
        </Form>
      )}
    </Row>
  );
}
interface EditClassifiesProps {
  classifies: Classification[];
  productId: string | undefined;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductWithClassifyProps | undefined>
  >;
}
function EditClassifies({
  classifies,
  setOpenEditModal,
  productId,
  setProduct,
}: EditClassifiesProps) {
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const editClassifyProduct = useMutation(
    "editClassifyProduct",
    (data: Classification) => EditClassifyProductApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Cập nhật thành công");
          queryClient.invalidateQueries("searchProduct");
          setOpenEditModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
        setProduct(undefined);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
        setProduct(undefined);
      },
    }
  );
  const createClassifyProduct = useMutation(
    "editClassifyProduct",
    (data: Classification) => CreateClassifyProductApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.CREATED) {
          message.success("Thêm phân loại thành công");
          queryClient.invalidateQueries("searchProduct");
          setOpenEditModal(false);
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
    <Row gutter={[0, 24]}>
      {classifies.map((item) => (
        <EditClassify
          key={`eidt jadj ${item.id} ${productId}`}
          classify={item}
          productId={productId}
          setOpenEditModal={setOpenEditModal}
          setProduct={setProduct}
        />
      ))}
      <Divider>Thêm mới</Divider>
      <Col className="roundedBox boxShadow" span={24}>
        <Form
          name={`new class `}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => {
            if (productId !== undefined) {
              createClassifyProduct.mutate({ ...values, productId: productId });
            } else {
              message.info("Vui lòng thử đăng nhập lại và thực hiện lại");
            }
          }}
          autoComplete="off"
        >
          <Form.Item
            name={"image"}
            label="Link ảnh"
            rules={[{ required: true, message: "Link ảnh đâu ?" }]}
          >
            <Input.TextArea style={{ width: "100%" }} placeholder="Link ảnh" />
          </Form.Item>
          <Form.Item
            name={"name"}
            label="Tên phân loại"
            rules={[{ required: true, message: "Tên phân loại đâu ?" }]}
          >
            <Input style={{ width: "100%" }} placeholder="Tên phân loại" />
          </Form.Item>
          <Form.Item
            name={"price"}
            label="Giá phân loại"
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
          <Form.Item
            name={"warranty"}
            label="Thời gian bảo hành"
            rules={[{ required: true, message: "Thời gian bảo hành đâu" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Số ngày bảo hành"
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

interface EditClassifyProps {
  classify: Classification;
  productId: string | undefined;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductWithClassifyProps | undefined>
  >;
}
function EditClassify({
  classify,
  setOpenEditModal,
  productId,
  setProduct,
}: EditClassifyProps) {
  const { setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  useEffect(() => form.setFieldsValue({ ...classify }), [classify]);
  const editClassifyProduct = useMutation(
    "editClassifyProduct",
    (data: Classification) => EditClassifyProductApi(data),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Cập nhật thành công");
          queryClient.invalidateQueries("searchProduct");
          setOpenEditModal(false);
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
        setProduct(undefined);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Đã có lỗi xảy ra");
        setProduct(undefined);
      },
    }
  );

  return (
    <Col
      className="roundedBox boxShadow"
      key={`classify ${productId} ${classify.id}`}
      span={24}
    >
      <Form
        form={form}
        name={`edit ${classify.id}`}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={(values) =>
          editClassifyProduct.mutate({ ...values, id: classify.id })
        }
        autoComplete="off"
      >
        <Form.Item
          name={"image"}
          label="Link ảnh"
          rules={[{ required: true, message: "Link ảnh đâu ?" }]}
        >
          <Input.TextArea style={{ width: "100%" }} placeholder="Link ảnh" />
        </Form.Item>
        <img alt="vuo nhe" src={classify.image} width={120} height={120} />
        <Form.Item
          name={"name"}
          label="Tên phân loại"
          rules={[{ required: true, message: "Tên phân loại đâu ?" }]}
        >
          <Input style={{ width: "100%" }} placeholder="Tên phân loại" />
        </Form.Item>
        <Form.Item
          name={"price"}
          label="Giá phân loại"
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
        <Form.Item
          name={"warranty"}
          label="Thời gian bảo hành"
          rules={[{ required: true, message: "Thời gian bảo hành đâu" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Số ngày bảo hành"
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            Cập nhật phân loại
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
