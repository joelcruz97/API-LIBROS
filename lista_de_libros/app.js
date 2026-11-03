const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let libros = [];

app.get('/api/books',(req, res)=>{
    res.json({status:200,message:"success",data:libros});
});



app.get('/api/books/:id',(req, res)=>{
    const id_libro = Number(req.params.id);

    let encontrado = false;
    let libro;

    libros.forEach(registro => {
        if(registro.id  === id_libro){
            encontrado = true;
            libro = registro;
        }    
    });

    if(encontrado){
        res.status(200).json({status:200,message:"success",data:libro});
    }else{
        res.status(404).json({status:404,message:"No se encontraron registros..."});
    }

});


 

app.post('/api/books', (req, res)=>{  const { id, titulo, autor, genero, anioPublicacion } = req.body ?? {};
    
    if (!id && !titulo && !autor && !genero && !anioPublicacion) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios. id, titulo, autor, genero, anioPublicacion "
        });
    }

    const libro = { id, titulo, autor, genero, anioPublicacion };

    libros.push(libro);

    res.json({status:200,message:"success",data:libro});

});



app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});