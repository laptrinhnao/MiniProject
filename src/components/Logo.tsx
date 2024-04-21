import { Avatar, Typography } from "antd";

const Logo = () => {
  return (
    <div className="flex flex-row justify-center">
      <Typography.Text strong>
        <Avatar
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712865600&semt=sph"
          size={"large"}
          style={{ height: 80, width: 80 }}
        />
      </Typography.Text>
    </div>
  );
};

export default Logo;
