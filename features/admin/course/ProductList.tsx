import { ContentLoading } from "@/components";
import { CourseCard } from "@/components/card/CourseCard";
import { CourseProps } from "@/entities/course.entities";
import { SearchCourseApi } from "@/pages/api/course.api";
import { Col, Row } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

interface Props {
  changeTab: (key: string) => void;
  setItemAction: Dispatch<SetStateAction<"add" | "edit">>;
  setItemEditData: Dispatch<SetStateAction<CourseProps | undefined>>;
}

export function CourseList({
  changeTab,
  setItemAction,
  setItemEditData,
}: Props) {
  const getCourses = useQuery(["getListRegis"], () => SearchCourseApi());

  return (
    <Row gutter={[16, 16]}>
      {getCourses.data?.data?.map((item, i) => (
        <Col
          onClick={() => {
            setItemEditData(item);
            setItemAction("edit");
            changeTab("course");
          }}
          className="cardBox"
          xxl={6}
          key={`course card ${i}`}
        >
          <CourseCard {...item} />
        </Col>
      ))}
      {getCourses.isLoading ? <ContentLoading /> : <Row></Row>}
      {getCourses.error !== null && <p>Đã có lỗi xảy ra</p>}
    </Row>
  );
}
