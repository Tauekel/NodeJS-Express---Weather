const rp = require('request-promise')

module.exports = async function (city = '') {
    if (!city) {
        throw new Error('Имя города не может быть пустым')
    }

    const KEY = '29a4a29d8d17fcbba4efbdce09e65763'
    const uri = 'https://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options)
        const celsius = (data.main.temp - 32) * 5/9

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}