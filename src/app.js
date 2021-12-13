const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const newsApi = require('./tools/news-api')

const app = express()


const  publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    let address = 'ae'
    let category = 'sports'


    newsApi(address, category, (error, data) => {
        if(error) {
            return res.send({error})
        }
        res.render('index', {
            title: data.title,
            description: data.description,
            utlToImage: data.urlToImage,
            data: data,
            name: 'Rabie Abdullah'
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rabie Abdullah',
        about: 'I`m a full stack developre',
        task: 'This task is the second task of NTI',
        instructor: ' Instructor: Eng: Farah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rabie Abdullah',
        errorMessage: 'PAge Not Found!'
    })
})

app.listen(5000, () => {
    console.log('Server is up on port 5000')
})