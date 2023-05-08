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
        <link rel="icon" href="/favicon.svg" style={{ fontSize: "4rem" }} />
      </Head>
      <main>
        {/* banner and effect, regis form */}
        <div style={{ width: "100%", position: "relative" }}>
          <img
            src="/banner.jpeg"
            alt="Mini PC-Shop Nghiện nhưng không dở"
            width="100%"
          />
        </div>

        <Row
          style={{ padding: "0.5rem" }}
          justify="center"
          className="roundedBox"
          gutter={[16, 0]}
        >
          <Col xxl={8} xs={20}>
            <Input
              onChange={(e) => handleFilterChange("name", e.target.value)}
              placeholder="Nhập tên sản phẩm hoặc từ khoá để tìm kiếm"
            />
          </Col>
          <Col xxl={3} xs={4}>
            <Button onClick={() => onSearch("name")} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>

        <Row style={{ padding: "0.5rem" }} gutter={[16, 16]}>
          {productsResult?.dataTable !== undefined &&
            productsResult?.dataTable.map((item) => (
              <Col key={`product so ${item.id}`} xxl={6}>
                <Link
                  href={`/${PATH.PRODUCT}/${removeMark(item.name)}&pid=${
                    item.id
                  }`}
                >
                  <ProductCard {...item} />
                </Link>
              </Col>
            ))}
        </Row>

        <Row style={{ padding: "0.5rem" }} justify="center">
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
      </main>
    </>
  );
}

export default Home;
