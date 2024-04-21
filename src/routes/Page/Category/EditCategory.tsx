import AxiosJWTInstance from "@/InstanceAxios";
import Helmet from "@/components/Helmet";
import { useAppDispatch, useAppSelector } from "@/hook/useHookRedux";
import { getCategoryByName } from "@/redux/api";
import { Category } from "@/type";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, type FormProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type FieldType = {
  name?: string;
  description?: string;
  basePrice?: string;
  stock?: string;
  discountPercentage?: string;
  categories?: any;
};

const EditCategory = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>();
  const user = useAppSelector((state) => state.auth.login.currentUser);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await AxiosJWTInstance({ user, dispath })({
      method: "PATCH",
      url: `/category/${category?.id}`,
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: values,
    });
    if (res.data) {
      navigate("/category");
      toast.success("Edit Category successfully!");
    } else {
      toast.error("Edit Category failed");
    }
  };
  const onFill = () => {
    form.setFieldsValue({
      name: category?.name,
    });
  };
  useEffect(() => {
    onFill();
  }, [category]);
  useEffect(() => {
    let mounted = true;
    getCategoryByName({ name: params.name as string }).then((items) => {
      if (mounted) {
        setCategory(items.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="px-[40px] h-full flex flex-col items-center justify-center">
      <Helmet title="Edit-category">
        <></>
      </Helmet>
      <div className="w-full flex flex-row items-center justify-between py-[20px]">
        <Link to="/category">
          <Button size="large" icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </Link>
      </div>
      <h1 className="text-[40px] font-bold pt-[20px] pb-[30px]">Form Edit</h1>
      <Form
        labelCol={{ span: 8 }}
        style={{ width: "100%", margin: "0 45px" }}
        initialValues={{ category }}
        onFinish={onFinish}
        form={form}
        className="flex flex-col gap-5 justify-center"
      >
        <div className="flex justify-center items-center gap-[50px]">
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true }, { message: "Please input category!" }]}
            className="w-full"
          >
            <Input size="large" placeholder="Category name..." />
          </Form.Item>
        </div>

        <Form.Item className="flex items-center justify-center ">
          <Button htmlType="reset" className="mx-2" size="large">
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="mx-2"
            size="large"
          >
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategory;
// {
//   "name": "Ip20",
//   "basePrice": 5,
//   "discountPercentage": 5,
//   "stock": 5,
//   "description": "Lorem lorem",
//   "categories": [
//     "482c5bbc-f221-49e0-8f09-21f52847988a"
//   ]
// }
