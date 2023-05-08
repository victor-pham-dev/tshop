import React, { useEffect, useState } from "react";
import { Row, Col, Switch, Button, Avatar, Badge } from "antd";
import MenuTop from "@/components/menu/MenuTop";
import { useTheme, useUser } from "@/hooks";
import { useRouter } from "next/router";
import { PATH, ROLE } from "@/const/app-const";
import {
  CloudOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  PhoneOutlined,
  StarOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { AdminMenu } from "@/components/menu/AdminMenu";
import { UserMenu } from "@/components/menu/UserMenu";
import Image from "next/image";

export default function AppHeader(): JSX.Element {
  const router = useRouter();
  const { user } = useUser();
  const { theme, changeTheme } = useTheme();
  const [activeSwitch, setActiveSwitch] = useState(false);
  useEffect(() => {
    let active = false;
    const header = document.getElementById("header");
    if (theme.section === "lightSection") {
      header?.classList.add("lightSection");
      header?.classList.remove("darkSection");
      active = true;
    } else {
      header?.classList.add("darkSection");
      header?.classList.remove("lightSection");
    }
    return setActiveSwitch(active);
  }, [theme]);

  function handleNavigate() {
    router.push(`/${PATH.LOGIN}`);
  }

  return (
    <Row>
      <Col style={{ background: "white" }} xxl={24} xs={0}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row>
              <Col style={{ padding: "0.6rem", color: "red" }}>
                <EnvironmentOutlined />
                &nbsp;Số 19 - Ngõ 33 - Chùa Láng - Hà Nội
              </Col>
              <Col style={{ padding: "0.6rem", color: "red" }}>
                <PhoneOutlined rotate={90} />
                &nbsp;+24 3775 7264
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Link
                  href="https://www.youtube.com/channel/UCEypAcOaTK_tpwvzhLBUpaA"
                  target="_blank"
                >
                  <div className="youtube">
                    <YoutubeOutlined className="yticon" />
                    &nbsp;Youtube
                  </div>
                </Link>
              </Col>
              <Col>
                <Link
                  href="https://www.facebook.com/TrungTamTiengNhatMina1/"
                  target="_blank"
                >
                  <div className="facebook">
                    <FacebookOutlined className="faceicon" />
                    &nbsp;Facebook
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col
        id="header"
        className="lightSection"
        span={24}
        style={{ padding: "0 1rem" }}
      >
        <Row align="middle">
          <Col span={6}>
            <Row
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
              align="middle"
            >
              <Col>
                <Image
                  src="/favicon.svg"
                  alt="Trung tâm tiếng nhật Mina"
                  width={64}
                  height={64}
                />
              </Col>
              <Col xs={0} xxl={18}>
                <p
                  style={{
                    fontFamily: "Poltawski Nowy, serif",
                    marginLeft: "-0.6rem",
                  }}
                >
                  TIẾNG NHẬT CHO MỌI NGƯỜI
                </p>
              </Col>
            </Row>
          </Col>

          <Col xxl={12} xs={0}>
            <MenuTop />
          </Col>

          <Col xxl={6} xs={10}>
            <Row align="middle" gutter={[18, 0]} justify="end">
              <Col xxl={{ push: 0, span: 16 }} xs={{ push: 14, span: 6 }}>
                <Row gutter={[4, 0]} justify="end">
                  {user.token && user.token !== "" ? (
                    <React.Fragment>
                      <Col>
                        <Badge count={1}>
                          <Avatar
                            src={
                              "https://xsgames.co/randomusers/avatar.php?g=pixel"
                            }
                          />
                        </Badge>
                      </Col>
                      <Col xxl={14} xs={0}>
                        {user.role === ROLE.ADMIN ? (
                          <AdminMenu
                            userName={user.name ?? ""}
                            role={user.role}
                          />
                        ) : (
                          <UserMenu userName={user.name ?? ""} />
                        )}
                      </Col>
                    </React.Fragment>
                  ) : (
                    <Button type="primary" onClick={handleNavigate}>
                      Đăng nhập
                    </Button>
                  )}
                </Row>
              </Col>
              <Col xxl={6} xs={0}>
                <Switch
                  checked={activeSwitch}
                  onChange={(checked: Boolean) =>
                    checked ? changeTheme("light") : changeTheme("dark")
                  }
                  checkedChildren="Sáng"
                  unCheckedChildren="Tối"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
