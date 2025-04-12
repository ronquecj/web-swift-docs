import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import RequestList from '@/app/tasks/page';

import CryptoJS from 'crypto-js';

import axios from '../../api/axios';
import { useEffect, useState } from 'react';
const REQUEST_URL = '/request';

export default function Page() {
  const [requests, setRequests] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const totalRequest = requests.length;
  const totalCompletedTasks = requests.filter(
    (request) => request.status === 'Approved'
  ).length;
  const totalPendingRequests = requests.filter(
    (request) => request.status === 'Pending'
  ).length;

  useEffect(() => {
    const fetchAllRequest = async () => {
      try {
        const response = await axios.get(REQUEST_URL);
        const data = response.data;
        const SECRET_KEY = 'testkey';

        const decryptedRequests = data.map((request) => {
          return {
            ...request,
            type: CryptoJS.AES.decrypt(
              request.type,
              SECRET_KEY
            ).toString(CryptoJS.enc.Utf8),
            date: CryptoJS.AES.decrypt(
              request.date,
              SECRET_KEY
            ).toString(CryptoJS.enc.Utf8),
            purpose: CryptoJS.AES.decrypt(
              request.purpose,
              SECRET_KEY
            ).toString(CryptoJS.enc.Utf8),
          };
        });

        setRequests(decryptedRequests);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllRequest();
  }, [deleteTrigger]);

  const handleDeleteInDashboard = (id) => {
    setDeleteTrigger((prev) => !prev);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex w-full justify-between items-center gap-2 px-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Request List</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ThemeProvider
              defaultTheme="light"
              storageKey="vite-ui-theme"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Request
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M2 15h10" />
                  <path d="m9 18 3-3-3-3" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalRequest}
                </div>
                <p className="text-xs text-muted-foreground">
                  Count of all submitted inquiries.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Request
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="m3 15 2 2 4-4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalCompletedTasks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully fulfilled inquiries.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Request
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M13.228 21.925A10 10 0 1 1 21.994 12.338" />
                  <path d="M12 6v6l1.562.781" />
                  <path d="m14 18 4-4 4 4" />
                  <path d="M18 22v-8" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalPendingRequests}
                </div>
                <p className="text-xs text-muted-foreground">
                  Inquiries awaiting action or resolution.
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <RequestList
              data={requests}
              onDelete={handleDeleteInDashboard}
            />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
