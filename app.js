const express = require('express') //подключаем express
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({extended: true}))

//регистрация роутов
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000
//подключить бд
async function start(){
    try{
       await mongoose.connect(config.get('mongoUri'), {
           useUnifiedTopology: true,
           useNewUrlParser: true
       })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Sever Error', e.message)
        process.exit(1)
    }
}

start()


//mongodb://localhost:27017/