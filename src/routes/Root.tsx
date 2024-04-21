import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  ProfileOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, FloatButton, Layout, Popover, Space, theme } from "antd";
import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { routerAdmin } from "../MockAPI";
import Logo from "../components/Logo";
import { ThemeContext } from "../hook/useContext";
import { useAppDispatch, useAppSelector } from "../hook/useHookRedux";
import { signOut } from "../redux/api";
import Helmet from "@/components/Helmet";
const { Header, Content, Sider } = Layout;

const RootDefault = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.login.currentUser);

  const [collapsed, setCollapsed] = useState(false);
  const { themeContext, setTheme } = useContext(ThemeContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogOut = async () => {
    await signOut(dispath, navigate, user);
  };
  return (
    <>
      <Helmet title="Main">
        <></>
      </Helmet>
      <Layout hasSider>
        <Sider
          width={300}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <div className="py-[4rem]">
            <Logo />
          </div>
          <div className="flex flex-col gap-10 px-[8px]">
            {routerAdmin.map((item, i) => (
              <NavLink
                key={i}
                to={`${item.path}`}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
                className={({ isActive }) =>
                  isActive
                    ? "active text-blue-500 "
                    : "hover:text-blue-500 ease-out-in text-white"
                }
              >
                <Space>
                  {item.icon} {item.content}
                </Space>
              </NavLink>
            ))}
          </div>
        </Sider>
        <Layout style={{ marginLeft: 300 }}>
          <Header style={{ padding: "0 30px", background: colorBgContainer }}>
            <div className="flex flex-row items-center justify-between">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: 64,
                  height: 64,
                }}
              />
              <Popover
                title="Tool"
                content={
                  <Space>
                    <Button type="primary" icon={<ProfileOutlined />}>
                      Profile
                    </Button>
                    <Button
                      type="default"
                      icon={<LogoutOutlined />}
                      onClick={handleLogOut}
                    >
                      LogOut
                    </Button>
                  </Space>
                }
                trigger="hover"
              >
                <Button icon={<UserOutlined />}>
                  Role: {user?.user?.role}
                </Button>
              </Popover>
            </div>
          </Header>
          <Content style={{ margin: "32px 32px", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ left: 24, bottom: 24 }}
        icon={<SettingOutlined />}
      >
        <FloatButton
          onClick={() => {
            themeContext === "dark" ? setTheme("light") : setTheme("dark");
          }}
          icon={themeContext === "dark" ? <MoonOutlined /> : <SunOutlined />}
        />
      </FloatButton.Group>
    </>
  );
};

export default RootDefault;
