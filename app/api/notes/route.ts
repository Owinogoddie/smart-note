import { metadata } from './../../(notes)/notes/page';
import prisma from "@/lib/db/prisma"
import { getEmbedding } from "@/lib/openai"
import { notesIndex } from "@/lib/pinecone"
import {deleteNoteSchema, noteSchema, updateNoteSchema} from "@/lib/validation/note"
import { auth } from "@clerk/nextjs"
export async function POST(req:Request){
    try {
        const body=await req.json()
        // console.log(auth().userId)


        const parseResult=noteSchema.safeParse(body)
        if(!parseResult.success){
            console.log(parseResult.error)
            return Response.json({error:"Invalid Input"},{status:400})
        }

        const {title,content}=parseResult.data
        const {userId}=auth()
        if(!userId){
            return Response.json({error:"Not authorized"},{status:401})
        }
        const embedding=await getNoteEmbedding(title,content)
        console.log(embedding)
        const note = await prisma.$transaction(async (tx) => {
            const createdNote = await tx.note.create({
              data: {
                title,
                content,
                userId,
              },
            });

            await notesIndex.upsert([
              {
                id: createdNote.id,
                values: embedding,
                metadata: { userId },
              },
            ]);

            return createdNote;
          });
        return Response.json({note},{status:201})

    } catch (error) {
        console.error(error)
        return Response.json({error:"internal server Error"},{status:500})
    }
}

// update note
export async function PUT(req:Request) {
    try {
        const body=await req.json()


        const parseResult=updateNoteSchema.safeParse(body)
        if(!parseResult.success){
            console.log("error "+parseResult.error)
            return Response.json({error:"Invalid Input"},{status:400})
        }

        const {id,title,content}=parseResult.data

        // console.log(id,title,content)

        const note=await prisma.note.findUnique({
            where:{
                id
            }
        })

        if(!note){
            return Response.json({error:"Not found"},{status:404})

        }

        const {userId}=auth()
        if(!userId || userId!==note.userId){
            return Response.json({error:"Not authorized"},{status:401})
        }
        const embedding=await getNoteEmbedding(title,content)
        const updatedNote=await prisma.$transaction(async(tx)=>{

            const updatedNote=await prisma.note.update({
                where:{
                    id
                },
                data:{
                    title,
                    content
                }
            })

            await notesIndex.upsert([
                {
                  id,
                  values:embedding,
                  metadata:{userId}
                }
              ])
              return updatedNote
        })
        return Response.json({updatedNote},{status:201})

    } catch (error) {
        console.error(error)
        return Response.json({error:"internal server Error"},{status:500})
    }

}
export async function DELETE(req:Request) {
    try {
        const body=await req.json()
        console.log(auth().userId)

        const parseResult=deleteNoteSchema.safeParse(body)
        if(!parseResult.success){
            console.log(parseResult.error)
            return Response.json({error:"Invalid Input"},{status:400})
        }

        const {id}=parseResult.data


        const note=await prisma.note.findUnique({
            where:{
                id
            }
        })

        if(!note){
            return Response.json({error:"Not found"},{status:404})

        }
        const {userId}=auth()
        if(!userId || userId!==note.userId){
            return Response.json({error:"Not authorized"},{status:401})
        }
        const deletedNote=await prisma.$transaction(async(tx)=>{

            const updatedNote=await tx.note.delete({
                where:{
                    id
                }
            });
            await notesIndex._deleteOne(id)
        })
        return Response.json({message:"note deleted"},{status:201})

    } catch (error) {
        console.error(error)
        return Response.json({error:"internal server Error"},{status:500})
    }

}


async function getNoteEmbedding(title:string,content:string|undefined){
    return getEmbedding(title + "\n\n" +content ?? "")
}