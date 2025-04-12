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
import RequestHistory from '@/app/tasks copy/page';
import MailPage from '@/app/message/page';

import CryptoJS from 'crypto-js';

import axios from '../../api/axios';
import { useEffect, useState } from 'react';
const REQUEST_URL = '/request/history';

export default function Page() {
  const [requests, setRequests] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  useEffect(() => {
    const fetchAllRequest = async () => {
      try {
        const response = await axios.get(REQUEST_URL);
        const data = response.data;

        setRequests(data);
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
                    <BreadcrumbPage>Messages</BreadcrumbPage>
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
          <Card>
            <MailPage />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
