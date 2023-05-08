import { Col, Divider, Radio, Rate, Row } from "antd";
import React from "react";
import { GetPostByIdApi } from "../api/post.api";
import { BreadCrumb } from "@/components";
import { CrumbProps } from "@/components/breadCrumb/BreadCrumb";
import NumberInput from "@/components/ipNumber/ipNumber";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CarouselImg } from "@/components/carousel/carouselImg";

const data = {
  id: "64579a915b9318aaed03789e",
  createdAt: "2023-05-07T12:33:19.640Z",
  updatedAt: "2023-05-07T12:33:19.640Z",
  status: "Mới",
  name: "Banana chuoi ne",
  images: [
    "https://picsum.photos/id/10/200",
    "https://picsum.photos/id/11/200",
  ],
  description: "Chuối ngon lắm",
  classifications: [
    {
      id: "64579a925b9318aaed03789f",
      name: "Vàng",
      image: "https://picsum.photos/id/12/200",
      price: 90000,
      quantity: 2,
      productId: "64579a915b9318aaed03789e",
    },
    {
      id: "64579a925b9318aaed03789g",
      name: "Xanh",
      image: "https://picsum.photos/id/13/200",
      price: 100000,
      quantity: 3,
      productId: "64579a915b9318aaed03789e",
    },
    {
      id: "64579a925b9318aaed03789h",
      name: "Xanh Chín chát ngoắt",
      image: "https://picsum.photos/id/14/200",
      price: 130000,
      quantity: 4,
      productId: "64579a915b9318aaed03789e",
    },
  ],
};

export default function ProductDetails() {
  const breads: CrumbProps[] = [
    {
      label: "Sản phẩm",
      link: `/`,
    },
    {
      label: data.name,
    },
  ];
  const sort = data.classifications.sort((a, b) => a.price - b.price);
  const min = sort[0].price.toLocaleString();
  const max = sort[sort.length - 1].price.toLocaleString();
  let sum = 0;
  for (let i = 0; i < data.classifications.length; i++) {
    sum += data.classifications[i].quantity;
  }
  let arrImg = data.images;
  for (let i = 0; i < data.classifications.length; i++) {
    arrImg.push(data.classifications[i].image);
  }

  return (
    <>
      <BreadCrumb list={breads} />
      <Row>
        <Col span={8} style={{ padding: "30px 30px 0 30px" }}>
          <Row justify="center">
            <Col span={24}>
              <img
                src={data.images[0]}
                alt="ngoc"
                width="100%"
                height="400px"
              />
            </Col>
            <Col span={24} style={{ padding: "6px 20px" }}>
              <Row gutter={[10, 0]}>
                <CarouselImg>
                  {arrImg.map((item, i) => (
                    <Col key={i}>
                      <img
                        src={item}
                        alt="sanpham"
                        width="100%"
                        height="80px"
                      />
                    </Col>
                  ))}
                </CarouselImg>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={16} style={{ padding: "30px 30px 0 30px" }}>
          <Row gutter={[0, 14]}>
            <Col span={24}>
              <p
                style={{
                  fontSize: "1.4rem",
                  lineHeight: "1.6rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {data.name}
              </p>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 0]}>
                <Col
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
                </Col>
                <Col
                  style={{
                    borderRight: "1px solid #595959",
                    lineHeight: "1.5rem",
                  }}
                >
                  <p>0&nbsp; Đã bán</p>
                </Col>
                <Col style={{ lineHeight: "1.5rem" }}>
                  <p>Tình trạng: {data.status}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: "#bfbfbf" }} />
          <Row style={{ padding: "0 20px", marginBottom: "30px" }}>
            <Col
              style={{
                backgroundColor: "#fafafa",
                padding: "6px 20px",
                borderRadius: "8px",
              }}
            >
              <p
                style={{ fontSize: "1.875rem", color: "red" }}
              >{`${min}đ - ${max}đ`}</p>
            </Col>
          </Row>
          <Row
            style={{ padding: "0 20px", marginBottom: "30px" }}
            gutter={[0, 10]}
          >
            <Col span={24}>
              <p>Phân loại:</p>
            </Col>
            <Col span={24}>
              <Radio.Group buttonStyle="solid">
                {data.classifications.map((item, i) => (
                  <Radio.Button
                    id="buttonPhanLoai"
                    style={{ margin: "0 10px 0 0", borderRadius: 0 }}
                    value={i}
                    key={i}
                  >
                    {item.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Col>
          </Row>
          <Row
            style={{ padding: "0 20px", marginBottom: "30px" }}
            gutter={[0, 10]}
            align="middle"
          >
            <Col span={24}>
              <p>Số lượng:</p>
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <NumberInput value={1} max={sum} />
              <p>&nbsp;&nbsp;&nbsp;{sum}&nbsp;sản phẩm có sẵn</p>
            </Col>
          </Row>
          <Row
            style={{ padding: "0 20px", marginBottom: "30px" }}
            gutter={[20, 0]}
            align="middle"
          >
            <Col>
              <button className="buttonAddCart">
                <ShoppingCartOutlined />
                &nbsp;Thêm Vào Giỏ Hàng
              </button>
            </Col>
            <Col>
              <button className="buttonBuy">Mua Ngay</button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} style={{ padding: "0 30px 0 30px" }}>
          <p
            style={{
              fontSize: "1.4rem",
              lineHeight: "1.6rem",
              fontWeight: 500,
              marginBottom: "20px",
            }}
          >
            CHI TIẾT SẢN PHẨM
          </p>
          <p>{data.description}</p>
        </Col>
        <Col span={24} style={{ padding: "30px 30px 0 30px" }}>
          <p
            style={{
              fontSize: "1.4rem",
              lineHeight: "1.6rem",
              fontWeight: 500,
              marginBottom: "20px",
            }}
          >
            CHI TIẾT SẢN PHẨM
          </p>
          <p>{data.description}</p>
        </Col>
        <Col span={24} style={{ padding: "0 30px 0 30px" }}>
          <p
            style={{
              fontSize: "1.4rem",
              lineHeight: "1.6rem",
              fontWeight: 500,
              marginBottom: "20px",
            }}
          >
            SẢN PHẨM LIÊN QUAN
          </p>
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const id = context.params.slug[0].split("&pid")[1] as string;

    const result = await GetPostByIdApi(id ?? "");
    if (result.data !== null) {
      return {
        props: {
          data: result.data,
        },
      };
    } else {
      return {
        props: {
          data: {},
        },
      };
    }
  } catch (error) {
    return {
      props: {
        data: {},
      },
    };
  }
}
