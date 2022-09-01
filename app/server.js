var express = require('express') ;//LLAMAMOS A EXPRESS
var app = express();           
var pdf = require("pdf-creator-node");
var fs = require("fs");
var html = fs.readFileSync("app/pdf.html", "utf8");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
    Estimados hice un menjunge, pero no habia trabajado con PDF asi que busque informacion en internet, espero que no sea trampa :P
*/



var port = process.env.PORT || 8081 // ESTABLECEMOS EL PUERTO, USE EL 8081 DEBIDO A QUE EL 80 ESTA OCUPADO POR IIS

var cuenta = 0;
// METODO GET, SI LO LLAMAMOS MAS DE TRES VECES SE MUERE
app.get('/get', function(req, res) {

    //LE HICE UN CONTADOR PARA QUE VALIDARA LAS VECES, NO CONOZCO UNA ALTERNATIVA MAS ELABORADA Y BONITA
    cuenta=cuenta+1;
    cuenta<= 3  ?  res.json({ mensaje: '¡Hola Mundo!' }):res.json({ mensaje: 'Lo siento me enoje, ya no quiero funcionar!' })//AQUI ENTRA LA VALIDACION, PROBADO CON POSTMAN 
    console.log(cuenta);
 
})


//METODO POST, BUENO AQUI LO HICE CASI COMO UN GET PASANDO EL PARAMETRO POR LA URI
app.post('/pdf/:name', function(req, res) {
//MENSAJE DE EXITO, QUE SALTA EN POSTMAN
  res.json({ mensaje:  "PDF creado correctamente, "+req.params.name }) 
  //IGNORAR IMPLEMENTACION DE LA LIBRERIA DE PDF
  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Prueba Fidem Tomas Ossandon</div>'
    }
  
};

  var document = {
    html: html,
    data: {
      name: req.params.name,
    },
    //LE ASIGNAMOS UN NOMBRE AL PDF PARA QUE SE VEA BONITO
    path: "./pruebaFidemV1.0.pdf",
    type: "",
  };

  //CREAMOS EL PDF
  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });

})

// INICIAMOS NUESTRO "SERVIDOR"
app.listen(port)