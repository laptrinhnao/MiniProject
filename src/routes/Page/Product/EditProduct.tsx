import AxiosJWTInstance from "@/InstanceAxios";
import Helmet from "@/components/Helmet";
import { useAppDispatch, useAppSelector } from "@/hook/useHookRedux";
import { getProductByName } from "@/redux/api";
import { ProductProps } from "@/type";
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
  // categories?: any;
};

const EditProduct = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps>();
  const user = useAppSelector((state) => state.auth.login.currentUser);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const formData = {
      ...values,
      basePrice: Number(values.basePrice),
      stock: Number(values.stock),
      discountPercentage: Number(values.discountPercentage),
    };
    const res = await AxiosJWTInstance({ user, dispath })({
      method: "PATCH",
      url: `/product/${product?.id}`,
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: formData,
    });
    if (res.data) {
      navigate("/product-list");
      toast.success("Edit Product successfully!");
    } else {
      toast.error("Edit Product failed");
    }
  };
  const onFill = () => {
    let convert: any = product?.categories.find((item) => {
      return item?.name;
    });

    form.setFieldsValue({
      name: product?.name,
      basePrice: product?.basePrice,
      discountPercentage: product?.discountPercentage.toString(),
      stock: product?.stock.toString(),
      categories: convert?.name ? convert?.name : [],
      description: product?.description,
    });
  };
  useEffect(() => {
    onFill();
  }, [product]);
  useEffect(() => {
    let mounted = true;
    getProductByName({ name: params.name as string }).then((items) => {
      if (mounted) {
        setProduct(items.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="px-[40px] h-full flex flex-col items-center justify-center">
      <Helmet title="Edit-product">
        <></>
      </Helmet>
      <div className="w-full flex flex-row items-center justify-between py-[20px]">
        <Link to="/product-list">
          <Button size="large" icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </Link>
      </div>
      <h1 className="text-[40px] font-bold pt-[20px] pb-[30px]">Form Edit</h1>
      <Form
        labelCol={{ span: 8 }}
        style={{ width: "100%", margin: "0 45px" }}
        initialValues={{ product }}
        onFinish={onFinish}
        form={form}
        className="flex flex-col gap-5 justify-center"
      >
        <div className="flex justify-center items-center gap-[50px]">
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true }, { message: "Please input your name!" }]}
            className="w-full"
          >
            <Input size="large" placeholder="Name..." />
          </Form.Item>

          <Form.Item<FieldType>
            name="basePrice"
            rules={[
              { required: true },
              { message: "Please input your basePrice!" },
            ]}
            className="w-full"
          >
            <Input size="large" type="number" placeholder="BasePrice..." />
          </Form.Item>
        </div>

        <div className="flex justify-center items-center gap-[50px]">
          <Form.Item<FieldType>
            name="discountPercentage"
            rules={[
              { required: true },
              { message: "Please input your discountPercentage!" },
            ]}
            className="w-full"
          >
            <Input
              size="large"
              type="string"
              placeholder="DiscountPercentage..."
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="stock"
            rules={[
              { required: true },
              { message: "Please input your stock!" },
            ]}
            className="w-full"
          >
            <Input size="large" type="string" placeholder="Stock..." />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          name="description"
          rules={[
            { required: true },
            { message: "Please input your description!" },
          ]}
        >
          <Input size="large" placeholder="Description..." />
        </Form.Item>

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

export default EditProduct;
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
