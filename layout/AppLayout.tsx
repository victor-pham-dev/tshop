import React, { ReactNode, useEffect, useState } from "react";
import { Col, Layout, Row, message } from "antd";
import { AppFooter } from "./AppFooter";
import { useLoading, useTheme, useUser } from "../hooks";
import AppHeader from "./AppHeader";

type Props = {
  children: ReactNode;
};

const { Header, Content, Footer } = Layout;

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading();
  const { theme } = useTheme();

  useEffect(() => {
    const content = document.getElementById("content-shop");
    const footer = document.getElementById("footer-shop");
    const bg = document.getElementById("bg-shop");
    if (theme.section === "lightSection") {
      content?.classList.replace("darkTheme", "lightTheme");
      footer?.classList.replace("darkSection", "lightSection");
      bg?.classList.replace("darkBg", "lightBg");
    } else {
      content?.classList.replace("lightTheme", "darkTheme");
      footer?.classList.replace("lightSection", "darkSection");
      bg?.classList.replace("lightBg", "darkBg");
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

  return (
    <Row id="bg-shop" className="lightBg" justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={18}>
        <Layout
          style={{
            margin: "0 auto",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {/* {width < 576 && <MobileMenu />} */}
          {contextHolder}
          <Header
            style={{ width: "100%", height: "auto", padding: 0, margin: 0 }}
          >
            <AppHeader />
          </Header>

          <Content
            className="lightTheme"
            id="content-shop"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${`/bg.jpeg`})`,
                backgroundSize: "100% auto",
                backgroundRepeat: "repeat-y",
                position: "absolute",
              }}
            ></div>
            {children}
          </Content>

          <Footer
            className="lightSection"
            id="footer-shop"
            style={{ width: "100%", height: "auto", padding: 0, margin: 0 }}
          >
            <AppFooter />
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
};
