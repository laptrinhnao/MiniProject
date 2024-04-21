import { SiderTheme } from "antd/es/layout/Sider";

export interface ThemeContextProp {
  themeContext: SiderTheme;
  setTheme: (theme: SiderTheme) => void;
}

export interface ProductProps {
  id: string;
  name: string;
  urlName: string;
  picture: string;
  basePrice: string;
  discountPercentage: number;
  stock: number;
  categories: Category[];
  description: string;
}
export type ProductSliceProps = {
  productArr: ProductProps[];
  status: boolean;
};

export interface DataType {
  key: React.Key;
  id: string;
  name: string;
  urlName: string;
  picture: string;
  basePrice: string;
  stock: number;
  discountPercentage: number;
}

export interface DataTypeCategory {
  key: React.Key;
  id: string;
  name: string;
}
export type CategorySliceProps = {
  categoryArr: Category[];
  status: boolean;
};
export interface IFormInput {
  name: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}
export interface DataTypeContact {
  key: React.Key;
  id: number;
  name: string;
  email: string;
  phone: string;
}
//
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export enum Role {
  USER,
  ADMIN,
}

interface currentUserProps {
  user?: User | undefined;
  accessToken: string;
  refreshToken: string;
}
export interface PropLogin {
  currentUser: currentUserProps | undefined;
  isFetching: boolean;
  error: boolean;
}

export interface PropLogOut {
  isFetching: boolean;
  error: boolean;
}
export interface Token {
  accessToken: string;
  refreshToken: string;
}
