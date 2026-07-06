import { Hono } from 'hono'
import authRoutes from './routes/auth.js'

const app = new Hono()

app.route('/api/auth', authRoutes)

export default app