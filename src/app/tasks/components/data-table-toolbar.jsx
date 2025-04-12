'use client';

// import { Table } from '@tanstack/react-table';
import { X, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableViewOptions } from '@/app/tasks/components/data-table-view-options';

import { priorities, types, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
// }

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import axios from '../../../api/axios';
const DELETE_ALL_REQUEST_URL = '/request/deleteall';

export default function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const deleteAllRequest = async () => {
    try {
      const response = await axios.delete(DELETE_ALL_REQUEST_URL);
      const data = response.data;

      if (response.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter requests..."
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table
              .getColumn('name')
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="Type"
            options={types}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="ml-2">
            <Trash2 />
            Delete all
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently
              delete all document requests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAllRequest}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
