import Helmet from "@/components/Helmet";
import { getProductByName } from "@/redux/api";
import { ProductProps } from "@/type";
import {
  Button,
  Divider,
  Image,
  InputNumber,
  Space,
  Statistic,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailSlug = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps>();

  const handleAddToCart = () => {};

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
    <div className="container h-full">
      <Helmet title={`product-detail-${product?.name}`}>
        <div></div>
      </Helmet>
      <div className="border-[1px] rounded-md h-full flex justify-center items-center">
        <div className="grid grid-cols-2 -mx-[15px]">
          <div className="image px-[15px]">
            <Image
              preview={false}
              width={"100%"}
              height={"100%"}
              src={
                product?.picture
                  ? `http://${product?.picture}`
                  : "https://st4.depositphotos.com/2495409/19919/i/450/depositphotos_199193024-stock-photo-new-product-concept-illustration-isolated.jpg"
              }
              alt={product?.name}
            />
          </div>
          <div className="content px-[15px]">
            <div className="flex flex-col h-full justify-center pr-[40px]">
              <h3 className="text-[30px] font-[700] my-[20px] tracking-wide">
                {product?.name}
              </h3>
              <Space className="flex flex-row items-center my-[20px]">
                <span className="text-[24px] font-[700] text-blue-700">$</span>
                <Statistic
                  value={product?.basePrice}
                  precision={2}
                  valueStyle={{ fontSize: 24, color: "#384aeb" }}
                  className="font-[700]"
                />
              </Space>

              <Space direction="vertical" align="start">
                <Space>
                  <Typography.Text className="flex flex-row items-center gap-2 text-[20px] font-[400]">
                    Category:
                    {product?.categories && product.categories.length > 0 ? (
                      product?.categories.map((item, i) => (
                        <span key={i}>{item.name}</span>
                      ))
                    ) : (
                      <> No category</>
                    )}
                  </Typography.Text>
                </Space>
                <Space>
                  <Typography.Text className="text-[20px] font-[400]">
                    Availability:
                  </Typography.Text>
                  {product?.stock && product.stock > 0 ? (
                    <Typography.Text className="text-[20px] font-[400] text-gray-500">
                      In Stock
                    </Typography.Text>
                  ) : (
                    <Typography.Text className="text-[20px] font-[400] text-gray-500">
                      "Out of Stock"
                    </Typography.Text>
                  )}
                </Space>
              </Space>
              <Divider />
              <Typography.Paragraph
                className="text-[20px] font-[400] text-gray-500"
                ellipsis={{ rows: 4 }}
              >
                Desc: {product?.description}
              </Typography.Paragraph>
              <Divider />
              <Space
                direction="horizontal"
                align="center"
                className="items-center w-full"
              >
                <Typography.Text className="text-[20px] font-[400]">
                  Quantity:
                </Typography.Text>
                <InputNumber
                  size="middle"
                  width="250"
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={() => {}}
                />
                <button
                  className="rounded-full border border-blue-500 text-base px-[25px] md:px-[30px] lg:px-[42px] py-[8px] md:py-[12px] lg:py-[12px] bg-blue-500 text-white hover:text-blue-500 hover:bg-white duration-300 ease-in"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </Space>
              <Divider />
              <Space>
                <Button
                  onClick={() => navigate(-1)}
                  type="primary"
                  size="large"
                >
                  Back Home
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSlug;
