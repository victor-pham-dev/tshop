import { ProductCard } from "@/components/card/ProductCard";
import {
  SearchProductApi,
  SearchProductParamsProps,
} from "@/pages/api/product.api";
import { Button, Col, Input, Pagination, Row } from "antd";
import queryString from "query-string";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

export function OrderList() {
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
        <Row gutter={[16, 16]}>
          {productsResult?.dataTable !== undefined &&
            productsResult?.dataTable.map((item) => (
              <Col key={`product so ${item.id}`} xxl={12}>
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
    </Row>
  );
}
