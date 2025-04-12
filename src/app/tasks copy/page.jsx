import { columns } from './components/columns';
import DataTable from './components/data-table';
import { UserNav } from './components/user-nav';
import { useEffect, useState } from 'react';
// import { taskSchema } from './data/schema';

// export const metadata = {
//   title: 'Tasks',
//   description: 'A task and issue tracker build using Tanstack Table.',
// };

export default function RequestHistory({ data, onDelete }) {
  const [tableData, setTableData] = useState(data);

  const [history, setHistory] = useState([]);
  console.log(
    'asdasdasdasd',
    history.flatMap((h) => h.history)
  );
  useEffect(() => {
    if (data?.history) {
      setHistory(data.history);
    }
  }, [data]);
  const handleDelete = async (id) => {
    try {
      const updatedData = tableData.filter((item) => item.id !== id);
      setTableData(updatedData);

      onDelete(id);
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              History
            </h2>
            <p className="text-muted-foreground">
              Track document requests with their unique hashes for
              transparency and security!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columns(handleDelete)}
            data={history.flatMap((h) => h.history)}
          />
        </div>
      </div>
    </>
  );
}
