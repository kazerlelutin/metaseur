export default async function search(req, res) {
  const url = req.params.url

  return res.status(200).json({ url })
}
