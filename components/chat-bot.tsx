"use client"
import React, { useEffect } from 'react'
import {useChat} from 'ai/react'
import { cn } from '@/lib/utils'
import { Bot, Trash2, XCircle } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Message } from 'ai'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
interface ChatBotProps {
    open:boolean,
    onClose:()=>void
}

const ChatBot = ({open,onClose}:ChatBotProps) => {
    const { messages,setMessages, input, handleInputChange, handleSubmit,isLoading,error } = useChat();

    const inputref=React.useRef<HTMLInputElement>(null)
    const scrollRef=React.useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTop=scrollRef.current.scrollHeight
        }
    },[messages]);
    // focus on inputre automatically
    useEffect(()=>{
        if(open && inputref.current){
            inputref?.current.focus()
        }
    })

    const lastMessageIsuser=messages[messages.length-1]?.role==="user"
  return (
    <div className={cn("absolute bottom-10 right-0 p-4 w-full max-w-[500px] xl:right-16", open ? "fixed" : "hidden")}>
        <button onClick={onClose} className="mb-1 ms-auto block">
            <XCircle className="h-6 w-6" />
        </button>
        <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
            <div className="h-full">
                <div className="h-full overflow-y-auto p-x-3" ref={scrollRef}>
                    {messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            message={message}
                        />
                    ))}
                    {isLoading && lastMessageIsuser && (
                       <ChatMessage
                       message={
                           {
                               role:"assistant",
                               content:"Thinking..."
                           }
                       }

                       />

                    )}
                    {
                        error &&(
                            <ChatMessage
                       message={
                           {
                               role:"assistant",
                               content:"Something happened Try again"
                           }
                       }

                       />
                        )
                    }

                    {
                        !error && messages.length==0 &&(
                          <div className='flex h-full gap-3 justify-center items-center font-muted-foreground'>
                            <Bot/>
                            Ask the AI a question about your notes
                          </div>

                        )
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex m-3 gap-2'>
                {/* nutton to clear chat */}
                <Button
                onClick={() => {
                    setMessages([]);
                }}

                title='Clear Chat'
                variant='outline'
                type='button'
                size="icon"
                >
                    <Trash2 className="h-6 w-6" />
                </Button>
                <Input
                value={input}
                onChange={handleInputChange}
                placeholder='say something'
                ref={inputref}
                />
        <Button type="submit">Send</Button>
      </form>
        </div>


    </div>
  )
}

export default ChatBot

function ChatMessage({message:{role,content}}:{message:Pick<Message,"role"|"content">}) {
    const {user}=useUser()
    const isAIMessage=role==="assistant"
    return (
        <div className={cn("mb-4 flex items-center p-4", isAIMessage ? "me-5 justify-start" : "justify-end ms-5")}>
            {
                isAIMessage && (
                    <Bot className="h-6 w-6 shrink-0 mr-2" />
                )
            }
            <p className={cn("whitespace-pre-line rounded-md px-3 border py-2", isAIMessage ? " bg-background text-muted-foreground" : "text-primary bg-primary text-white dark:text-black")}>
                {content}

            </p>
            {
                !isAIMessage && (
                    user?.imageUrl && (
                        <Image
                            src={user?.imageUrl}
                            alt="user image"
                            width={40}
                            height={40}
                            className=" ml-2 rounded-full"
                        />
                    )
                )
            }
        </div>
    )
}