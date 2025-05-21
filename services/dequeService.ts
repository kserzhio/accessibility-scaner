import puppeteer from 'puppeteer'

export const dequeService = {
  async parseDequePage(url: string) {
    let browser: puppeteer.Browser | null = null

    try {
      browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle0' })

      const data = await page.evaluate(() => {
        const fixBlock = document.querySelector('section.howToFix')
        const whyBlock = document.querySelector('section.whyImportant')
        const impactBlock = document.querySelector('section.ruleInfo')

        const fixHtml = fixBlock?.innerHTML || ''
        const why = whyBlock?.textContent?.trim() || ''
        const impactSummary = impactBlock?.textContent?.trim() || ''

        return { fixHtml, why, impactSummary }
      })

      return data
    } finally {
      if (browser) await browser.close()
    }
  }
}
