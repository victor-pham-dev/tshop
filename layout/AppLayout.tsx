import React, { ReactNode, useEffect, useState } from "react";
import { Col, Layout, Row, message } from "antd";
import { AppFooter } from "./AppFooter";
import { useLoading, useTheme, useUser } from "../hooks";
import { FullPageLoading } from "../components/loading/FullPageLoading";
import AppHeader from "./AppHeader";

type Props = {
  children: ReactNode;
};

const { Content, Footer } = Layout;

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading();
  const { theme } = useTheme();
  const { user } = useUser();
  //console.log(user)

  useEffect(() => {
    const content = document.getElementById("content-mina");
    const footer = document.getElementById("footer-mina");
    const bg = document.getElementById("bg-mina");
    if (theme.section === "lightSection") {
      content?.classList.replace("darkTheme", "lightTheme");
      footer?.classList.replace("darkSection", "lightSection");
      bg?.classList.replace("darkbg", "lightbg");
    } else {
      content?.classList.replace("lightTheme", "darkTheme");
      footer?.classList.replace("lightSection", "darkSection");
      bg?.classList.replace("lightbg", "darkbg");
    }
  }, [theme]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isLoading) {
      messageApi.open({
        key: "loadingmsg",
        type: "loading",
        content: "Vui lòng chờ ...",
      });
    } else {
      messageApi.destroy("loadingmsg");
    }
  }, [isLoading]);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = document.getElementById("__next");

    setWidth(container?.offsetWidth ?? 1000);
  }, []);
  //console.log(width)
  return (
    <Row id="bg-mina" className="lightbg" justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
        <Layout
          className="layout"
          style={{
            margin: "0 auto",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {/* {width < 576 && <MobileMenu />} */}
          {contextHolder}

          <AppHeader />
          <Content
            style={{ paddingBottom: "2rem" }}
            className="lightTheme"
            id="content-mina"
          >
            {children}
          </Content>

          <Footer className="lightSection" id="footer-mina">
            <AppFooter />
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
};
