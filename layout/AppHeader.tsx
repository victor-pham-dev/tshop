import React, { useEffect, useState } from "react";
import { Row, Col, Switch, Button, Avatar, Badge } from "antd";
import { useTheme, useUser } from "@/hooks";
import { useRouter } from "next/router";
import { PATH, ROLE } from "@/const/app-const";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AdminMenu } from "@/components/menu/AdminMenu";
import { UserMenu } from "@/components/menu/UserMenu";
import Image from "next/image";
import { useCart } from "@/hooks/useAppContext";

export default function AppHeader(): JSX.Element {
  const router = useRouter();
  const { user } = useUser();
  const { cart } = useCart();
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
      <Col
        id="header"
        className="lightSection"
        span={24}
        style={{ padding: "1rem" }}
      >
        <Row align="middle" justify="space-between">
          <Col span={12}>
            <Row
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
              align="middle"
            >
              <Col style={{ height: "64px" }}>
                <Image
                  src="/favicon.svg"
                  alt="Mix-tech"
                  width={60}
                  height={60}
                />
              </Col>
              <Col>
                <p
                  className="logoText"
                  style={{
                    fontFamily: `'Josefin Sans', sans-serif`,

                    marginLeft: "10px",
                  }}
                >
                  Mix tech
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row align="middle" gutter={[16, 0]} justify="end">
              <Col>
                <Row gutter={[4, 0]} justify="end" align="middle">
                  {user.token && user.token !== "" ? (
                    <React.Fragment>
                      <Col>
                        <Avatar
                          src={
                            "https://xsgames.co/randomusers/avatar.php?g=pixel"
                          }
                        />
                      </Col>
                      <Col>
                        {user.role === ROLE.ADMIN ? (
                          <AdminMenu userName={user.name ?? ""} />
                        ) : (
                          <UserMenu userName={user.name ?? ""} />
                        )}
                      </Col>

                      {user.role === ROLE.USER && (
                        <Col>
                          <Link href={`/${PATH.CART}`}>
                            <Badge count={cart.length ?? 0}>
                              <ShoppingCartOutlined
                                style={{
                                  fontSize: 32,
                                  color: "white",
                                  marginTop: 12,
                                }}
                              />
                            </Badge>
                          </Link>
                        </Col>
                      )}
                    </React.Fragment>
                  ) : (
                    <Button type="primary" onClick={handleNavigate}>
                      Đăng nhập
                    </Button>
                  )}
                </Row>
              </Col>
              {/* <Col>
                <Switch
                  checked={activeSwitch}
                  onChange={(checked: Boolean) =>
                    checked ? changeTheme("light") : changeTheme("dark")
                  }
                  checkedChildren="Sáng"
                  unCheckedChildren="Tối"
                />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
