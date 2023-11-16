import OpenAi from "openai"
const apiKey=process.env.OPENAI_API_KEY
if(!apiKey){
    throw Error("OPENAI_API_KEY not set")
}
const openai=new OpenAi({apiKey})
export default apiKey

export async function getEmbedding (text:string) {
    const response=await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text
    })
    const embedding= response.data[0].embedding

    if(!embedding) throw Error("Error generating the embedding")
    console.log(embedding)

    return embedding

}