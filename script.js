// async function getBotResponse(userInput) {
//     const API_KEY = "ASY2RCa89ifV65Mdr2YdB4udSJfyV1zfJFCwEIWv";  // Replace with your actual API key
//     const API_URL = "https://api.cohere.ai/generate";
// }
const prompt = document.querySelector("#prompt")
const chatcontainer = document.querySelector(".chatbox-box")
const apiurl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCQdWguaprel4dN57Vaj8G_fwKd--S1aX8"
const sendbtn = document.querySelector("#send-btn")

let user = {
    data:null,
}
async function generateresponse(aichatbox) {

    let aitext = aichatbox.querySelector(".ai-chat-area")
    let requestoption = {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body : JSON.stringify({
            "contents": [
                {"parts":[
                {"text": user.data}
                ]
              }]
             })
    } 
    try {
        let response = await fetch(apiurl,requestoption)
        let data = await response.json()
        let apiresponse = data.candidates[0].content.parts[0].text.trim()
        aitext.innerHTML = apiresponse
        
    }
    catch(error){
        console.log(error);
        
    }
    finally{
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})
    }

}

function createchatbox(html, classes){
    const div = document.createElement("div")
    div.innerHTML = html 
    div.classList.add(classes)
    return div
}


function handlechatresponse(message){
    user.data = message
    let html = `<img src="human-image.jpg" alt="user" id="user-image" width="40">
            <div class="user-chat-area">
             ${user.data}
            </div>`
    prompt.value = ""

    const userchatbox = createchatbox(html,"user-chatbox")

    chatcontainer.appendChild(userchatbox)

    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})

    setTimeout(()=>{
        let html=`<img src="robo-image.jpg" alt="ai" id="ai-image" width="40">
            <div class="ai-chat-area" id="load">
            . . .
            
            </div>`
            let aichatbox = createchatbox(html, "ai-chatbox")
            chatcontainer.appendChild(aichatbox)
            generateresponse(aichatbox)
    },600);

}

prompt.addEventListener("keydown",(e) =>{
    if(e.key === "Enter"){
      handlechatresponse(prompt.value);
    }
    
});
sendbtn.addEventListener("click", ()=>{
    handlechatresponse(prompt.value)
})