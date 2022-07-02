//const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');
const { off } = require('process');
const multer = require('multer');

let multerDiskStorage = multer.diskStorage({

	destination: (req, file, cb) =>{
		cb(null, path.join(__dirname, '../public/images/products'));
	},
	filename: (req, file, cb) =>{
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProducto = {
   
    productCart: (req, res) =>{
        res.render (path.join(__dirname,"../views/productCart.ejs"));
    },
  
    checkout: (req, res) =>{
        res.render (path.join(__dirname,"../views/checkout.ejs"));
    },

    mispedidos: (req, res) =>{
        res.render (path.join(__dirname,"../views/mispedidos.ejs"));
    },
    
    mostrarCrear: (req, res) =>{
        res.render ( path.join(__dirname, "../views/crearProducto.ejs"));
    },

	procesarCrear: (req, res) =>{

	}

    productos: (req, res) =>{
        let despensaProducts = products.filter(product => product.category === "despensa")
        let bebidasProducts = products.filter(product => product.category === "bebidas")
        let mascotasProducts = products.filter(product => product.category === "mascotas")
        let bebesProducts = products.filter(product => product.category === "bebes")
        let cuidadoPersonalProducts = products.filter(product => product.category === "cuidado-personal")
        let limpiezaProducts = products.filter(product => product.category === "limpieza")

  		res.render ("productos",{despensaProducts, bebidasProducts, mascotasProducts, bebesProducts, cuidadoPersonalProducts, limpiezaProducts}); 
	},

    detail: (req, res) =>{
        let idProduct = req.params.id;
		let product = products.find(product => product.id == idProduct)
        res.render("productDetail", { title: product.name, product });
    },

    edit: (req, res) => {
        const id = +req.params.id;
		let productDetail = products.filter( function( product ){

			return product.id === id;

		});
		productDetail = productDetail[ 0 ];
		res.render('edit', { title: productDetail.name, productToEdit: productDetail } );
	}, 
    
    update: (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;
        let image       = req.body.image;

		let editProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
            image: image

		};	

		for( let i in products ) {

			if( products[ i ].id === id ) {

				products[ i ] = editProduct;
				break;

			}

		}

		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
		res.redirect( '/products' );

	},
    	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let productDestroyed = products.filter( function( product ){

			return product.id !== id;

		});

		console.log( productDestroyed );

		fs.writeFileSync( productsFilePath , JSON.stringify( productDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	}
    
};

module.exports = controladorProducto;