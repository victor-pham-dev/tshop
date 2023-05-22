import { Col, Divider, Row, Typography } from "antd";
import { useQuery } from "react-query";
import { GetMyWarrantyList } from "../api/warranty.api";
import { useUser } from "@/hooks";
import { useMemo } from "react";
import { SearchWarrantyResultProps } from "../api/warranty";
import { CartDataProps } from "@/contexts/CartContext";
import { Cart } from "@prisma/client";
import { ContentLoading } from "@/components";

export default function Warranty() {
  const { token } = useUser();
  const getWarranty = useQuery(["getMyWarrant", token], () =>
    GetMyWarrantyList(token)
  );

  const data = useMemo(
    () =>
      getWarranty.data?.data !== null && getWarranty.data?.data !== undefined
        ? getWarranty.data?.data
        : [],
    [getWarranty.data?.data]
  );
  console.log(data);

  return (
    <Row justify={"center"}>
      <Col xxl={16}>
        <Row gutter={[8, 0]} style={{ marginTop: 16, padding: 16 }}>
          <Col xxl={3} xs={4}>
            Ảnh sản phẩm
          </Col>
          <Col xxl={16} xs={12}>
            Thông tin sản phẩm
          </Col>
          <Col xxl={5} xs={8}>
            Thời gian bảo hành
          </Col>
        </Row>
        {getWarranty.isLoading && <ContentLoading />}
        {getWarranty.data?.data?.length === 0 && (
          <Divider style={{ color: "white" }}>
            Bạn chưa có sản phẩm nào được bảo hành !
          </Divider>
        )}
        {data.map((item) => (
          <WarrantyItem {...item} key={`Warranty ${item.id}`} />
        ))}
      </Col>
    </Row>
  );
}

const { Text } = Typography;
function WarrantyItem(data: SearchWarrantyResultProps) {
  const items: Cart[] = JSON.parse(data.Order?.items ?? "");

  return (
    <Col span={24} className="roundedBox boxShadow">
      <Row gutter={[8, 0]}>
        <Col xxl={3} xs={4}>
          <img src={data.Classification?.image} alt="Item itx" />
        </Col>
        <Col xxl={16} xs={12}>
          <p style={{ color: "white" }}>Tên: {data.Product?.name} - </p>
          <p style={{ color: "white" }}>PL: {data.Classification?.name}</p>
          <p style={{ color: "white" }}>
            SL:{" "}
            {
              items.find(
                (cart) => cart.classificationId === data.classificationId
              )?.quantity
            }
          </p>
        </Col>
        <Col xxl={5} xs={8}>
          <Text code style={{ color: "white" }}>
            {new Date(data.startedAt).toLocaleDateString()}-
            {new Date(data.dueAt).toLocaleDateString()}
          </Text>
        </Col>
      </Row>
    </Col>
  );
}
