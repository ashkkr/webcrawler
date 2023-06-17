const { JSDOM } = require('jsdom')

function getUrlFromHtml(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkelements = dom.window.document.getElementsByTagName('a');

    for (let i = 0; i < linkelements.length; i++) {
        if (linkelements[i].getAttribute("href").slice(0, 1) == '/') {
            try {
                const urltemp = new URL(baseUrl + linkelements[i].getAttribute("href"))
                urls.push(baseUrl + linkelements[i].getAttribute("href"))
            }
            catch (err) {
                console.log("error with absolute url " + err.message)
            }
        }
        else {
            try {
                const urltemp = new URL(linkelements[i].getAttribute("href"))
                urls.push(linkelements[i].getAttribute("href"))
            }
            catch (err) {
                console.log("error with absolute url " + err.message)
            }

        }
    }

    return urls
}

function basicCrawler(urlString) {
    const url = new URL(urlString)
    const hostname = `${url.hostname}${url.pathname}`

    if (hostname.length > 0 && hostname.slice(-1) === '/') {
        return hostname.slice(0, -1)
    }

    return hostname
}

module.exports = {
    basicCrawler,
    getUrlFromHtml
}