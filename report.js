function printReport(pages) {
    console.log("==========")
    console.log("REPORT")
    console.log("==========")

    const sortPagesArray = sortPages(pages)

    for (const page of sortPagesArray) {
        console.log(`Found ${page[1]} for page: ${page[0]}`)
    }

    console.log("==========")
    console.log("END REPORT")
    console.log("==========")
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages)

    pagesArray.sort((a, b) => {
        return b[1] - a[1]
    })
    return pagesArray
}

module.exports = {
    sortPages,
    printReport
}