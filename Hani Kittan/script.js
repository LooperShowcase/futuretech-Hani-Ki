//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

let open_response;
let chat=[
    {role:"user",content:"Hi"},
    {role:"assistant",content:"Hi, how can I helpyou today"}
];
async function chatUserAdd (feeling,question){
chat.push({role:"user",content:"my happines from 0-10 "+ feeling +"my input is "+ question});
}
async function chatAssistantAdd(res){
    chat.push({role: "assistant",content:res});
}

async function openai_test()
{
    let url="https://api.openai.com/v1/chat/completions";
    let part1 = "sk";
let part2 = "-LLDtZIQbt300rIyi";
let part3 = "Bm5LT3BlbkFJwntYQJzMl3xlkgLt63pM";
apikey=part1+part2+part3;
    let data={
        model: "gpt-3.5-turbo",
        messages:chat
    };
    try {
      const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization :`Bearer ${apikey}`
        },
        body: JSON.stringify(data)     
     }) 
     if(response.ok){
        const responseData= await response.json();
        const message = responseData.choices[0].message.content;

        chatAssistantAdd(message);

        const speech=new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(speech);
        return message;
     } 
    } catch (error) {
        console.log("opps new error : "+error);
        }
}