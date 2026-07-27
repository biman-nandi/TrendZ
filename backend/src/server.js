import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/db.js"

dotenv.config({
    path: "./.env",
    quiet: true
})

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => console.log(`Server is connected on http://localhost:${PORT}`))