const express = require ('express')
const {Router} = express
const app = express()
const productos = Router()
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.set('view engine', 'ejs')
app.set('views' , './views')
/***********************Creo la lista de productos**************************/

const listProducts = [
  {  
    title:"Escuadra",
    price:123.45,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id:1
  },
  {
    title:"Calculadora",
    price:234.56,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id:2
  },
  {
    title:"Globo Terráqueo",
    price:345.67,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id:3
  }
]

/******************* Defino las funciones **********************************/
const save = (object)=>{       
  let maxId = 0;
  listProducts.forEach(element => {
      if (element.id > maxId ){ maxId = element.id}
  });    
  object.id = (maxId + 1);
  listProducts.push(object);   
}



/***************POST*****************/
    const postProduct = (req, res) =>{
      try{
        const { title, price, thumbnail } = req.body      
        const productoNuevo = {
          title,
          price,
          thumbnail
        }  
        save(productoNuevo)  
        res.json({"producto agregado" : productoNuevo})
          }catch (error) {
                return res.send(error)
      }
    }

/**************************************************************** */

productos.get('/', (req,res)=>{
  res.render('productos.ejs',{ListProduct: listProducts})
})

app.get('/form' , (req,res)=>{
  res.render('form.ejs')
})

productos.post('/', postProduct)
app.use('/api/productos' , productos)


const PORT = 3000
app.listen(PORT, ()=>{
    console.log('server on')
})
