import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MailDisplayProps {
  mail: any | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  if (!mail) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No message selected
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        {/* <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Separator /> */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage
                  alt={
                    mail.username ||
                    `${mail.firstName} ${mail.lastName}`
                  }
                />
                <AvatarFallback>
                  {mail.username
                    ? mail.username[0]
                    : `${mail.firstName[0]}${mail.lastName[0]}`}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">
                  {mail.username
                    ? mail?.username
                        .split('')
                        .map((c, i) => (i == 0 ? c.toUpperCase() : c))
                    : `${mail.firstName} ${mail.lastName}`}
                </div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To: </span>
                  {mail.username || `${mail.email}`}
                </div>
              </div>
            </div>
            {mail.latestMessage?.createdAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(
                  new Date(mail.latestMessage.createdAt),
                  'PPpp'
                )}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.latestMessage?.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply to ${
                    mail.username ||
                    `${mail.firstName} ${mail.lastName}`
                  }...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
