const { JSDOM } = require('jsdom')

async function crawlWebPage(baseUrl) {
    try {
        const resp = await fetch(baseUrl)

        if (resp.status > 399) {
            console.log(`The status code returned is ${resp.status} for url ${baseUrl}`)
            return
        }

        if (!resp.headers.get("content-type").includes("text/html")) {
            console.log(`The content-type is not html but ${resp.headers.get("content-type")} for url ${baseUrl}`)
            return
        }

        console.log(await resp.text())
    }
    catch (err) {
        console.log("error in fetch: " + err.message)
    }
}

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
    getUrlFromHtml,
    crawlWebPage
}