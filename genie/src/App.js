import "./App.css";
import { Layout, Menu } from "antd";
import Content from "./components/Content";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import { Header } from "antd/lib/layout/layout";
import { useState } from "react";
import Account from "./components/Account";

const App = () => {
  const [idSelect,setIdSelect] = useState('1');
  const [content,setContent] = useState(<Content/>)

  const handleChangeContent = (c) => {
    setContent(c);
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys="1">
          <Menu.Item key="1" onClick={() => handleChangeContent(<Content/>)}>Rechercher</Menu.Item>
          <Menu.Item key="2" onClick={() => handleChangeContent(<Account/>)}>Mon compte</Menu.Item>
        </Menu>
        <Layout.Content style={{ padding: '5% 10%' }}>
          {content}
        </Layout.Content>
    </Layout>
  );
};

export default App;
