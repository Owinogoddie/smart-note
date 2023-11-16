"use client"
import AddEditDialog from '@/components/Add-edit-dialog'
import Logo from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { PlusCircleIcon, PlusIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import {dark} from "@clerk/themes"
import AIChatButton from '@/components/ai-chatbutton'

const Navbar = () => {
    const theme=useTheme()
    const [showNoteDialog,setShowNoteDialog]=useState(false)
  return (
    <>
    <div className="p-4 shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo/>
        <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl='/'
        appearance={
            {
                elements:{
                avatarBox:{
                    width:"2.5rem",height:"2.5rem"
                }
            }}
        }
        />
        <ThemeToggle/>
        <Button onClick={()=>setShowNoteDialog(true)}>
            <PlusCircleIcon className='h-4 w-4 mr-2'/>
            Add Note
        </Button>
        <AIChatButton/>
        </div>
        </div>
    </div>
    <AddEditDialog open={showNoteDialog} setOpen={setShowNoteDialog}/>
    </>
  )
}

export default Navbar