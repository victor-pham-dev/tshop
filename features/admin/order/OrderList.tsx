import { ORDER_STATUS, OrderStatusOptions } from "@/const/app-const";
import { CartDataProps } from "@/contexts/CartContext";
import { useUser } from "@/hooks";
import { SearchOrderParamsProps, SearchOrdertApi } from "@/pages/api/order.api";
import { Order } from "@prisma/client";
import { Button, Col, Pagination, Row, Select } from "antd";
import queryString from "query-string";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
interface Props {
  setOrder: Dispatch<SetStateAction<Order | undefined>>;
}
export function OrderList({ setOrder }: Props) {
  const { token } = useUser();
  const [filter, setFilter] = useState<SearchOrderParamsProps>({
    pageSize: 6,
  });
  const [params, setParams] = useState<string>(`page=1&pageSize=6`);

  const getOrders = useQuery(["searchOrders", params], () =>
    SearchOrdertApi(params, token)
  );

  const ordersMemo = useMemo(() => {
    if (getOrders.data?.data?.dataTable !== undefined) {
      return getOrders.data?.data?.dataTable;
    }
    return [];
  }, [getOrders.data?.data]);

  useEffect(() => setOrder(undefined), [ordersMemo]);

  //handle filter change
  function handleFilterChange(
    name: keyof SearchOrderParamsProps,
    value: string | number
  ) {
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  function onSearch(type: "status" | "newPage", newPage?: number) {
    let cloneFilter = { ...filter };

    if (type === "status") {
      cloneFilter.page = 1;
    } else if (type === "newPage") {
      cloneFilter.page = newPage ?? 1;
    }
    const searchParamsString = queryString.stringify(cloneFilter);
    return setParams(searchParamsString);
  }

  return (
    <Row style={{ minHeight: "90vh" }} gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 0]}>
          <Col>
            <Select
              allowClear
              style={{ width: 200 }}
              defaultValue={ORDER_STATUS.WAITING_FOR_CONFIRM}
              onChange={(value) => handleFilterChange("status", value)}
              placeholder="Trạng thái đơn hàng"
              options={OrderStatusOptions}
            />
          </Col>
          <Col span={4}>
            <Button onClick={() => onSearch("status")} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>

        <Row gutter={[0, 16]}>
          {getOrders.isLoading && <>Loading....</>}
          {ordersMemo.map((item) => {
            const items = JSON.parse(item.items) as CartDataProps[];
            return (
              <Col
                onClick={() => setOrder(item)}
                style={{ marginTop: 20, cursor: "pointer" }}
                key={`order ${item.id}`}
                span={24}
              >
                <Row
                  align="middle"
                  gutter={[16, 0]}
                  className="roundedBox boxShadow hoverEffect textTheme"
                >
                  <Col xxl={4}>{items.length} Sản phẩm</Col>
                  <Col xxl={3}>{item.total.toLocaleString()}đ</Col>
                  <Col xxl={6}>{item.paymentMethod}</Col>
                  <Col xxl={5}>{item.paymentStatus}</Col>
                  <Col xxl={4}>{item.status}</Col>
                </Row>
              </Col>
            );
          })}
          {ordersMemo.length === 0 && (
            <p
              className="textTheme"
              style={{ textAlign: "center", width: "100%" }}
            >
              Bạn chưa có đơn hàng nào cả
            </p>
          )}
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center">
          <Pagination
            className="roundedBox"
            style={{ background: "#fff" }}
            pageSize={filter.pageSize}
            showQuickJumper={
              getOrders?.data?.data?.totalCount !== undefined &&
              getOrders?.data?.data?.totalCount > 100
            }
            defaultCurrent={1}
            total={getOrders?.data?.data?.totalCount}
            onChange={(page) => onSearch("newPage", page)}
          />
        </Row>
      </Col>
    </Row>
  );
}
