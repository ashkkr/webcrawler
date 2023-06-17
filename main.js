const { crawlWebPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("too many arguments")
        process.exit(1)
    }
    const baseurl = process.argv[2]
    console.log(`starting crawl of ${baseurl}`)

    crawlWebPage(baseurl)
}

main()
