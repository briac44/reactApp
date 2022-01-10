import "./App.css";
import { Layout, Menu } from "antd";
import Content from "./components/Content";
import "antd/dist/antd.css";
import { useState } from "react";
import Account from "./components/Account";
import Login from "./components/Login";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./lib/base";
import { initializeApp } from "@firebase/app";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const deconnexion = () => {
  auth.signOut();
  window.location.reload();
};

const App = () => {
  const [content, setContent] = useState(<Content />);
  const [selectKey, setSelectKey] = useState(["1"]);

  const handleChangeContent = (c, key) => {
      setContent(c);
      setSelectKey([key]);
  };

  const connexion = () => {
    setContent(<Content />);
    setSelectKey(["1"]);
  };

  const buttonConnexion = () => {
    if (auth.currentUser) {
      return (
        <Menu.Item
          key="3"
          style={{ float: "right" }}
          onClick={() => deconnexion()}
        >
          Se déconnecter
        </Menu.Item>
      );
    } else {
      return (
        <>
          <Menu.Item
            key="3"
            style={{ float: "right" }}
            onClick={() =>
              handleChangeContent(<Login setContent={connexion} />, "3")
            }
          >
            Se connecter
          </Menu.Item>
        </>
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys="1"
        style={{ overflow: "auto" }}
        selectedKeys={selectKey}
      >
        <Menu.Item
          key="1"
          onClick={() => handleChangeContent(<Content />, "1")}
        >
          Rechercher
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => handleChangeContent(<Account />, "2")}
        >
          Mon compte
        </Menu.Item>
        {buttonConnexion()}
      </Menu>
      <Layout.Content style={{ padding: "40px 10%" }}>{content}</Layout.Content>
    </Layout>
  );
};

export default App;
