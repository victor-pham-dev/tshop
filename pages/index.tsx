import Head from "next/head";
import { Inter } from "next/font/google";
import { Button, Col, Input, Pagination, Row } from "antd";
import { useMemo, useState } from "react";
import queryString from "query-string";
import { SearchProductApi, SearchProductParamsProps } from "./api/product.api";
import { useQuery } from "react-query";
import { ProductCard } from "@/components/card/ProductCard";
import Link from "next/link";
import { PATH } from "@/const/app-const";
import { removeMark } from "@/ultis/dataConvert";
import { CardLoading } from "@/components";

const inter = Inter({ subsets: ["latin"] });

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
        <title>Mini PC - Nghiện nhưng không dở</title>
        <meta name="description" content="Cửa hàng mini PC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Row style={{ position: "relative" }}>
          <Col span={24}>
            <img
              src="/banner.jpg"
              alt="Mini PC-Shop Nghiện nhưng không dở"
              width="100%"
              height="360px"
            />
          </Col>
        </Row>

        <Row style={{ padding: "1rem" }} justify="center">
          <Col
            xs={24}
            lg={14}
            xl={12}
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

        {getProducts.isLoading && (
          <Row style={{ padding: "0.5rem" }} gutter={[16, 16]}>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
            <Col xxl={6}>
              <CardLoading />
            </Col>
          </Row>
        )}

        <Row style={{ padding: "0.5rem" }} gutter={[16, 16]}>
          {productsResult?.dataTable !== undefined &&
            productsResult?.dataTable.map((item) => (
              <Col key={`product so ${item.id}`} xs={12} sm={8} md={6} xl={4}>
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

        <Row style={{ padding: "1rem" }} justify="center">
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
      </main>
    </>
  );
}

export default Home;
