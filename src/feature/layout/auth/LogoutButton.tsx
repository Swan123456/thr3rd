"use client";

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { useTransition } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem 
      onClick={() => {
        startTransition(() => signOut())
    }}>
      {isPending ? (
        <Loader className='mr-2 h-4 w-4' />
      ) : (
        <LogOut className='mr-2 h-4 w-4' />
      )}
      Logout
    </DropdownMenuItem>
  );
};
