import { Button, Col, Divider, Popconfirm, Row, message } from "antd";
import { ImportWarehouse } from "./ImportWarehouse";
import { useMemo, useState } from "react";
import { ProductWithClassifyProps } from "@/contexts/CartContext";
import { ProductListToImport } from "./ProductListToImport";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GetWarehouseImportBillsApi,
  RemoveWarehouseImportApi,
} from "@/pages/api/warehouse.api";
import { WarehouseBillProps } from "@/pages/api/warehouse/all";
import { useLoading, useUser } from "@/hooks";
import { STATUS_CODE } from "@/const/app-const";

export function WarehouseImportManager(): JSX.Element {
  const queryClient = useQueryClient();
  const { token } = useUser();
  const { setIsLoading } = useLoading();
  const [product, setProduct] = useState<ProductWithClassifyProps | undefined>(
    undefined
  );

  const getBills = useQuery("wareHouseBills", () =>
    GetWarehouseImportBillsApi(token)
  );

  const bills: WarehouseBillProps[] = useMemo(() => {
    if (getBills.data?.data !== null && getBills.data?.data !== undefined) {
      return getBills.data?.data;
    }
    return [];
  }, [getBills.data?.data]);

  const onDelete = useMutation(
    "deleteWarehouse",
    (id: string) => RemoveWarehouseImportApi(id, token),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.code === STATUS_CODE.OK) {
          message.success("Xoá rồi");
          queryClient.invalidateQueries("wareHouseBills");
        } else {
          message.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        message.error("Lỗi server");
      },
    }
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xxl={10}>
        <div className="roundedBox boxShadow">
          <ProductListToImport setProduct={setProduct} />
        </div>
      </Col>
      <Col xxl={14}>
        <div className="roundedBox boxShadow">
          <ImportWarehouse product={product} setProduct={setProduct} />
        </div>
      </Col>
      <Divider>Lịch sử nhập hàng</Divider>
      <Col span={24} style={{ height: "100vh", overflowY: "scroll" }}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Row gutter={[16, 0]}>
              <Col span={4}>Ngày nhập</Col>
              <Col span={4}>Tên sản phẩm</Col>
              <Col span={4}>Tên phân loại</Col>
              <Col span={4}>Số lượng nhập</Col>
              <Col span={4}>Giá nhập</Col>
              <Col span={4}>Tổng tiền nhập</Col>
            </Row>
          </Col>
          {bills.map((item) => (
            <Col
              style={item.deleted ? { background: "gray" } : {}}
              className="roundedBox textTheme boxShadow"
              key={`bnill ${item.id}`}
              span={24}
            >
              <Row gutter={[16, 0]}>
                <Col span={4}>
                  {new Date(item.createdAt.toString()).toLocaleString()}
                </Col>
                <Col span={4}>{item.Product?.name}</Col>
                <Col span={4}>{item.Classification?.name}</Col>
                <Col span={4}>{item.quantity}</Col>
                <Col span={4}>{item.importPrice.toLocaleString()}</Col>
                <Col span={4}>
                  {(item.importPrice * item.quantity).toLocaleString()}đ{`-`}
                  {!item.deleted && (
                    <Popconfirm
                      title="Xoá thật à"
                      onConfirm={() => onDelete.mutate(item.id)}
                    >
                      <Button danger>Xoá</Button>
                    </Popconfirm>
                  )}
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
