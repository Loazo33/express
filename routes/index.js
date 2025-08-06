const {Router} = require('express')

//para poder exportar las rutas
const router = Router()
    
router.get('/', (req, res) => {
    res.send('Hola mundo')
})

router.get('/consultar', (req, res) => {

    const users = [{
            id: 1,
            name: "Jhonatan",
            address: "Transv 78 H bis a # 42 c 33."
        },
        {
            id: 2,
            name: "Stiven",
            address: "Caerra quinta numero $"
        }
    ]

    let isActive = true;
    res.render('dashboard', {
        tittle: 'Esta es la pestaña de consultar',
        isActive,
        users
    })
})



module.exports = router

