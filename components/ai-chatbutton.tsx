"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { BotIcon } from 'lucide-react'
import ChatBot from './chat-bot'

const AIChatButton = () => {
    const [open,setOpen]=useState(false)
  return (
    <>
    <Button onClick={()=>setOpen(true)}>
        <BotIcon size={20} className='mr-2'/>
        Chat with AI
    </Button>
    <ChatBot open={open} onClose={()=>setOpen(false )}/>
    </>
  )
}

export default AIChatButton