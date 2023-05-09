import { Row, Skeleton, Space } from "antd";

export function CardLoading() {
  return (
    <div className="roundedBox boxShadow">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Skeleton.Input active={true} />

        <Skeleton.Input active={true} />
        <Skeleton.Input active={true} />
        <Skeleton.Input active={true} block />

        <Skeleton.Input active={true} block />
      </Space>
    </div>
  );
}
