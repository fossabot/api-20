import app from './app'

const PORT = parseInt(process.env.PORT ?? '8080', 10)

app.listen(PORT, () =>
  console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`)
)
