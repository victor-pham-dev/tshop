import Head from "next/head";
// import { Inter } from "next/font/google";
import { Button, Col, Input, Pagination, Row } from "antd";
import { useMemo, useState } from "react";
import queryString from "query-string";
import { SearchProductApi, SearchProductParamsProps } from "./api/product.api";
import { useQuery } from "react-query";
import Link from "next/link";
import { PATH } from "@/const/app-const";
import { removeMark } from "@/ultis/dataConvert";
import { Background, CardLoading, Messenger, ProductCard } from "@/components";

// const inter = Inter({ subsets: ["latin"] });

function Home() {
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

  return (
    <>
      <Head>
        <title>Mix tech - Tối giản tạo nên sự khác biệt</title>
        <meta name="description" content="Mix tech - ITX PC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Messenger />
        <Background />
        <Row>
          <Col span={24}>
            <Row justify="center" gutter={[8, 8]}>
              <Col span={6}>
                <img width={"100%"} src="/bn4.png" alt="mix tech" />
              </Col>

              <Col span={6}>
                <img width={"100%"} src="/bn6.png" alt="mix tech" />
              </Col>
              <Col span={6}>
                <img width={"100%"} src="/bn7.png" alt="mix tech" />
              </Col>
              <Col span={6}>
                <img width={"100%"} src="/bn5.png" alt="mix tech" />
              </Col>
              <Col xxl={0} xs={6}>
                <img width={"100%"} src="/bn8.png" alt="mix tech" />
              </Col>
              <Col xxl={0} xs={6}>
                <img width={"100%"} src="/bn1.png" alt="mix tech" />
              </Col>
              <Col xxl={0} xs={6}>
                <img width={"100%"} src="/bn2.png" alt="mix tech" />
              </Col>

              <Col xxl={0} xs={6}>
                <img width={"100%"} src="/bn3.png" alt="mix tech" />
              </Col>
            </Row>
            {/* <img
              src="/banner.jpg"
              alt="Mini PC-Shop Nghiện nhưng không dở"
              width="100%"
              height="360px"
            /> */}
            {/* <p>Chỗ này dành cho banner nè</p> */}
          </Col>
        </Row>
        <Row style={{ padding: "1rem" }} justify="center">
          <Col
            xs={24}
            lg={14}
            xxl={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Nhập tên sản phẩm hoặc từ khoá để tìm kiếm"
              style={{ marginRight: "0.5rem" }}
            />
            <Button onClick={() => onSearch("name")} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col xxl={16} xs={24}>
            {getProducts.isLoading && (
              <Row style={{ padding: "0.5rem" }} gutter={[16, 16]}>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
                <Col xs={12} xxl={6}>
                  <CardLoading />
                </Col>
              </Row>
            )}

            <Row style={{ padding: "0.5rem" }} gutter={[16, 16]}>
              {productsResult?.dataTable !== undefined &&
                productsResult?.dataTable.map((item) => (
                  <Col
                    key={`product so ${item.id}`}
                    sm={8}
                    md={6}
                    xs={12}
                    xxl={6}
                  >
                    <Link
                      href={`/${PATH.PRODUCT}/${removeMark(item.name)}?pid=${
                        item.id
                      }`}
                    >
                      <ProductCard {...item} />
                    </Link>
                  </Col>
                ))}
            </Row>

            <Row
              className="boxShadow"
              style={{ padding: "1rem", borderRadius: "0.5rem" }}
              justify="center"
            >
              <Pagination
                style={{
                  background: "#fff",
                  padding: "6px 0",
                  borderRadius: "8px",
                }}
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
        </Row>
      </main>
    </>
  );
}

export default Home;
