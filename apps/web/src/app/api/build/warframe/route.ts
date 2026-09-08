import {calculateWarframeDraft} from "@/server/warframe-draft";
export async function POST(request:Request){try {const text=await request.text();if(text.length>20000)return Response.json({error:'Build too large.'},{status:413});return Response.json(calculateWarframeDraft(JSON.parse(text)));}catch(e){return Response.json({error:e instanceof Error?e.message:'Invalid build.'},{status:400});}}
