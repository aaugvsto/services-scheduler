const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

app.get("/api/business/data", (req, res) => {
  //TODO: implement the logic to fetch services from a database or other source
  
  const response = {
    services: [
      { id: 1, name: "Corte", description: "Corte de cabelo masculino", price: 50.00, currency: "BRL" },
      { id: 2, name: "Barba", description: "Aparar e modelar a barba", price: 30.00, currency: "BRL" },
      { id: 3, name: "Corte e Barba", description: "Corte de cabelo e barba", price: 70.00, currency: "BRL" }
    ],
    professionals: [
      { id: 1, name: "João" },
      { id: 2, name: "Maria" },
      { id: 3, name: "Pedro" }
    ]
  }

  res.json(response)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})