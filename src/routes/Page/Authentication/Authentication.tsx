import Helmet from "@/components/Helmet";
import Wrapper from "@/components/Wrapper";
import imgAuthen from "@/assets/image/authentication.png";
import AuthForm from "./AuthForm";

const Authentication = () => {
  return (
    <Wrapper className="authentication h-full">
      <Helmet title="Authen">
        <></>
      </Helmet>
      <div className="h-full grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AuthForm />
        <Wrapper className="authentication-img flex justify-end items-center">
          <img src={`${imgAuthen}`} alt="Quản lý xếp hàng" />
        </Wrapper>
        <Wrapper className="authentication-content flex justify-center flex-col">
          <h3 className="text-[35px] text-green-500 italic font-semibold">
            Hệ thống
          </h3>
          <h2 className="text-[50px] text-orange-500 italic font-bold">
            Quản lý
          </h2>
        </Wrapper>
      </div>
    </Wrapper>
  );
};

export default Authentication;
