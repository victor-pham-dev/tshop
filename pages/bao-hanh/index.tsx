import { Col, Divider, Row, Typography } from "antd";
import { useQuery } from "react-query";
import { GetMyWarrantyList } from "../api/warranty.api";
import { useUser } from "@/hooks";
import { useMemo } from "react";
import { SearchWarrantyResultProps } from "../api/warranty";
import { CartDataProps } from "@/contexts/CartContext";
import { Cart } from "@prisma/client";

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

  if (getWarranty.data?.code !== 200) {
    return (
      <Divider style={{ color: "white" }}>
        Vui lòng đăng nhập để xem thông tin bảo hành
      </Divider>
    );
  }

  return (
    <Row>
      {data.map((item) => (
        <WarrantyItem {...item} key={`Warranty ${item.id}`} />
      ))}
    </Row>
  );
}

const { Text } = Typography;
function WarrantyItem(data: SearchWarrantyResultProps) {
  console.log(data);
  const items: Cart[] = JSON.parse(data.Order?.items ?? "");

  return (
    <Col span={24} className="textTheme roundedBox">
      <Row gutter={[8, 0]}>
        <Col xxl={3}>
          <img src={data.Classification?.image} alt="Item itx" />
        </Col>
        <Col xxl={16}>
          <Text>Tên: {data.Product?.name}</Text>
          <Text>PL: {data.Classification?.name}</Text>
          <Text>
            SL:{" "}
            {
              items.find(
                (cart) => cart.classificationId === data.classificationId
              )?.quantity
            }
          </Text>
        </Col>
        <Col xxl={5}>
          <Text code>
            {new Date(data.startedAt).toLocaleDateString()}-
            {new Date(data.dueAt).toLocaleDateString()}
          </Text>
        </Col>
      </Row>
    </Col>
  );
}
