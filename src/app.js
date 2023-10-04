const { geocode, forecast } = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rivka'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide location.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({
                error: 'Incorrect Location'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error: 'Unable to find forecast'
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        age: 27
    })
})

app.get('/products', (req, res) => { //http://localhost:3000/products?search=games&rating=5
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'article 404',
        message: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'page 404',
        message: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})