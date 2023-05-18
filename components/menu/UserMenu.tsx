import { PATH } from "@/const/app-const";
import { useUser } from "@/hooks";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

interface UserMenuProps {
  userName: string;
}
export function UserMenu({ userName }: UserMenuProps): JSX.Element {
  const { reset } = useUser();
  const items: MenuProps["items"] = [
    {
      key: "order",
      label: <Link href={`/${PATH.ORDER}`}>Danh sách đơn hàng</Link>,
    },
    {
      key: "warranty",
      label: <Link href={`/${PATH.WARRANTY}`}>Tra cứu bảo hành</Link>,
    },
    {
      key: "logout",
      label: <div onClick={reset}>Đăng xuất</div>,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
      <div className="hovername">{userName}</div>
    </Dropdown>
  );
}
