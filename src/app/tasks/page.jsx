import { columns } from './components/columns';
import DataTable from './components/data-table';
import { UserNav } from './components/user-nav';
import { useState } from 'react';
// import { taskSchema } from './data/schema';

// export const metadata = {
//   title: 'Tasks',
//   description: 'A task and issue tracker build using Tanstack Table.',
// };

export default function RequestList({ data, onDelete }) {
  const [tableData, setTableData] = useState(data);

  const formattedData = data?.map((item) => ({
    id: item._id,
    name: `${item.userData.firstName} ${item.userData.lastName}`,
    type: item.type,
    purpose: item.purpose,
    email: item.userData.email,
    phoneNumber: item.userData.phoneNumber,
    status: item.status,
  }));

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
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of requests from our barangay!
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columns(handleDelete)}
            data={formattedData}
          />
        </div>
      </div>
    </>
  );
}
