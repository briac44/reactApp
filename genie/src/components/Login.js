
import { Input, Form, Button, message, Modal  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {firebaseConfig} from "../lib/base";
import { initializeApp } from '@firebase/app';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import Content from "./Content";
import { useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

const Login = (props) => {
  const [isResetVisible, setIsResetVisible] = useState(false);
  const [email, setEmail] = useState();

  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((credentials) => {
          message.info("Bienvenue " + credentials.user.email);
        props.setContent(<Content />);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onFinishRegister = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((rsp) => {
        setDoc(doc(db, "users", auth.currentUser.uid), {
            favoriteArtist: [],
            favoriteSongs: [],
            idUser: rsp.user.uid
        });
        props.setContent(<Content/>); 
      })
      .catch((err) => {
        console.log(err.message);
        message.info("Erreur lors de l'inscription");
    });
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const showModal = () => {
    setIsModalVisible(true);
};

const handleOk = () => {
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
};

const [isModalVisible, setIsModalVisible] = useState(false);


  const handleForgotPassword = () => {
    setIsResetVisible(true);
  };

  const handleOkPassword = () => {
    console.log(email);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success("Email envoyé avec succès !");
        setIsResetVisible(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleCancelPassword = () => {
    setIsResetVisible(false);
  };

  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Adresse email"
          name="email"
          rules={[
            { required: true, message: "Renseignez votre adresse email" },
          ]}
        >
          <Input
            size="medium"
            style={{ width: "200px" }}
            placeholder="Adresse mail"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Renseignez votre mot de passe" }]}
        >
          <Input.Password
            style={{ width: "200px" }}
            placeholder="Mot de passe"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Se Connecter
          </Button>
        </Form.Item>
      </Form>
      <a onClick={() => handleForgotPassword()}>Mot de passe oublié ?</a>
      <Modal
        title="Réinitialiser le mot de passe"
        visible={isResetVisible}
        onOk={() => handleOkPassword()}
        onCancel={() => handleCancelPassword()}
        okText="Valider"
        cancelText="Annuler"
      >
        <Input
          placeholder="Email du compte"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
      <Button type="primary" onClick={showModal}>
                S'inscrire
            </Button>
            <Modal title="Inscription" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinishRegister}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email :"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mot de passe : "
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            S'inscrire
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
    </div>
  );
};

export default Login;
