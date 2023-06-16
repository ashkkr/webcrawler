const { basicCrawler, getUrlFromHtml } = require("./crawl.js");
const { test, expect } = require("@jest/globals");


test("basicCrawler strip url", () => {
    const testString = 'https://blog.boot.dev/path'
    const actual = basicCrawler(testString)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("basicCrawler to check path", () => {
    const testString = 'https://blog.boot.dev/path/'
    const actual = basicCrawler(testString)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("basicCrawler capitals", () => {
    const testString = 'https://BLOG.boot.dev/path/'
    const actual = basicCrawler(testString)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test("getUrlsFromHtml", () => {
    const inputHTML = `<html><body><a href="https://blog.boot.dev/">boot dev blog</a></body></html>`
    const inputUrl = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/"]
    const actual = getUrlFromHtml(inputHTML, inputUrl)
    expect(actual).toEqual(expected)
})

