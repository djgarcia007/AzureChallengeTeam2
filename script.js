cgptApiKey="YOURAPIKEY"

async function submit() {
    data={}
    data['comments']=document.getElementById("comments").value
    data['comments']=document.getElementById("email").value
    data['fname']=document.getElementById("fname").value
    data['lname']=document.getElementById("lname").value
    data['rate']=parseInt(document.querySelector('input[name="rate"]:checked').value);
    data['satisfied']=parseInt(document.querySelector('input[name="satisfied"]:checked').value);
    data['prices']=parseInt(document.querySelector('input[name="prices"]:checked').value);
    data['timeliness']=parseInt(document.querySelector('input[name="timeliness"]:checked').value);
    data['support']=parseInt(document.querySelector('input[name="support"]:checked').value);
    data['recommend']=parseInt(document.querySelector('input[name="recommend"]:checked').value);
    try {
        const response=await fetch('https://prod-80.eastus.logic.azure.com:443/workflows/5a13e30726ea47f6809a8d9fb0e38237/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NNHHMAsYF0guTq1N6V4Mp5R40iavtwh6kFys-fy7Zts',
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const resData=await response.json();
        console.log('fetched')
        updateAnalysis(resData)
            
    } catch(err) {
        console.log("fetch failed");
        updateAnalysis(err)
    }
}

function updateAnalysis(resData) {
    
    document.getElementById('analysis').innerHTML=Date.now()+" result: "+resData
    document.getElementById('analysis').innerHTML+='<br/>'+JSON.stringify(resData)
}

//Reqires API key to be set
async function analyzeViaChatGPT() {
    /*curl https://api.openai.com/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
        "role": "system",
        "content": "You are a helpful assistant."
        },
        {
        "role": "user",
        "content": "Determine if the following review is negative or positive:\nThe food was delicious and the service was fantastic!"
        }
    ],
    "temperature": 1,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
    }'*/

    try {
        cgptData={
            "model": "gpt-3.5-turbo",
            "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Determine if the following review is negative or positive:\nThe food was delicious and the service was fantastic!"
            }
            ],
            "temperature": 1,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        }
        await fetch('https://api.openai.com/v1/chat/completions',
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+cgptApiKey
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(cgptData), // body data type must match "Content-Type" header
        })
            .then((res) => {
                console.log('fetched')
                updateAnalysis(res.json)
        })
    } catch(err) {
        console.log("fetch failed");
        updateAnalysis(err)
    }
}
