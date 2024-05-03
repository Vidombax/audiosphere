import express from 'express';
import userRouter from './routes/user.route.js';
import tagRouter from './routes/tag.route.js';
import performerRoute from "./routes/performer.route.js";
import settingsRoute from "./routes/settings.route.js";

const app = express()

app.use(express.json())

app.use('/', userRouter)
app.use('/', tagRouter)
app.use('/', performerRoute)
app.use('/', settingsRoute)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
