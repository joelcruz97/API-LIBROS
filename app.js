const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let libros = [];
let idLibroUnico = 1;

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


 

app.post('/api/books', (req, res)=>{  const { titulo, autor, genero, anioPublicacion } = req.body ?? {};

    const datosCorrectos =
        typeof titulo === "string" && titulo.trim() !== "" &&
        typeof autor === "string" && autor.trim() !== "" &&
        typeof genero === "string" && genero.trim() !== "" &&
        Number.isInteger(anioPublicacion);

    if (!datosCorrectos) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios y deben tener el tipo correcto."
        });
    }

    const libro = { id: idLibroUnico, titulo, autor, genero, anioPublicacion };

    libros.push(libro);
    idLibroUnico ++;

    res.json({status:200,message:"success",data:libro});
});


app.put('/api/books/:id', (req, res) => {
    const id_libro = Number(req.params.id);

    const indice = libros.findIndex(registro => registro.id === id_libro);

    // 1. Verificar si existe el libro
    if (indice === -1) {
        return res.status(404).json({
            message: "Libro no encontrado"
        });
    }

    // 2. Recibir los datos
    const { titulo, autor, genero, anioPublicacion } = req.body ?? {};

    // 3. Validar los datos
    const datosCorrectos =
        typeof titulo === "string" && titulo.trim() !== "" &&
        typeof autor === "string" && autor.trim() !== "" &&
        typeof genero === "string" && genero.trim() !== "" &&
        Number.isInteger(anioPublicacion);

    if (!datosCorrectos) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios y deben tener el tipo correcto."
        });
    }

    // 4. Actualizar el libro
    libros[indice] = {
        id: id_libro,
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
        anioPublicacion
    };

    // 5. Responder al cliente
    return res.status(200).json({
        status: 200,
        message: "Libro actualizado correctamente",
        data: libros[indice]
    });
});


app.delete('/api/books/:id', (req, res) => {
    const id_libro = Number(req.params.id);

    const indice = libros.findIndex(registro => registro.id === id_libro);

    if (indice === -1) {
        return res.status(404).json({
            message: "Libro no encontrado"
        });
    }

    const libroEliminado = libros.splice(indice, 1);

    return res.status(200).json({
        status: 200,
        message: "Libro eliminado correctamente",
        data: libroEliminado[0]
    });
});


app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});