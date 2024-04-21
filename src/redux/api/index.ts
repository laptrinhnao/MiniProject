import AxiosJWTInstance from "@/InstanceAxios";
import { Token } from "@/type";
import axios from "axios";
import { toast } from "react-toastify";
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../slice/authSlice";

export async function getProductByName({ name }: { name: string }) {
  return await axios(`/product/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data);
}
export async function getCategoryByName({ name }: { name: string }) {
  return await axios(`/category/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data);
}
export const signInUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(signInStart());
  try {
    const res: any = await axios({
      method: "POST",
      data: user,
      url: "/login",
    });
    if (!res) {
      toast.info("Token doesn't exist!");
    }
    const userRes = await GetUserWithToken({ token: res.data });

    dispatch(
      signInSuccess({
        user: userRes.data,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      })
    );
    navigate("/");
    toast.success("Login successfully!");
  } catch (e) {
    toast.error("Username or password is incorrect!");
    dispatch(signInFailure());
  }
};

export const signOut = async (dispath: any, navigate: any, user: any) => {
  dispath(logOutStart());
  try {
    await AxiosJWTInstance({ user, dispath })({
      method: "POST",
      url: "/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      data: { refreshToken: user.refreshToken },
    });
    navigate("/auth/login");
    dispath(logOutSuccess());
    toast.success("Logout successfully!");
  } catch (e) {
    dispath(logOutFailure());
  }
};

export const GetUserWithToken = async ({ token }: { token: Token }) => {
  try {
    const res: any = await axios({
      method: "GET",
      url: "/user",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    return res;
  } catch (e) {
    toast.error("Token not match!");
  }
};

export const getCategory = async ({
  accessToken,
  page = 1,
  offset = 10,
}: {
  accessToken: string;
  page?: number;
  offset?: number;
}) => {
  return await axios(`/category?page=${page}&offset=${offset}`, {
    method: "GET",
    headers: {
      Authorization: `Berear ${accessToken}`,
    },
  }).then((data) => data);
};
