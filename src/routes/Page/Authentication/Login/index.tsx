import Helmet from "@/components/Helmet";
import { useAppDispatch } from "@/hook/useHookRedux";
import { signInUser } from "@/redux/api";
import { Button, Form, type FormProps, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await signInUser(
      {
        email: values.email,
        password: values.password,
      },
      dispath,
      navigate
    );
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Helmet title="Authen/login">
        <></>
      </Helmet>
      <h1 className="text-[35px] font-bold py-8">Login</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        style={{ width: "100%", padding: "0 70px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true },
            {
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Email format is incorrect",
            },
            { message: "Please input your email!" },
          ]}
        >
          <Input size="large" placeholder="Email..." />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true },
            {
              pattern: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
              message:
                "Password has at least one number, one letter and one special character",
            },
            {
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Password..." />
        </Form.Item>

        <Typography.Link
          italic
          className="italic flex items-center justify-center my-5"
          href="/auth/register"
        >
          You don't have an account yet?
        </Typography.Link>
        <Form.Item className="flex items-center justify-center ">
          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
