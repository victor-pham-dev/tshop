'use client'
import React from 'react'
import { Avatar, Badge } from 'antd'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { PATH } from '@/const/app-const'

// import { useCart } from "@/hooks/useAppContext";

export default function AppHeader(): JSX.Element {
	const router = useRouter()
	const { user } = useUser()
	// console.log('🚀 ~ file: AppHeader.tsx:16 ~ user:', user)
	// const { cart } = useCart();
	// const { theme, changeTheme } = useTheme();
	// const [activeSwitch, setActiveSwitch] = useState(false);
	// useEffect(() => {
	//   let active = false;
	//   const header = document.getElementById("header");
	//   if (theme.section === "lightSection") {
	//     header?.classList.add("lightSection");
	//     header?.classList.remove("darkSection");
	//     active = true;
	//   } else {
	//     header?.classList.add("darkSection");
	//     header?.classList.remove("lightSection");
	//   }
	//   return setActiveSwitch(active);
	// }, [theme]);

	function handleNavigate() {
		router.push(`/${PATH.LOGIN}`)
	}

	return (
		<div className="flex items-center gap-4 p-4 text-white bg-blue-500">
			<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
			<div className="text-12">{user?.name}</div>
			{/* <Col span={24}>
				<Row id="header" align="middle" justify="space-between" style={{ padding: '1rem' }}>
					<Col span={12}>
						<Row style={{ cursor: 'pointer' }} onClick={() => router.push('/')} align="middle">
							<Col style={{ height: '64px' }}>
								<Image src="/favicon.svg" alt="Mix-tech" width={60} height={60} />
							</Col>
							<Col>
								<p
									className="logoText"
									style={{
										fontFamily: `'Josefin Sans', sans-serif`,

										marginLeft: '10px'
									}}
								>
									ITX Gear
								</p>
							</Col>
						</Row>
					</Col>
					<Col span={11}>
						<Row align="middle" gutter={[16, 0]} justify="end">
							<Col>
								<div gutter={[4, 0]} justify="end" align="middle">
									{user.token && user.token !== '' ? (
										<React.Fragment>
											<Col>
												<Avatar src={'https://xsgames.co/randomusers/avatar.php?g=pixel'} />
											</Col>
											<Col>{user?.name}</Col>
											{/* <Col>
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
                      )} */}
			{/* </React.Fragment>
									) : (
										<Button type="primary" onClick={handleNavigate}>
											Đăng nhập
										</Button>
									)}
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col> */}
		</div>
	)
}
