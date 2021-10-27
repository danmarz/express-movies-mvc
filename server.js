import app from "./app.js";

const startupMessage = process.env.PORT ? `listening on ${process.env.PORT}` : '>>>>> .env file is missing (PORT & SECRET required!!) <<<<<'

app.listen(process.env.PORT, () => console.log(startupMessage));