import React from 'react'
import Navbar from './_components/navbar'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const NotesLyout = ({children}:{children:React.ReactNode}) => {

  const {userId}=auth()
  if(!userId){
    return redirect("/")
  }
  return (
    <>
    <Navbar/>
    <main className="mx-auto p-4 max-w-7xl">{children}</main>
    </>
  )
}

export default NotesLyout