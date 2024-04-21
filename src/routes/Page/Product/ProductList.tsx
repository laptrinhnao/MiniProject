import AxiosJWTInstance from "@/InstanceAxios";
import Helmet from "@/components/Helmet";
import InfiniteScroll from "@/components/InfiniteScroller";
import TableList from "@/components/TableList";
import { useAppDispatch, useAppSelector } from "@/hook/useHookRedux";
import { fetchProduct } from "@/redux/slice/sliceProduct";
import { DataType, ProductProps } from "@/type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Space,
  TableColumnsType,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

const ProductList = () => {
  const dispath = useAppDispatch();
  const user = useAppSelector((state) => state.auth.login.currentUser);
  const products = useAppSelector((state) => state.products.product.productArr);

  const [q, setQ] = useState<string>("");
  const [file, setFile] = useState<any>();
  const [id, setId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [fileReview, setFileReview] = useState<string>();

  const [page, setPage] = useState(1);

  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    try {
      const res = await AxiosJWTInstance({ user, dispath })({
        method: "DELETE",
        url: `/product/${idDelete}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      if (res) toast.success("Delete successfully!");
      dispath(fetchProduct());
    } catch (e) {
      toast.error("Delete Failed!");
    }
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("No Delete");
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Picture",
      dataIndex: "",
      render: (e: DataType) => (
        <Image
          src={
            e.picture
              ? `http://${e.picture}`
              : "https://st4.depositphotos.com/2495409/19919/i/450/depositphotos_199193024-stock-photo-new-product-concept-illustration-isolated.jpg"
          }
          alt="picture"
          width={100}
          height={100}
          preview={false}
          onClick={() => {
            setModalOpen(true);
            setId(e.id);
          }}
        />
      ),
    },
    {
      title: "Id",
      dataIndex: "id",
      render: (id: string) => (
        <Typography.Text className="text-[16px]">{id}</Typography.Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: string) => (
        <Typography.Text className="text-[16px]">{name}</Typography.Text>
      ),
    },
    {
      title: "PriceBase",
      dataIndex: "priceBase",
      render: (priceBase: string) => (
        <Typography.Text className="text-[16px]">{priceBase}</Typography.Text>
      ),
      width: 110,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock: number) => (
        <Typography.Text className="text-[16px]">{stock}</Typography.Text>
      ),
      width: 80,
    },
    {
      title: "DiscountPercentage",
      dataIndex: "discountPercentage",
      render: (discountPercentage: number) => (
        <Typography.Text className="text-[16px]">
          {discountPercentage}
        </Typography.Text>
      ),
      width: 180,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (e: DataType) => (
        <Space className="gap-4">
          <Link to={`/product-list/edit/${e.urlName}`}>
            <Button type="primary" icon={<EditOutlined />} size="large">
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Delete"
            description={`You are sure delete "${e.name}" ?`}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => setIdDelete(e.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource: any[] = searchResults?.map((t) => {
    return {
      key: t.id,
      id: t.id,
      name: t.name,
      picture: t.picture,
      priceBase: t.basePrice,
      stock: t.stock,
      urlName: t.urlName,
      discountPercentage: t.discountPercentage,
    };
  });

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await AxiosJWTInstance({ user, dispath })({
      url: `/product/picture/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: formData,
    })
      .then(async () => {
        setModalOpen(false);
        setFileReview("");
        toast.success("Change image successfully");
        await AxiosJWTInstance({ user, dispath })({
          method: "GET",
          url: `/product`,
          headers: {
            Authorization: `Berear ${user?.accessToken}`,
          },
        })
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleChangeInputSearch = useDebouncedCallback(async () => {
    const res = await AxiosJWTInstance({ user, dispath })({
      method: "GET",
      url: `/product?productName=${q}&page=1&offset=10`,
      headers: {
        Authorization: `Berear ${user?.accessToken}`,
      },
    });
    if (res.data.length > 0) {
      setSearchResults(res.data);
      toast.info("results found!");
    } else {
      setSearchResults([]);
      toast.info("No results found!");
    }
  }, 1000);

  useEffect(() => {
    (async () => {
      await AxiosJWTInstance({ user, dispath })({
        method: "GET",
        url: `/product?page=${page}&offset=5`,
        headers: {
          Authorization: `Berear ${user?.accessToken}`,
        },
      })
        .then((response) => {
          setSearchResults([...searchResults, ...response.data]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    })();
  }, [page]);

  useEffect(() => {
    setSearchResults(products);
  }, [products]);
  useEffect(() => {
    dispath(fetchProduct());
  }, []);
  return (
    <>
      <Helmet title="Product-list">
        <></>
      </Helmet>
      <div className="py-[20px] px-[30px]">
        <h1 className="text-[32px] font-semibold">Product List</h1>
        <Space direction="horizontal" className="py-[20px] flex flex-row gap-5">
          <Space className="gap-5">
            <form>
              <Input.Search
                className="flex py-[20px]"
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
            <Link to="create">
              <Button type="primary" className="bg-blue-500" size="large">
                Create Product
              </Button>
            </Link>
          </Space>
        </Space>
        <div className="py-[25px]">
          <InfiniteScroll
            loader={<p className="text-[16px]">Loading...</p>}
            fetchMore={() => setPage((prev) => prev + 1)}
            hasMore={searchResults.length < 19}
            endMessage={<p>You have seen it all</p>}
          >
            <TableList columns={columns} dataSource={dataSource} />
          </InfiniteScroll>
        </div>
        <Modal
          title="Change Picture of product"
          centered
          open={modalOpen}
          okText="Upload"
          onOk={onUpload}
          onCancel={() => {
            setModalOpen(false);
          }}
        >
          <Input
            type="file"
            onChange={(e) => {
              const FileList: any = e.target.files;
              if (FileList) {
                const Blob = URL.createObjectURL(FileList[0]);
                setFileReview(Blob);
                setFile(FileList[0]);
              }
            }}
          />
          {fileReview && <img src={fileReview} />}
        </Modal>
      </div>
    </>
  );
};

export default ProductList;
