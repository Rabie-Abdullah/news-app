const request = require('request')
const newsApi = (address, category, callback) => {
    const url = 'https://newsapi.org/v2/top-headlines?country='+address+ '&category=' + category + '&apiKey=2428e9111963429d8b2723334d7c49fa'

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect with news api services', undefined)
        } else if(response.body.articles === 0) {
            callback('Please chcek that you entered right address, and category', undefined)
    
        }
        else {
           const data = [];
           const articles = response.body.articles
           articles.forEach((article) => {
               data.push({
                   title: article.title,
                   description: article.description,
                   utlToImage: article.urlToImage
               })
           })
           callback(undefined, data)
       
        }
    })
}


// newsApi('ae', 'business', (error, data) => {
//     console.log(data)
    
// })


module.exports = newsApi