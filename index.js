const express=require('express')
const { Configuration, OpenAIApi } = require ("openai");
const bodyParser=require('body-parser')
const cors=require('cors');

const configuration = new Configuration({
    organization: "org-KCkQrHrBGhphZkJhEaqwcBKZ",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);


const app=express()
app.use(bodyParser.json())
app.use(cors())


const port=3080
app.post('/',async(req,res)=>{
    const {message}=req.body;
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    
    res.json({
        message:response.data.choices[0].text,

})
});

app.get('/models', async (req, res) => {
    try {
      const response = await openai.listEngines();
      console.log(response.data.data);
      res.json({
        models: response.data.data,
      });
    } catch (error) {
      console.error("Error fetching models:", error);
      res.status(500).json({
        error: "Failed to fetch models",
      });
    }
  });
app.listen(port,()=>{
    console.log('listening')
});
