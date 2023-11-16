import { noteSchema } from '@/lib/validation/note';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'

import { useForm } from "react-hook-form"
import * as z from 'zod'
import {DialogTitle, Dialog, DialogContent, DialogHeader, DialogFooter } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useRouter } from 'next/navigation';
import { Note } from '@prisma/client';
import { Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface DialogProps{
    open:boolean;
    setOpen:(open:boolean)=>void;
    note?:Note
}
const AddEditDialog = ({open,setOpen,note}:DialogProps) => {
    const [deleting,setDeleting]=useState(false)
    const router = useRouter();

  const form=useForm<z.infer<typeof noteSchema>>({
    resolver:zodResolver(noteSchema),
    defaultValues:{
        title:note?.title ||"",
        content:note?.content||""
    }
  })
  async function onSubmit(values: z.infer<typeof noteSchema>) {
try {

    if(note){
        const res=await fetch("/api/notes",{
            method:"PUT",
            body:JSON.stringify({
                id:note.id,
                ...values
            })
        })
        if(!res.ok){
            throw Error("status code:" +res.status)
        }
        toast.success("note updated")
        form.reset()
        router.refresh()
        setOpen(false)
    }
else{
    const res=await fetch("/api/notes",{
        method:"POST",
        body:JSON.stringify(values)
    })
    if(!res.ok){
        throw Error("status code:" +res.status)
    }
    toast.success("note added")
    form.reset()
    router.refresh()
    setOpen(false)
}

} catch (error) {
    console.error(error)
    toast.error("something happened try again")

}
  }
 const loading=form.formState.isSubmitting

 const deleteNote=async()=>{
    setDeleting(true)
    if(!note) return
     try {
        const response=await fetch('/api/notes',{
            method:"DELETE",
            body:JSON.stringify({id:note?.id})
         })
         if(!response.ok){
            throw new Error("status code "+ response.status)

         }

         toast.success("note deleted")
    router.refresh()
    setOpen(false)

     } catch (error) {
        console.error(error)
        toast.error("something happened try again")


     }
     finally{
        setDeleting(false)
     }
 }
    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <center>
                <DialogTitle>{note?"Edit Note":"Add Note"} </DialogTitle>
                </center>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                    control={form.control}
                    name='title'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Note Title</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter title' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='content'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Note Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Enter Content' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <DialogFooter className='gap-4 md:gap-0'>
                    <Button type='submit'
                    disabled={loading}
                   >
                     {loading && (
                        <Loader className="text-muted-foreground animate-spin h-4 w-4" />
                    )}
                    {/* {loading?"submitting":"submit"} */}
                    {loading ? (note? "Editting":"Adding"):note? "Edit Note": "Add Note"}
                    </Button>

                    {note && (
                        <Button variant="destructive"
                        disabled={deleting}
                        onClick={deleteNote}
                        >
                            {deleting && (
                                <Loader className="text-white animate-spin h-4 w-4" />
                            )}
                            {deleting?"deleting":"delete"}
                        </Button>
                    )}
                    </DialogFooter>
                </form>

            </Form>
        </DialogContent>

    </Dialog>
  )
}

export default AddEditDialog