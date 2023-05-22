import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cors())

app.post('/ask', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 1,
      messages: [{ role: 'user', content: req.body.message }],
    }),
  }

  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      options
    )
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
