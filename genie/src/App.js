import "./App.css";
import { Layout, Menu } from "antd";
import Content from "./components/Content";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import { Header } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import Account from "./components/Account";
import Login from "./components/Login";
import {getAuth} from "firebase/auth";
import {firebaseConfig} from "./lib/base";
import { initializeApp } from '@firebase/app';
import Register from "./components/Register";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const deconnexion = () => {
  auth.signOut();
  window.location.reload();
}

const App = () => {
  const [content,setContent] = useState(<Content/>)


  const handleChangeContent = (c) => {
    setContent(c);
  }


  const buttonConnexion = () => {
    if(auth.currentUser){
      return (<Menu.Item key="3" style={{float: "right"}} onClick={() => deconnexion()}>Se déconnecter</Menu.Item>);
    }
    else {
      return (<>
      <Menu.Item key="3" style={{float: "right"}} onClick={() => handleChangeContent(<Login setContent={setContent}/>)}>Se connecter</Menu.Item>
      </>
      )
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys="1" style={{overflow: "auto"}}>
          <Menu.Item key="1" onClick={() => handleChangeContent(<Content/>)}>Rechercher</Menu.Item>
          <Menu.Item key="2" onClick={() => handleChangeContent(<Account/>)}>Mon compte</Menu.Item>
          {
            buttonConnexion()
          }
        </Menu>
        <Layout.Content style={{ padding: '40px 10%' }}>
          {content}
        </Layout.Content>
    </Layout>
  );
};

export default App;
