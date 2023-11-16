import prisma from '@/lib/db/prisma'
import { auth } from '@clerk/nextjs'
import {Metadata} from 'next'
import { redirect } from 'next/navigation'
import Note from '../_components/note'

export const metadata:Metadata = {
    title:"AI-Scribe-notes"

}
const NotesPage = async () => {
  const {userId}=auth()
  if(!userId){
    return redirect("/")
  }
  const allNotes=await prisma.note.findMany({
    where:{
      userId
    }
  })


  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {allNotes.map(note => (
      <Note key={note.id} note={note} />
    ))}
    {
      allNotes.length===0 && (
        <div className='col-span-full text-center font-muted-foreground'>
          <p>You do not have notes.Why don't you create one?</p>
        </div>
      )
    }
  </div>

  )
}

export default NotesPage