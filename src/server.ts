import app from './app'
import 'dotenv/config'

console.log("check .env varaiblaes:", process.env.JWT_SECRET)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)})