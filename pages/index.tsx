import Head from "next/head";
import { Button, Col, Input, Pagination, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { SearchProductApi, SearchProductParamsProps } from "./api/product.api";
import { useQuery } from "react-query";
import Link from "next/link";
import { METHOD, PATH } from "@/const/app-const";
import { removeMark } from "@/ultis/dataConvert";
import { Background, CardLoading, Messenger, ProductCard } from "@/components";
import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { ProductWithClassifyProps } from "@/contexts/CartContext";

interface HomeProps {
  initProductData: ProductWithClassifyProps[];
  initCount: number;
}
function Home({ initProductData, initCount }: HomeProps) {
  const [enabledQuery, setEnableQuery] = useState(false);
  const [filter, setFilter] = useState<SearchProductParamsProps>({
    pageSize: 12,
  });
  const [params, setParams] = useState<string>("page=1&pageSize=12");

  const getProducts = useQuery(
    ["searchProduct", params],
    () => SearchProductApi(params),
    {
      enabled: enabledQuery,
    }
  );

  useEffect(() => {
    if (enabledQuery) {
      getProducts.refetch();
    }
  }, [enabledQuery]);

  const productsResult = useMemo(() => {
    let list: ProductWithClassifyProps[] = initProductData;
    let totalCount = initCount;
    if (enabledQuery) {
      list = getProducts.data?.data?.dataTable ?? [];
      totalCount = getProducts.data?.data?.totalCount ?? 0;
    }

    return { list, totalCount };
  }, [getProducts.data?.data]);

  //handle filter change
  function handleFilterChange(
    name: keyof SearchProductParamsProps,
    value: string | number
  ) {
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  function onSearch(type: "name" | "newPage", newPage?: number) {
    setEnableQuery(true);
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
        <title>ITX Gear - ITX PC - Tối giản tạo nên sự khác biệt</title>
        <meta
          name="description"
          content="Shop bán các mặt hàng linh kiện cho Mini PC, Tiny PC, case itx, linh kiện itx, mini pc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/favicon.svg?t=2023-05-31T11%3A17%3A48.992Z"
        />
        <meta
          name="keywords"
          content="ITX Gear, itx pc, linh kiện mini ITX, mua case itx, mua vỏ case itx, vỏ case itx, nguồn flex, nguồn sfx, tản nhiệt mini, pc mini"
        />
        <meta name="author" content="ITX Gear" />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="ITX Gear - ITX PC - Tối giản tạo nên sự khác biệt"
        />
        <meta
          property="og:description"
          content="Itx Gear - ITX PC - Cửa hàng linh kiện mini ITX"
        />
        <meta
          property="og:image"
          content="https://ohaomxltnhpdriahjpvz.supabase.co/storage/v1/object/public/itx_storage/favicon.svg?t=2023-05-31T11%3A17%3A48.992Z"
        />
        <meta property="og:url" content="https://itxgear.com" />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <Background />
        <Row>
          <img
            src={"/banner.png"}
            alt="Itx pc"
            style={{ width: "100%", zIndex: 3, opacity: 0.9 }}
          />
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

            <Row
              style={{ padding: "0.5rem" }}
              gutter={[16, 16]}
              justify="center"
            >
              {productsResult?.list.map((item) => (
                <Col
                  key={`product so ${item.id}`}
                  sm={8}
                  md={6}
                  xs={12}
                  xxl={6}
                  xl={5}
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

export async function getStaticProps() {
  const baseUrl = "https://itxgear.com";
  let initProductData: ProductWithClassifyProps[] = [];
  let initCount = 0;
  try {
    const response = await fetch(
      `${baseUrl}/api/product/search?page=1&pageSize=12`,
      {
        method: METHOD.GET,
      }
    );

    const result: ResponseProps<PagingResponseProps<ProductWithClassifyProps>> =
      await response.json();

    initProductData = result.data.dataTable;
    initCount = result.data.totalCount;
  } catch (error) {
    initProductData = [];
  }
  return {
    props: {
      initProductData,
      initCount,
    },
    revalidate: 30,
  };
}
