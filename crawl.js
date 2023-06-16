const { JSDOM } = require('jsdom')

function getUrlFromHtml(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    console.log(htmlBody)
    const linkelements = dom.window.document.querySelectorAll('a')
    console.log(linkelements)

    // for (const linkelement in linkelements) {
    //     console.log(linkelement)
    // }

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