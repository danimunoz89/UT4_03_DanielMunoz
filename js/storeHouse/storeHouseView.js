import { SHSingleton } from "./storeHouseModel.js";

class storeHouseView {
    constructor() {
        //Contenedores HTML donde irán pintándose los elementos
        this.categories = $('#categoriasListadoNav');
        this.shops = $('#tiendasListadoNav');
        this.main = $('#cajonElementos');
    }

    //Cuando el documento esté listo se llamará al handleInicio
    //que permitirá mostrar las tiendas.
    bindInicio(handleInicio) {
        $(document).ready(function () {
            handleInicio();
        })
    }

    //Cuando haga click en el elemento Inicio del navbar
    //se recargará la página, provocando que vuelvan a salir
    //las tiendas que deben salir al inicio de la misma.
    bindElemTiendas() {
        $("#inicio").click(function () {
            document.location.reload(true);
        })
    }

    //mostrarVistaElemTiendas será el encargado de pintar las tiendas
    mostrarVistaElemTiendas(iteradorCategorias) {
        //main hace referencia a la zona que queremos pintar (ver constructor)
        this.main.empty();
        for (let value of iteradorCategorias) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                //Dentro del card de bootstrap introduzco elementos
                //de las tiendas que he ido recorriendo con el iterador.
                this.main.append(
                    `<div class="card" style="width: 18rem;">
                    <img src="img/${value.shop.images}" alt="fotoTienda" title="${value.shop.name}"
                        class="w-50 mt-5 mx-auto d-block">
                    <div class="card-body">
                        <h5 class="card-title text-center">${value.shop.name}</h5>
                        <p class="card-text text-center">${value.shop.address}</p>
                        <button type="button" class="btn btn-primary mx-auto d-block botontienda" id="${value.shop.cif}">
                            Ver Productos
                        </button>
                    </div>
                    </div>`
                )
            }
        }
    }

    //Cuando el documento esté listo se llamará al handleMenuCategories
    bindMenuCategorias(handleMenuCategories) {
        $(document).ready(function () {
            handleMenuCategories();
        })
    }

    //Con mostrarVistaMenuCategorias voy a pintar en el navbar 
    //las distintas categorías
    //que hemos insertado en el StoreHouseController.js
    mostrarVistaMenuCategorias(iteradorCategorias) {
        //categories hace referencia a la zona que queremos pintar (ver constructor)
        this.categories.empty();
        for (let value of iteradorCategorias) {
            //Evito que salga la categoría por defecto
            if (value.category.title !== "Cat.Defecto") {
                this.categories.append(
                    `<a href="#" class="elemCategory" id="${value.category.id}">${value.category.title}</a>`
                )
            }
        }
    }

    //Cuando el documento esté listo se llamará al handleMenuShops
    bindMenuTiendas(handleMenuShops) {
        $(document).ready(function () {
            handleMenuShops();
        })
    }

    //Con mostrarVistaMenuTiendas voy a pintar en el navbar 
    //las distintas tiendas
    //que hemos insertado en el StoreHouseController.js
    mostrarVistaMenuTiendas(iteradorTiendas) {
        //shops hace referencia a la zona que queremos pintar (ver constructor)
        this.shops.empty();
        for (let value of iteradorTiendas) {
            //Evito que salga la tienda por defecto a través del cif
            if (value.shop.cif !== 789456) {
                this.shops.append(
                    `<a href="#" class="elemShop" id="${value.shop.cif}">${value.shop.name}</a>`
                )
            }
        }
    }
    
    //Cuando pulsemos en alguna de las opciones del nav categorias
    //recogeremos el id del botón y en función del mismo, mediante un switch,
    //le paso al handle el tipo de categoría para poder sacar el objeto categoria
    //que permitirá sacar los productos de ese tipo. 
    bindProductsCategoryList(handleProductsCategoryList) {
        $("#categoriasListadoNav").on('click', ".elemCategory", function () {
            let id = $(this).attr("id");
            switch (id) {
                case "juegos":
                    handleProductsCategoryList("Juegos");
                    break;
                case "consolas":
                    handleProductsCategoryList("Consolas");
                    break;
                case "accesorios":
                    handleProductsCategoryList("Accesorios");
                    break;
            }
        });
    }

    //Cuando pulsemos en alguna de las opciones del nav tiendas
    //recogeremos el id del botón.
    //Ese id se lo paso al handle para poder sacar el objeto tienda
    //que permitirá sacar los productos incluidos en la misma. 
    bindProductsStoreList(handleProductsStoreList) {
        $("#tiendasListadoNav").on('click', ".elemShop", function () {
            let id = $(this).attr("id");
            handleProductsStoreList(id);
        });
    }
    
    //Cuando pulse uno de los botones dinámicos generados que contengan el class
    //.botontienda se recoje el id que pasaré al handleProductsStoreList para poder obtener
    //el objeto tienda necesario para poder mostrar los productos asociados a la misma.
    
    bindProductsStoreMenuList(handleProductsStoreList) {
            $(this.main).on('click', ".botontienda", function () {
                let id = $(this).attr("id");
                handleProductsStoreList(id);
            });
    }

    //Esta función será la encargada de pintar en el main los productos incluidos
    //en las tiendas.
    listProducts(generadorProductos) {
        this.main.empty();
        for (let value of generadorProductos) {
            this.main.append(
                `<div class="card" style="width: 18rem;">
                    <img src="img/${value.images}"  alt="fotoProducto" title="${value.name}"
                        class="w-50 mt-5 mx-auto d-block">
                    <div class="card-body">
                        <h5 class="card-title text-center">${value.name}</h5>
                        <p class="card-text text-center">${value.price} €</p>
                        <button type="button" class="btn btn-primary mx-auto d-block detallesProducto" id="${value.name}">
                            Ver Descripción
                        </button>
                    </div>
                    </div>`
            )
        }
    }
    
    //Cuando pulse uno de los botones dinámicos generados que contengan el class
    //.detallesproducto se recoje el id que pasaré al handle para poder obtener
    //el objeto producto necesario para poder mostrar las descripciones de los productos.
    bindDetalleProductos(handleshowDetailsProducts) {
        $(this.main).on('click', ".detallesProducto", function () {
            let nombre = $(this).attr("id");
            handleshowDetailsProducts(nombre);
        });
    }

    //Las siguientes funciones serán las encargadas de pintar
    //en el main los detalles de los productos incluidos en las tiendas en función del tipo de producto
    //que sea el objeto que hemos obtenido en el handle gracias al id del botón pulsado.
    mostrarDetallesVideojuegos(products) {
        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Género:</b> ${products.genero}</p>
                <p class="card-text text-center"><b>DLCs:</b> ${products.dlc}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
            </div>
            </div>`
        )
    }

    mostrarDetallesConsolas(products) {
        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Tipo:</b> ${products.tipo}</p>
                <p class="card-text text-center"><b>Formato:</b> ${products.formato}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
            </div>
            </div>`
        )
    }

    mostrarDetallesAccesorios(products) {
        this.main.empty();
        this.main.append(
            `<div class="card" style="width: 18rem;">
            <img src="img/${products.images}"  alt="fotoProducto" title="${products.name}"
                class="w-50 mt-5 mx-auto d-block">
            <div class="card-body">
                <h5 class="card-title text-center">${products.name}</h5>
                <p class="card-text text-center"><b>Número de Serie:</b> ${products.serialNumber}</p>
                <p class="card-text text-center"><b>Descripción:</b> ${products.description}</p>
                <p class="card-text text-center"><b>Plataforma:</b> ${products.plataforma}</p>
                <p class="card-text text-center"><b>Color:</b> ${products.color}</p>
                <p class="card-text text-center"><b>Precio:</b> ${products.price} €</p>
                <p class="card-text text-center"><b>Impuestos:</b> ${products.tax} %</p>
            </div>
            </div>`
        )
    }
}


export { storeHouseView };