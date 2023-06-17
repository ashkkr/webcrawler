const { JSDOM } = require('jsdom')

async function crawlWebPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)

    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl)

    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++;
        return pages
    }

    pages[normalizedCurrentUrl] = 1

    console.log(`actively crawling ${currentUrl}`)
    try {
        const resp = await fetch(currentUrl)

        if (resp.status > 399) {
            console.log(`The status code returned is ${resp.status} for url ${currentUrl}`)
            return pages
        }

        if (!resp.headers.get("content-type").includes("text/html")) {
            console.log(`The content-type is not html but ${resp.headers.get("content-type")} for url ${currentUrl}`)
            return pages
        }

        const htmlbody = await resp.text()
        const nextUrls = getUrlFromHtml(htmlbody, baseUrl)

        for (const nextURl of nextUrls) {
            pages = await crawlWebPage(baseUrl, nextURl, pages)
        }
    }
    catch (err) {
        console.log("error in fetch: " + err.message)
    }

    return pages
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

function normalizeUrl(urlString) {
    const url = new URL(urlString)
    const hostname = `${url.hostname}${url.pathname}`

    if (hostname.length > 0 && hostname.slice(-1) === '/') {
        return hostname.slice(0, -1)
    }

    return hostname
}

module.exports = {
    normalizeUrl,
    getUrlFromHtml,
    crawlWebPage
}