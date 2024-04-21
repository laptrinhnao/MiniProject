import AxiosJWTInstance from "@/InstanceAxios";
import Helmet from "@/components/Helmet";
import InfiniteScroll from "@/components/InfiniteScroller";
import { useAppDispatch, useAppSelector } from "@/hook/useHookRedux";
import { signOut } from "@/redux/api";
import { fetchProduct } from "@/redux/slice/sliceProduct";
import { ProductProps } from "@/type";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Image,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
const ProductDetail = () => {
  const user = useAppSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const dispath = useAppDispatch();

  const [q, setQ] = useState<string>("");
  const [paginate, setPaginate] = useState<any>({
    value: "Show product per page",
    label: "Show product per page",
  });
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [page, setPage] = useState(1);

  const handleLogOut = async () => {
    await signOut(dispath, navigate, user);
  };
  const handleChangeInputSearch = useDebouncedCallback(async () => {
    const res = await AxiosJWTInstance({ user, dispath })({
      method: "GET",
      url: `/product/?productName=${q}&page=1&offset=${
        paginate.value === "Show product per page" ? 6 : paginate
      }`,
      headers: {
        Authorization: `Berear ${user?.accessToken}`,
      },
    });
    if (res.data.length > 0) {
      setProducts(res.data);
      toast.info("results found!");
    } else {
      setProducts([]);
      toast.info("No results found!");
    }
  }, 1000);

  useEffect(() => {
    (async () => {
      await AxiosJWTInstance({ user, dispath })({
        method: "GET",
        url: `/product${q ? `?productName=${q}&` : `?`}offset=${
          paginate.value === "Show product per page" ? 6 : paginate
        }`,
        headers: {
          Authorization: `Berear ${user?.accessToken}`,
        },
      })
        .then((response) => {
          setProducts([...response.data]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    })();
  }, [paginate]);
  useEffect(() => {
    (async () => {
      await AxiosJWTInstance({ user, dispath })({
        method: "GET",
        url: `/product?page=${page}&offset=${
          paginate.value === "Show product per page" ? 6 : paginate
        }`,
        headers: {
          Authorization: `Berear ${user?.accessToken}`,
        },
      })
        .then((response) => {
          setProducts([...products, ...response.data]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    })();
  }, [page]);
  useEffect(() => {
    dispath(fetchProduct());
  }, []);
  return (
    <div className="py-[20px] px-[30px]">
      <Helmet title="product-detail">
        <></>
      </Helmet>
      <div className="container">
        <div className="flex flex-row flex-wrap justify-between items-center gap-5 -mx-[15px]">
          <h1 className="text-[25px] md:text-[25px] lg:text-[30px] xl:text-[32px] font-bold">
            Product Detail
          </h1>
          <div className="flex flex-row items-center gap-10">
            <Badge count="0" showZero>
              <Button icon={<ShoppingCartOutlined />} />
            </Badge>
            <div className="flex flex-row items-center gap-2">
              <Avatar size="large" icon={<UserOutlined />} />
              <Button onClick={handleLogOut}>
                {user?.user?.name ? user?.user?.name : "Login"}
              </Button>
            </div>
          </div>
        </div>
        <Space
          direction="horizontal"
          className="py-[20px] flex flex-row gap-5 -mx-[15px]"
        >
          <Space className="gap-5 flex-wrap">
            <form>
              <Input.Search
                className="flex flex-row items-center py-[20px]"
                placeholder="Search product..."
                size="large"
                type="search"
                name="productName"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  e.preventDefault();
                  handleChangeInputSearch();
                }}
              />
            </form>
            <Select
              style={{ width: "100%" }}
              size="large"
              allowClear
              placeholder="Select paginate"
              value={paginate}
              onChange={(e) => setPaginate(e)}
              options={[
                {
                  value: "Show product per page",
                  label: "Show product per page",
                },
                { value: "6", label: "6" },
                { value: "8", label: "8" },
                { value: "12", label: "12" },
              ]}
            />
          </Space>
        </Space>
      </div>
      {/* Product Show */}
      <div className="container">
        <InfiniteScroll
          loader={<p className="text-[16px]">Loading...</p>}
          fetchMore={() => setPage((prev) => prev + 1)}
          hasMore={true}
          endMessage={<p>You have seen it all</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 -mx-[15px] gap-[30px]">
            {products.map((item, i) => (
              <div
                className="item-card border border-[0.5] rounded-md px-[15px]"
                key={i}
              >
                <Link
                  to={`/product-detail/${item.urlName}`}
                  className="flex flex-col h-full hover:opacity-40 transition-all duration-300"
                >
                  <div className="text-center p-[40px]">
                    <Image
                      preview={false}
                      width={"100%"}
                      height={"100%"}
                      src={
                        item.picture
                          ? `http://${item.picture}`
                          : "https://st4.depositphotos.com/2495409/19919/i/450/depositphotos_199193024-stock-photo-new-product-concept-illustration-isolated.jpg"
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="content px-[30px] py-[25px] flex-1 flex flex-col justify-end">
                    <div className="flex flex-row items-center justify-between my-[25px] gap-8">
                      <h3 className="font-semibold text-[20px] sm:truncate lg:truncate">
                        {item.name}
                      </h3>
                      <p className="font-semibold flex flex-row items-center text-[20px]">
                        $ <span>{item.basePrice}</span>
                      </p>
                    </div>
                    <Typography.Paragraph
                      className="text-[20px] font-[400] text-gray-500"
                      ellipsis={{ rows: 1 }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductDetail;
