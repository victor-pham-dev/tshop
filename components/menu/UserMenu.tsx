import { PATH } from '@/const/app-const'
import { useUser } from '@/hooks'
import { Dropdown, MenuProps } from 'antd'
import Link from 'next/link'

interface UserMenuProps {
  userName: string
}
export function UserMenu({ userName }: UserMenuProps): JSX.Element {
  const { reset } = useUser()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={`/${PATH.USER}/${PATH.PROFILE}`}>Thông tin tài khoản</Link>
      )
    },
    {
      key: 'logout',
      label: <div onClick={reset}>Đăng xuất</div>
    }
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
      <div className="hovername">{userName}</div>
    </Dropdown>
  )
}
