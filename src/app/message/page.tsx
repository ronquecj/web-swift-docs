// import { cookies } from 'next/headers';
// import Image from 'next/image';

import { Mail } from '@/app/message/components/mail';
import { accounts, mails } from '@/app/message/data';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
const MESSAGE_URL = 'message';

export default function MailPage() {
  // const layout = cookies().get('react-resizable-panels:layout:mail');
  // const collapsed = cookies().get('react-resizable-panels:collapsed');

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed
  //   ? JSON.parse(collapsed.value)
  //   : undefined;

  const [messages, setMessages] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  )?.user;
  const { _id, username } = currentUser;
  const userModel = 'SuperAdmin';

  console.log('messages: ', messages);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await axios.get(
          `${MESSAGE_URL}/users?userId=${_id}&userModel=${userModel}`
        );
        let data = response.data;
        data = data.sort(
          (a, b) =>
            new Date(b.latestMessage?.createdAt).getTime() -
            new Date(a.latestMessage?.createdAt).getTime()
        );

        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllMessages();
  }, []);

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        /> */}
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={username}
          mails={messages}
          // defaultLayout={defaultLayout}
          // defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
