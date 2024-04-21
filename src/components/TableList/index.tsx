import { Table, TableColumnsType } from "antd";
import { DataType } from "../../type";

const TableList = ({
  dataSource,
  columns,
}: {
  dataSource: DataType[];
  columns: TableColumnsType<DataType>;
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }}
      className="shadow-lg rounded mt-4 "
    />
  );
};

export default TableList;
