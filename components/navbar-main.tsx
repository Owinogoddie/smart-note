import Logo from '@/components/logo'
import SignedIn from '@/components/signed-in'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
  return (
    <div className="p-4 shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo/>
        <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl='/'
        appearance={
            {elements:{
                avatarBox:{
                    width:"2.5rem",height:"2.5rem"
                }
            }}
        }
        />
        <ThemeToggle/>
        <SignedIn/>
        </div>
        </div>
    </div>
  )
}

export default Navbar