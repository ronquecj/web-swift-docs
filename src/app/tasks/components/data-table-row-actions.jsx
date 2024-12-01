'use client';
/* eslint-disable react/prop-types */

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import { labels } from '../data/data';
import { useState } from 'react';

import axios from '../../../api/axios';
const MARK_URL = 'request/mark/';
const DELETE_URL = 'request/delete/';
// import { taskSchema } from '../data/schema';

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }

export default function DataTableRowActions({ row, onDelete }) {
  const [state, setState] = useState(false);
  // const task = taskSchema.parse(row.original);
  const task = [];

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // onError(false);
      const response = await axios.delete(
        `${DELETE_URL}${row.original.id}`
      );

      if (response.status === 200) {
        console.log('goods');
        onDelete(row.original.id);
      }
    } catch (err) {
      console.log(err);
      // onError(true);
      // onErrorMessage(err.response?.data?.msg);
    }
  };

  const handleMark = async (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    try {
      const response = await axios.post(MARK_URL, {
        id: row.original.id,
        status: e.target.innerText,
      });

      if (response.status === 200) {
        onDelete(row.original.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Mark as</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={handleMark}
                  className="pl-2"
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
