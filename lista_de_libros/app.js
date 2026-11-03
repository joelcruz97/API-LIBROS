const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let libros = [];

app.get('/api/books',(req, res)=>{
    res.json({status:200,message:"success",data:libros});
});








app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});