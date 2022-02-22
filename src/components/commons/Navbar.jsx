import { Menu } from "antd";

export default function Navbar() {
    const menus = [
        "Home"
    ]
    return (
        <>
            <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {menus.map((menu, index) => {
            return <Menu.Item key={index}>{`${menu}`}</Menu.Item>;
            })}
        </Menu>
        </>
    )
}