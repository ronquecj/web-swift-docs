import type { ComponentProps } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { cn } from '@/lib/utils';
import type { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Mail } from '@/app/message/data';
import { useMail } from '@/app/message/use-mail';

interface MailListProps {
  items: Mail[];
}
const MESSAGE_URL = 'message';

export function MailList({ items }) {
  const [mail, setMail] = useMail();

  if (items.length === 1 && items.latestMessage == null) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No messages found
      </div>
    );
  }
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map(
          (item) =>
            item.latestMessage && (
              <button
                key={item._id}
                className={cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                  // mail.selected === item.id && 'bg-muted'
                )}
                onClick={() => {
                  setMail((prevMail) => ({
                    ...prevMail,
                    selected: item._id,
                  }));
                }}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        {item.username
                          ? item.username
                              .split('')
                              .map((c, i) =>
                                i == 0 ? c.toUpperCase() : c
                              )
                          : `${item.firstName} ${item.lastName}`}
                      </div>
                      {/* {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )} */}
                    </div>
                    <div
                      className={cn(
                        'ml-auto text-xs'
                        // mail.selected === item.id
                        //   ? 'text-foreground'
                        //   : 'text-muted-foreground'
                      )}
                    >
                      {formatDistanceToNow(
                        new Date(item.latestMessage.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </div>
                  </div>
                  {/* <div className="text-xs font-medium">
                  {item.item._id}
                </div> */}
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {item.latestMessage.text.substring(0, 300)}
                </div>
                {/* {item.labels.length ? (
                <div className="flex items-center gap-2">
                  {item.labels.map((label) => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null} */}
              </button>
            )
        )}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}
