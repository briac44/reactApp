import { Input, Form, Button, Alert  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {firebaseConfig} from "../lib/base";
import { initializeApp } from '@firebase/app';
import {browserLocalPersistence, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Content from "./Content";


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Login = (props) => {
    
    const onFinish = (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then((credentials) => {
          console.log(credentials);
          props.setContent(<Content/>);        
      })
      .catch((err) => {
          console.log(err.message);
          props.setContent(<Content/>);
      })
    };
  

    
    return (

        <div>
            <Form
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Adresse email"
                    name="email"
                    rules={[
                        {required: true,
                        message: "Renseignez votre adresse email"}
                    ]}>
                    <Input size="medium" placeholder="Adresse mail" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[
                        {required: true,
                        message: "Renseignez votre mot de passe"}
                    ]}>
                    <Input.Password placeholder="input password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Se Connecter</Button>
                </Form.Item>
            </Form>

        </div>
        

    );
}

export default Login;