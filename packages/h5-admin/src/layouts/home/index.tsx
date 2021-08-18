import React, { lazy } from 'react'
import { withLoading } from '~/components/loading-hoc'
import { SwitchRoute, RouteS } from '~/components/switch-route'
import { Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useState } from 'react'

const { Header, Footer, Sider, Content } = Layout

const StyledLogo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* padding: 16px; */
  cursor: pointer;
  > img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  > h1 {
    display: inline-block;
    height: 32px;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    animation: layout-title-hide 0.3s;
  }
`

const StyledSider = styled(Sider)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`

const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />

type tabBarItem = RouteS & {
  path: string
}

const tabBarItems: Array<tabBarItem> = [
  {
    key: 'dashboard',
    path: '/dashboard',
    exact: true,
    component: withLoading(lazy(() => import('~/pages/dashboard'))),
  },
  {
    key: 'users',
    path: '/users',
    exact: true,
    component: withLoading(lazy(() => import('~/pages/users'))),
  },
]

export const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <div
        style={{
          width: collapsed ? 48 : 200,
          overflow: 'hidden',
          flex: `0 0 ${collapsed ? 48 : 200}px`,
          maxWidth: collapsed ? 48 : 200,
          minWidth: collapsed ? 48 : 200,
          transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
        }}
      />
      <StyledSider
        collapsed={collapsed}
        style={{
          overflow: 'hidden',
        }}
        collapsedWidth={48}
        width={200}
      >
        <StyledLogo
          className="logo"
          style={{
            padding: collapsed ? '16px 8px' : '16px',
          }}
        >
          <img src={require('~/assets/avatar.png').default} alt="" />
          {collapsed ? null : <h1>Shippo Admin</h1>}
        </StyledLogo>
        <div
          style={{
            flex: '1 1 0%',
            overflow: 'hidden auto',
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            style={{
              minHeight: '100%',
            }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              nav 5
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<UserOutlined />}>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<UserOutlined />}>
              nav 8
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Menu theme="dark" mode="inline" inlineIndent={16} selectedKeys={[]} openKeys={[]}>
            <Menu.Item title={false} key="collapsed" onClick={() => setCollapsed(!collapsed)}>
              {defaultRenderCollapsedButton(collapsed)}
            </Menu.Item>
          </Menu>
        </div>
      </StyledSider>
      <Layout>
        <Header
          style={{
            height: '48px',
            backgroundColor: '#fff',
          }}
        >
          Header
        </Header>
        <Content>
          <SwitchRoute routes={tabBarItems} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default Home
