import express from 'express';
import userRouter from './routes/user.route.js';

const app = express()

app.use(express.json())
app.use('/', userRouter)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
