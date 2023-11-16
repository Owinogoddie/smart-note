"use client"
import AddEditDialog from '@/components/Add-edit-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Note as NoteModel } from '@prisma/client'
import React, { useState } from 'react'

interface NoteProps{
    note:NoteModel
}
const Note = ({note}:NoteProps) => {

    const [showeditDialog,setShoweditDialog]=useState(false)

    const wasUpdated=note.updatedAt > note.createdAt
    const createdUpdatedAtTimestamp=(
        wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString()
  return (

<>
    <Card className='cursor-pointer hover:shadow-lg transition-shadow' onClick={()=>setShoweditDialog(true)}>
        <CardHeader>
            <CardTitle>{note.title}</CardTitle>
        <CardDescription>
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (updated)"}
        </CardDescription>
        </CardHeader>
        <CardContent>
            <p className='whitespace-pre-line'>{note.content}</p>
        </CardContent>
    </Card>
    <AddEditDialog note={note} open={showeditDialog} setOpen={setShoweditDialog}/>
</>
  )
}

export default Note