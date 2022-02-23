const express = require('express')
const app = express()

const path = require ('path')

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

//routes 
app.get('/',(request,response) => {
    response.send("<h3>Express server</h3>")
})

app.listen(3000,() => console.log('Server is started on port 3000'))

