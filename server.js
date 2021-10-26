import app from "./app.js";

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'misecreto';

app.listen(PORT,()=>console.log(`listening on ${PORT}`));