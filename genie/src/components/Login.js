import { Input, Form, Button, Modal, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { firebaseConfig } from "../lib/base";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Content from "./Content";
import { useState } from "react";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Login = (props) => {
  const [isResetVisible, setIsResetVisible] = useState(false);
  const [email, setEmail] = useState();

  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((credentials) => {
          message.info("Bienvenue " + credentials.user.displayName);
        props.setContent(<Content />);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleForgotPassword = () => {
    setIsResetVisible(true);
  };

  const handleOk = () => {
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

  const handleCancel = () => {
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
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        okText="Valider"
        cancelText="Annuler"
      >
        <Input
          placeholder="Email du compte"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Login;
