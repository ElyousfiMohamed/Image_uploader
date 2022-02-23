const express = require('express')
const app = express()

const hbs = require('express-handlebars')
const path = require ('path')

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

//setup view engine
app.set('view engine','hbs')
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultView:'default',
    layoutsDir: path.join(__dirname,'views'),
    partialsDir: path.join(__dirname,'views/partials')
}))

//routes 
app.get('/',(request,response) => {
    response.render('main')
})

app.use('/',require('./server/router/router'))

app.listen(3000,() => console.log('Server is started on port 3000'))

