import Helmet from "@/components/Helmet";
import { Button, Form, Input, Typography, type FormProps } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FieldType = {
  email: string;
  password: string;
  name: string;
  address: string;
};

const Register = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await axios({ method: "POST", url: "/user", data: values })
      .then(() => {
        toast.success("Register successfully!");
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Helmet title="Authen/register">
        <></>
      </Helmet>
      <h1 className="text-[35px] font-bold py-8">Register</h1>

      <Form
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
          name="name"
          rules={[
            { required: true },

            {
              message: "Please input your name",
            },
          ]}
        >
          <Input size="large" placeholder="Name..." />
        </Form.Item>
        <Form.Item<FieldType>
          name="address"
          rules={[
            { required: true },

            {
              message: "Please input your address",
            },
          ]}
        >
          <Input size="large" placeholder="Address..." />
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
          href="/auth/login"
        >
          You do have an account ?
        </Typography.Link>
        <Form.Item className="flex items-center justify-center ">
          <Button type="primary" htmlType="submit" size="large">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
