const express = require('express')
const methodOverride = require('method-override');
const morgan = require('morgan')
const path = require('path')
const router = require('./routes/index')
const lugaresRoutes = require('./routes/lugares')
const app = express()

//midellwares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(methodOverride('_method'));
app.use(express.static('./public')) //Es para dejar las rutas estaticas
app.use('/', router); // para usar las rutas deifnidas
app.use('/lugares', lugaresRoutes);




//Settings. Se caracterizanp porque se ve como app.set
app.set('case sensitive routing', true)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views')) // es para poder llamar directamente la vista



app.listen(3000)
console.log(`Server on port, ${3000}`)

