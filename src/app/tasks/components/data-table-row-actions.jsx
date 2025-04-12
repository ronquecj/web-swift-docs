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

import { labels } from '../data/data';
import { useEffect, useState } from 'react';

import axios from '../../../api/axios';
const MARK_URL = 'request/mark/';
const DELETE_URL = 'request/delete/';
const SEND_MESSAGE_URL = 'message/send/';
// import { taskSchema } from '../data/schema';

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }

export default function DataTableRowActions({ row, onDelete }) {
  const [state, setState] = useState(false);
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  // const task = taskSchema.parse(row.original);
  const task = [];

  const filteredRequests = requests.filter(
    (req) => req._id === row.original.id
  );

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  )?.user;
  const { _id, username } = currentUser;

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // onError(false);
      const response = await axios.delete(
        `${DELETE_URL}${row.original.id}`
      );

      if (response.status === 200) {
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
    let s = 'Pending';

    try {
      if (e.target.innerText == 'Processing') {
        s = 'Processing';

        const response = await axios.post(
          `${SEND_MESSAGE_URL}${filteredRequests[0].userData._id}`,
          {
            text: 'Your request has been processed. Kindly check your email.',
            senderId: _id,
            senderModel: 'SuperAdmin',
            receiverModel: 'User',
          }
        );

        console.log(response.data);
      }
      const response = await axios.post(MARK_URL, {
        id: row.original.id,
        status: s,
        modifiedBy: username,
      });

      if (response.status === 200) {
        onDelete(row.original.id);
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('request');
        const data = response.data;
        setRequests(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

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
                <AlertDialog key={label.value}>
                  <DropdownMenuRadioItem
                    key={label.value}
                    value={label.value}
                    onClick={handleMark}
                    className="pl-2"
                  >
                    <AlertDialogTrigger>
                      {label.label}
                    </AlertDialogTrigger>
                  </DropdownMenuRadioItem>
                  {label.label == 'Processing' && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Processing Document...
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {`Hang tight! We're processing the document, patching the Word file, and updating the request status to 'Processing'. An email is on its way...`}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className={'hidden'}>
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
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
