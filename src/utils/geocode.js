const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d7fe3399401f0d96405fd133ecad43c3&query='+ encodeURI (address)

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                location: body.location.name,
                latitude: body.location.lat,
                longitude: body.location.lon,
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d7fe3399401f0d96405fd133ecad43c3&query='+latitude+','+longitude
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback(error, undefined)
        } else {
            callback(undefined, body.current.temperature + ' degrees. Current time is: ' + body.location.localtime)
        }
    })
}

module.exports = {geocode, forecast}