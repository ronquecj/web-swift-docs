'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: string;
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
}: AccountSwitcherProps) {
  // const [selectedAccount, setSelectedAccount] =
  //   React.useState<string>(accounts[0].email);

  return (
    <Select defaultValue={accounts}>
      <SelectTrigger
        className={cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
          isCollapsed &&
            'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <span className={cn('ml-2', isCollapsed && 'hidden')}>
            {accounts}
          </span>
        </SelectValue>
      </SelectTrigger>
    </Select>
  );
}
