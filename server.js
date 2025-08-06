const express = require('express')
const morgan = require('morgan')
const path = require('path')
const router = require('./routes/index')
const app = express()

//midellwares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('./public')) //Es para dejar las rutas estaticas
app.use('/', router); // para usar las rutas deifnidas


//Settings. Se caracterizanp porque se ve como app.set
app.set('case sensitive routing', true)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))



app.listen(3000)
console.log(`Server on port, ${3000}`)

