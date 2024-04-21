import { Table, TableColumnsType } from "antd";
import { DataTypeCategory } from "../../type";

const TableList = ({
  dataSource,
  columns,
}: {
  dataSource: DataTypeCategory[];
  columns: TableColumnsType<DataTypeCategory>;
}) => {
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default TableList;
