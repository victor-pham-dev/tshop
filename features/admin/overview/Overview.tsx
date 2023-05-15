import { ProductWithClassifyProps } from "@/contexts/CartContext";
import { useUser } from "@/hooks";
import { GetAllOrderApi } from "@/pages/api/order.api";
import { GetAllProductApi } from "@/pages/api/product.api";
import { StatisticProps } from "@/pages/api/sellstatistic/all";
import { GetAllStatisticApi } from "@/pages/api/statistic.api";
import { GetWarehouseImportBillsApi } from "@/pages/api/warehouse.api";
import { WarehouseBillProps } from "@/pages/api/warehouse/all";
import { Order } from "@prisma/client";
import { Col, Divider, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const { Text } = Typography;
export function Overview() {
  const { token } = useUser();
  const getBills = useQuery("allBill", () => GetWarehouseImportBillsApi(token));

  const bills: WarehouseBillProps[] = useMemo(() => {
    if (getBills.data?.data !== null && getBills.data?.data !== undefined) {
      return getBills.data?.data;
    }
    return [];
  }, [getBills.data?.data]);
  const getProducts = useQuery("allProduct", () => GetAllProductApi(token));

  const products: ProductWithClassifyProps[] = useMemo(() => {
    if (
      getProducts.data?.data !== null &&
      getProducts.data?.data !== undefined
    ) {
      return getProducts.data?.data;
    }
    return [];
  }, [getProducts.data?.data]);

  const getAllOrder = useQuery("allOrder", () => GetAllOrderApi(token));

  const orders: Order[] = useMemo(() => {
    if (
      getAllOrder.data?.data !== null &&
      getAllOrder.data?.data !== undefined
    ) {
      return getAllOrder.data?.data;
    }
    return [];
  }, [getAllOrder.data?.data]);

  const getSellStatistic = useQuery("allStatistic", () =>
    GetAllStatisticApi(token)
  );

  const statistics = useMemo(() => {
    if (
      getSellStatistic.data?.data !== null &&
      getSellStatistic.data?.data !== undefined
    ) {
      return getSellStatistic.data?.data;
    }
    return [];
  }, [getSellStatistic.data?.data]);

  const [importStatistic, setImportStatistic] = useState({
    total: 0,
    totalMoney: 0,
  });
  const [orderStatistic, setOrderStatistic] = useState({
    total: 0,
    totalMoney: 0,
  });
  useEffect(() => {
    let totalMoney = 0;
    const total = bills.length;
    bills.forEach((item) => {
      totalMoney += item.quantity * item.importPrice;
    });
    return setImportStatistic({
      total,
      totalMoney,
    });
  }, [bills]);

  useEffect(() => {
    let totalMoney = 0;
    const total = orders.length;
    orders.forEach((item) => {
      totalMoney += item.total;
    });
    return setOrderStatistic({
      total,
      totalMoney,
    });
  }, [orders]);
  return (
    <Row style={{ height: "90vh" }}>
      <Col xxl={6}>
        <Divider>Nhập hàng</Divider>
        <h3>
          Số đơn đã nhập{" "}
          <Text type="danger" code>
            {importStatistic.total}
          </Text>
        </h3>
        <h3>
          Tổng tiền đã nhập{" "}
          <Text type="danger" code>
            {importStatistic.totalMoney.toLocaleString()}đ
          </Text>
        </h3>
      </Col>

      <Col xxl={6}>
        <Divider>Bán hàng</Divider>
        <h3>
          Số đơn đã bán
          <Text type="danger" code>
            {orderStatistic.total}
          </Text>
        </h3>
        <h3>
          Doanh thu
          <Text type="danger" code>
            {orderStatistic.totalMoney.toLocaleString()}đ
          </Text>
        </h3>
      </Col>
      <Col xxl={6}>
        <Divider>Sản phẩm</Divider>
        <h3>
          Tổng sản phẩm
          <Text type="danger" code>
            {products.length}
          </Text>
        </h3>
      </Col>

      <Col span={24}>
        <Divider className="textTheme">Thống kê bán hàng cho sản phẩm</Divider>
        <Row gutter={[16, 16]}>
          <Col xxl={3}>{`Tên sản phẩm`}</Col>
          <Col xxl={3}>{`Tên phân loại`}</Col>
          <Col xxl={2}>{`Tổng số lượng nhập`}</Col>
          <Col xxl={3}>{`Giá nhập trung bình`}</Col>
          <Col xxl={3}>Tổng tiền nhập</Col>
          <Col xxl={2}>{`Tổng số bán`}</Col>
          <Col xxl={2}>{`Giá bán trung bình`}</Col>
          <Col xxl={2}>Tổng tiền bán</Col>
          <Col xxl={4}>Lợi nhuận</Col>
        </Row>
        {statistics.map((item) => {
          return (
            <Row
              className="textTheme roundedBox boxShadow"
              key={`sdaf ${item.id}`}
              gutter={[16, 16]}
              style={{ marginTop: 16 }}
              align="middle"
            >
              <Col xxl={3}>{item.Product?.name}</Col>
              <Col xxl={3}>{item.Classification?.name}</Col>
              <Col xxl={2}>{item.importQuantity}</Col>
              <Col xxl={3}>{item.importAveragePrice.toLocaleString()}đ</Col>
              <Col xxl={3}>
                {(
                  item.importAveragePrice * item.importQuantity
                ).toLocaleString()}
                đ
              </Col>
              <Col xxl={2}>{item.sellQuantity}</Col>
              <Col xxl={2}>{item.sellAveragePrice.toLocaleString()}đ</Col>
              <Col xxl={2}>
                {(item.sellAveragePrice * item.sellQuantity).toLocaleString()}đ
              </Col>
              <Col xxl={4}>
                {(
                  item.sellAveragePrice * item.sellQuantity -
                  item.importAveragePrice * item.importQuantity
                ).toLocaleString()}{" "}
                đ
              </Col>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
}
