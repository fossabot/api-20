import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import { redirectToHTTPS } from 'express-http-to-https'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

import { errorHandler } from './middlewares/errorHandler'
import { NotFoundError } from './utils/errors/NotFoundError'
import { TooManyRequestsError } from './utils/errors/TooManyRequestsError'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
  app.use(redirectToHTTPS())
  const requestPerSecond = 2
  const seconds = 60
  const windowMs = seconds * 1000
  app.enable('trust proxy')
  app.use(
    rateLimit({
      windowMs,
      max: seconds * requestPerSecond,
      handler: () => {
        throw new TooManyRequestsError()
      }
    })
  )
}

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(() => {
  throw new NotFoundError()
})
app.use(errorHandler)

export default app
