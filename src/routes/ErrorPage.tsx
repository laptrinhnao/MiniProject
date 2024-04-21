import { Button, Typography } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError() as any;
  const navigate = useNavigate();
  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-3/6"
    >
      <h1 className="text-[40px] font-bold block">404!</h1>
      <div className="block text-[32px] font-semibold">
        Sorry, an unexpected error has occurred.
      </div>
      <Typography.Text className="text-[20px]">
        <i>{error.statusText || error.message}</i>
      </Typography.Text>
      <Button
        type="primary"
        className="bg-blue-500 my-[15px]"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}
