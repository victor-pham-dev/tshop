import {
  Button,
  Col,
  Divider,
  Modal,
  Radio,
  Result,
  Row,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";
import { Background, CarouselProduct, ProductCard } from "@/components";
import NumberInput from "@/components/ipNumber/ipNumber";
import { ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";
import { Classification } from "@prisma/client";
import { useMutation } from "react-query";
import { useLoading, useUser } from "@/hooks";
import Link from "next/link";
import { METHOD, PATH, STATUS_CODE } from "@/const/app-const";
import { AddCartDataProps, AddCartItemApi } from "../api/cart.api";
import { useCart } from "@/hooks/useAppContext";
import Head from "next/head";
import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { ProductWithClassifyProps } from "@/contexts/CartContext";
import { removeMark } from "@/ultis/dataConvert";

const { Text } = Typography;

interface Props {
  productData: ProductWithClassifyProps | null;
  relatedList: ProductWithClassifyProps[];
}
export default function ProductDetails({ productData, relatedList }: Props) {
  const { setIsLoading } = useLoading();
  const { add } = useCart();
  const { user } = useUser();

  if (productData === null) {
    return (
      <Divider style={{ color: "white" }}>
        Lấy thông tin sản phẩm thất bại{" "}
      </Divider>
    );
  }
  let initPrice: string = "";
  const sort = productData?.classifications?.sort((a, b) => a.price - b.price);
  if (sort?.length > 1) {
    if (sort[0]?.price === sort[sort.length - 1]?.price) {
      initPrice = `${sort[0].price.toLocaleString()} đ`;
    } else {
      initPrice = `${sort[0]?.price.toLocaleString()}-${sort[
        sort.length - 1
      ]?.price.toLocaleString()}  đ`;
    }
  } else {
    initPrice = `${sort[0].price.toLocaleString()} đ`;
  }

  let arrImg: string[] = [];
  arrImg.push(...productData.images);
  productData.classifications.forEach((item) => {
    arrImg.push(item.image);
  });

  const [price, setPrice] = useState<string>(initPrice);
  const [ableQuantity, setAbleQuantity] = useState<number | undefined>(
    undefined
  );
  const [selectedItem, setSelectedItem] = useState<Classification | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState(false);

  function handleClickClassify(index: number) {
    const navIndex = (productData?.images.length ?? 0) + index;
    const navDiv = document.getElementById(`navSlide ${navIndex}`);
    navDiv?.click();
    const classifi = productData?.classifications[index];
    setPrice(`${classifi?.price.toLocaleString()} đ`);
    setAbleQuantity(classifi?.quantity ?? 0);
    setSelectedItem(classifi);
  }

  const addCart = useMutation(
    "addcart",
    (data: AddCartDataProps) => AddCartItemApi(data, user.token ?? ""),
    {
      onMutate: () => setIsLoading(true),
      onSuccess: (result, payload) => {
        if (result.code === STATUS_CODE.CREATED) {
          setOpenModal(true);
          setIsLoading(false);
          if (result.data !== null && productData !== null) {
            add({ ...payload, id: result?.data, Product: productData });
          }
        } else {
          message.error("Đã có lỗi xảy ra!");
          setIsLoading(false);
        }
      },
      onError: () => {
        message.error("Đã có lỗi xảy ra!");
        setIsLoading(false);
      },
    }
  );

  function handleAddCart() {
    const inputQuantity = document.getElementById(
      "cart-input-number"
    ) as HTMLInputElement;
    if (selectedItem === undefined) {
      return message.info("Vui lòng chọn phân loại!");
    }
    if (user.id === undefined) {
      return message.info("Quý khách vui lòng đăng nhập để mua hàng");
    }

    if (productData !== null && user.id !== undefined) {
      const payload: AddCartDataProps = {
        classificationId: selectedItem.id,
        image: selectedItem.image,
        productId: productData.id,
        quantity: Number(inputQuantity.value),
        userId: user.id,
      };
      return addCart.mutate(payload);
    }
  }

  return (
    <>
      <Head>
        <title>{`${productData.name} - ${initPrice} - ITX Gear`}</title>
        <meta
          name="description"
          content={`${productData.name}-${initPrice}}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={productData.images[0]} />
        <meta name="keywords" content={productData.name} />
        <meta name="author" content="ITX Gear" />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content={`${productData.name} - ${initPrice} - ITX Gear`}
        />
        <meta
          property="og:description"
          content={`${productData.name} - ${initPrice} - ITX Gear`}
        />
        <meta property="og:image" content={productData.images[0]} />
        <meta
          property="og:url"
          content={`https://itxgear.com/san-pham/${removeMark(
            productData.name
          )}pid=${productData.id}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        {productData !== null && (
          <React.Fragment>
            <Background />
            <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
              <Col xxl={19} style={{ padding: "1rem" }}>
                <Row justify={"center"} gutter={[16, 6]}>
                  <Col xxl={{ span: 12 }} xs={{ span: 24 }} xl={12}>
                    <CarouselProduct images={arrImg} />
                  </Col>
                  <Col
                    style={{
                      background: "#dbdbdb",
                      borderRadius: "0.5rem",
                    }}
                    xxl={{ span: 12 }}
                    xl={11}
                    xs={{ span: 23 }}
                  >
                    <Row style={{ padding: "1rem" }} gutter={[0, 8]}>
                      <Col span={24}>
                        <p
                          style={{
                            fontSize: "1.4rem",
                            lineHeight: "1.6rem",
                            marginTop: "1.5rem",
                            fontWeight: 500,
                            textTransform: "capitalize",
                            color: "black",
                          }}
                        >
                          {productData?.name}
                        </p>
                      </Col>
                      <Col span={24}>
                        <Row gutter={[16, 0]}>
                          {/* <Col
                            style={{
                              borderRight: "1px solid #595959",
                              lineHeight: "1.5rem",
                            }}
                          >
                            <Rate
                              allowHalf
                              defaultValue={4.5}
                              disabled
                              style={{ fontSize: "14px" }}
                            />
                          </Col> */}
                          {/* <Col
                            style={{
                              borderRight: "1px solid #595959",
                              lineHeight: "1.5rem",
                            }}
                          >
                            <p style={{ color: "black" }}>
                              Lượt xem: {productData?.view}
                            </p>
                          </Col> */}
                          <Col style={{ lineHeight: "1.5rem" }}>
                            <p style={{ color: "black" }}>
                              Tình trạng: {productData?.status}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Divider style={{ backgroundColor: "#bfbfbf" }} />
                        <Row
                        // style={{ padding: "0 20px", marginBottom: "30px" }}
                        >
                          <Col
                            style={{
                              backgroundColor: "#fafafa",
                              padding: "6px 20px",
                              borderRadius: "8px",
                            }}
                          >
                            <p style={{ fontSize: "1.875rem", color: "red" }}>
                              {price}
                            </p>
                          </Col>
                        </Row>
                        <Row
                          style={{ padding: "0 20px", marginBottom: "30px" }}
                          gutter={[0, 10]}
                        >
                          <Col span={24}>
                            <p className="textTheme">Phân loại:</p>
                          </Col>
                          <Col span={24}>
                            <Radio.Group buttonStyle="solid">
                              <Row gutter={[12, 12]}>
                                {productData?.classifications.map((item, i) => (
                                  <Col key={`option ${item.id} ${i}`}>
                                    <Radio.Button
                                      className="boxShadow"
                                      id="buttonPhanLoai"
                                      style={{ borderRadius: 4 }}
                                      value={i}
                                      onClick={() => handleClickClassify(i)}
                                    >
                                      {item.name}
                                    </Radio.Button>
                                  </Col>
                                ))}
                              </Row>
                            </Radio.Group>
                          </Col>
                        </Row>
                        <Row
                          style={{ padding: "0 20px", marginBottom: "30px" }}
                          gutter={[0, 10]}
                          align="middle"
                        >
                          <Col span={24}>
                            <p className="textTheme">Số lượng:</p>
                          </Col>
                          <Col
                            span={24}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <NumberInput
                              disabled={
                                ableQuantity === undefined || ableQuantity === 0
                              }
                              value={1}
                              max={ableQuantity ?? 0}
                            />
                            {ableQuantity !== undefined && (
                              <p className="textTheme">
                                &nbsp;&nbsp;&nbsp;{ableQuantity}&nbsp;sản phẩm
                                có sẵn
                              </p>
                            )}
                          </Col>
                        </Row>
                        <Row
                          style={{ padding: "0 20px", marginBottom: "30px" }}
                          gutter={[20, 0]}
                          align="middle"
                        >
                          <Col>
                            {user.id === undefined ? (
                              <Link href={`/${PATH.LOGIN}`}>
                                Đăng nhập để mua hàng
                              </Link>
                            ) : user.id !== undefined &&
                              selectedItem !== undefined &&
                              selectedItem?.quantity <= 0 ? (
                              <Text type="danger">Phân loại tạm hết hàng</Text>
                            ) : (
                              <button
                                disabled={
                                  selectedItem !== undefined &&
                                  selectedItem?.quantity <= 0
                                }
                                className="buttonAddCart"
                                onClick={handleAddCart}
                              >
                                <ShoppingCartOutlined />
                                &nbsp;Thêm Vào Giỏ Hàng
                              </button>
                            )}
                          </Col>

                          <Divider></Divider>
                          <Text type="danger" keyboard>
                            🚚 Freeship nội thành Hà Nội, các tỉnh khác áp dụng
                            với đơn trên 1tr
                          </Text>

                          <Text type="success">
                            - Với phương thức COD, quý khách có thể đồng kiểm
                            trước khi nhận hàng.
                          </Text>
                          <Text type="success">
                            - Nếu có thắc mắc vui lòng liên hệ qua messenger để
                            được tư vấn.
                          </Text>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="roundedBox boxShadow"
                  style={{
                    background: "#bdbdbd",
                    padding: "1rem",

                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Divider className="textTheme" orientation="left">
                    Thông tin sản phẩm
                  </Divider>
                  <Row
                    className="product-description"
                    style={{ color: "#000" }}
                    dangerouslySetInnerHTML={{
                      __html: productData?.description,
                    }}
                  />
                </Row>
              </Col>
              <Col xxl={5} xs={24}>
                <Row gutter={[12, 16]} justify="center">
                  <Divider style={{ color: "white" }}>
                    Có thể bạn quan tâm
                  </Divider>

                  {relatedList.map((item, i) => (
                    <Col
                      key={`related ${item.id} ${i}`}
                      xxl={22}
                      xs={12}
                      xl={6}
                    >
                      <Link
                        href={`/${PATH.PRODUCT}/${removeMark(item.name)}pid=${
                          item.id
                        }`}
                      >
                        <ProductCard {...item} />
                      </Link>
                    </Col>
                  ))}
                </Row>
                {/* {pid === undefined ? (
                  <ContentLoading />
                ) : (
                  <RelatedProduct list={relatedList} />
                )} */}
              </Col>
            </Row>
          </React.Fragment>
        )}
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
          title={null}
          style={{ maxWidth: 360 }}
        >
          <Result
            title="Đã thêm vào giỏ hàng!"
            icon={<SmileOutlined />}
            extra={[
              <Link href={`/${PATH.CART}`}>
                <Button type="primary">Đến giỏ hàng</Button>
              </Link>,

              <Button onClick={() => setOpenModal(false)}>Tiếp tục mua</Button>,
            ]}
          />
        </Modal>
      </main>
    </>
  );
}

export async function getStaticProps(context: any) {
  const pid = context.params.slug.toString().split("pid=")[1] as string;
  const baseUrl = "https://itxgear.com";
  let productData: ProductWithClassifyProps | null = null;
  let relatedList: ProductWithClassifyProps[] = [];
  try {
    const response = await fetch(`${baseUrl}/api/product/info?id=${pid}`, {
      method: METHOD.GET,
    });

    const result: ResponseProps<ProductWithClassifyProps> =
      await response.json();
    const relatedResponse = await fetch(
      `${baseUrl}/api/product/related?id=${pid}`,
      {
        method: METHOD.GET,
      }
    );

    const relatedResult: ResponseProps<ProductWithClassifyProps[]> =
      await relatedResponse.json();

    if (result && relatedResult) {
      productData = result.data;
      relatedList = relatedResult.data;
    }
  } catch (error) {
    productData = null;
  }
  return {
    props: {
      productData,
      relatedList,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://itxgear.com/api/product/search?page=1&pageSize=1000`,
    {
      method: METHOD.GET,
    }
  );

  const result: ResponseProps<PagingResponseProps<ProductWithClassifyProps>> =
    await response.json();
  const paths = result.data.dataTable.map((product) => {
    return {
      params: {
        slug: [`${removeMark(product.name)}pid=${product.id}`],
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
