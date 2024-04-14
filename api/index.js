import { JSDOM } from 'jsdom'
export default async function meta(req, res) {
  const url = req.query?.url
  if (!url) return res.status(400).json({ error: 'URL is required' })

  const response = await fetch(url)
  const data = await response.text()
  const dom = new JSDOM(data)
  const doc = dom.window.document

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const meta = {
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('meta[name="description"]')?.content || '',
    image: doc.querySelector('meta[property="og:image"]')?.content || '',
    url: doc.querySelector('meta[property="og:url"]')?.content || '',
    favicon:
      doc.querySelector('link[rel="shortcut icon"]')?.href ||
      doc.querySelector('link[rel="icon"]')?.href ||
      '',
  }

  return res.status(200).json(meta)
}
