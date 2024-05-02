import express from 'express';
import userRouter from './routes/user.route.js';
import tagRouter from './routes/tag.route.js';

const app = express()

app.use(express.json())
app.use('/', userRouter)
app.use('/', tagRouter)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
