import AxiosJWTInstance from "@/InstanceAxios";
import Helmet from "@/components/Helmet";
import { useAppDispatch, useAppSelector } from "@/hook/useHookRedux";
import { getCategory } from "@/redux/api";
import { Category } from "@/type";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, type FormProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type FieldType = {
  name?: string;
  description?: string;
  basePrice?: number;
  stock?: number;
  discountPercentage?: number;
  categories?: Category[];
};

const CreateProduct = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.login.currentUser);

  const [category, setCategory] = useState<Category[]>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const filter = category?.find((c) => c.name === (values.categories as any));
    const formData = {
      ...values,
      basePrice: Number(values.basePrice),
      stock: Number(values.stock),
      discountPercentage: Number(values.discountPercentage),
      categories: [`${filter?.id}`],
    };
    await AxiosJWTInstance({ user, dispath })({
      url: `/product`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: formData,
    })
      .then(() => {
        navigate("/product-list");
        toast.success("Create Product successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    let mounted = true;
    getCategory({
      accessToken: user?.accessToken as string,
      page: 1,
      offset: 10,
    }).then((items) => {
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
      <Helmet title="Create-product">
        <></>
      </Helmet>
      <div className="w-full flex flex-row items-center justify-between py-[20px]">
        <Link to="/product-list">
          <Button size="large" icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </Link>
      </div>
      <h1 className="text-[40px] font-bold pt-[20px] pb-[30px]">Form Create</h1>
      <Form
        labelCol={{ span: 8 }}
        style={{ width: "100%", margin: "0 45px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
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
              type="number"
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
            <Input size="large" type="number" placeholder="Stock..." />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          name="categories"
          rules={[
            { required: true },
            { message: "Please input your category!" },
          ]}
          className="w-full"
        >
          <Select
            style={{ width: "100%" }}
            allowClear
            placeholder="Enter choose category"
            size="large"
            options={category?.map((item) => {
              return {
                label: item.name,
                value: item.name,
              };
            })}
          />
        </Form.Item>

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
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
