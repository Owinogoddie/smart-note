import { z } from "zod";

export const noteSchema=z.object({
    title:z.string().min(2,{
        message:"Title is required"
    }),
    content:z.string().optional(),
})

export const updateNoteSchema=noteSchema.extend({
    id:z.string().min(1)
})

export const deleteNoteSchema=z.object({
    id:z.string().min(1)
})

export type NoteSchema=z.infer<typeof noteSchema>