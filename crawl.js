function basicCrawler(urlString) {
    const url = new URL(urlString)
    const hostname = `${url.hostname}${url.pathname}`

    if (hostname.length > 0 && hostname.slice(-1) === '/') {
        return hostname.slice(0, -1)
    }

    return hostname
}

module.exports = {
    basicCrawler
}