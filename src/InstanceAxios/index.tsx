import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Token } from "../type";
import { signInSuccess } from "../redux/slice/authSlice";

export const refreshToken = async ({ refreshToken }: { refreshToken: any }) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/refresh",
      data: { refreshToken },
    });
    return res.data;
  } catch (e) {
    console.log("Refresh not match!. Please seen refreshToken");
  }
};
export const AxiosJWTInstance = ({
  user,
  dispath,
}: {
  user: any;
  dispath: any;
}) => {
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeJWT: any = jwtDecode(user?.accessToken as string);
      if (decodeJWT.exp < date.getTime() / 1000) {
        const data: Token = await refreshToken({
          refreshToken: user?.refreshToken as string,
        });
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispath(signInSuccess(refreshUser));

        config.headers["Authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (e) => {
      return Promise.reject(e);
    }
  );
  return axiosJWT;
};

export default AxiosJWTInstance;
