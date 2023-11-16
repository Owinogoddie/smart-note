// app/api/chat/route.ts

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import { getEmbedding } from '@/lib/openai';
import { notesIndex } from '@/lib/pinecone';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/db/prisma';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
// export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type ChatCompletionMessage = {
  role: 'system' | 'assistant';
  content: string;
};
export async function POST(req: Request) {
    const body =await req.json()
    const messages:ChatCompletionMessage[]=body.messages
    const messagesTruncated=messages.slice(-6)
    const embedding=await getEmbedding(messagesTruncated.map(m=>m.content).join("\n"))

    const {userId}=auth()
    const vectorQueryResponse=await notesIndex.query({
        vector:embedding,
        topK:4,
        filter:{
            userId
        }
    })
    const relevantNotes=await prisma.note.findMany({
        where:{
            id:{
                in:vectorQueryResponse.matches.map(m=>m.id)
            }
        }
    })
    // console.log("relevant notes: ",relevantNotes)
    const systemMessage:ChatCompletionMessage = {
        role: 'system',
        content: `
          You are an intelligent note-taking app. You answer the user's question based on their existing notes.
          The relevant notes for this query are:\n
          ${relevantNotes.map(n => `Title: ${n.title}\n\nContent: ${n.content}`).join("\n\n")}
        `,
      };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage,...messagesTruncated],
  });
console.log(response)
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}