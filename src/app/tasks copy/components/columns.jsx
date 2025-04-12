'use client';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels, priorities, types, statuses } from '../data/data';
// import { Task } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import DataTableRowActions from './data-table-row-actions';

export const columns = (onDelete) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="hidden translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="hidden translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Request ID"
        className={'hidden'}
      />
    ),
    cell: ({ row }) => (
      <div className="hidden w-[80px]">{row.getValue('id')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'modifiedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified By" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('modifiedBy')}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'type',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Type" />
  //   ),
  //   cell: ({ row }) => {
  //     const type = types.find(
  //       (type) => type.value == row.getValue('type')
  //     );

  //     if (!type) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[150px] items-center font-medium">
  //         {/* {type.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )} */}
  //         <span>{type.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: 'previousHash',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Previous Hash" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('previousHash') == null
              ? 'N/A'
              : row.getValue('previousHash')}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  //   cell: ({ row }) => {
  //     const label = labels.find(
  //       (label) => label.value === row.original.label
  //     );

  //     return (
  //       <div className="flex space-x-2">
  //         {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
  //         <span className="max-w-[200px] truncate font-medium">
  //           {row.getValue('email')}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'hash',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hash" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('hash')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label
      );
      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {format(row.getValue('timestamp'), 'yyyy-MM-dd HH:mm:ss')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let status = statuses.find(
        (status) => status.value === row.getValue('status')
      );
      if (status?.value == 'Created') status.label = 'Pending';

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <Badge
            variant={`${
              status.label == 'Approved'
                ? 'default'
                : status.label == 'Processing'
                ? 'secondary'
                : 'outline'
            }`}
          >
            {status.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'hashingTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hashing Time" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[200px] truncate font-medium">
            {row
              .getValue('hashingTime')
              .split('')
              .map((c, i) => (i < 7 ? c : null))}{' '}
            ms
          </span>
        </div>
      );
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => (
  //     <DataTableRowActions row={row} onDelete={onDelete} />
  //   ),
  // },
];
