import { EmptyValueException, valueIncludedException, valueNotIncludedException, InvalidRegexException, nullException, InvalidValueException, InvalidTypeObjectException } from "./storeHouseModel.js";;
import { Accesorios } from "./storeHouseModel.js";
import { Category } from "./storeHouseModel.js";
import { Consolas } from "./storeHouseModel.js";
import { Coords } from "./storeHouseModel.js";
import { Product } from "./storeHouseModel.js";
import { Store } from "./storeHouseModel.js";
import { Videojuegos } from "./storeHouseModel.js";

class storeHouseController {
    #storeHouseModel;
    #storeHouseView;

    //Creo un método privado para crear objetos del SHSingleton
    #loadSHSingletonObjects() {

        //Creo 3 categorias.
        let categoria1 = new Category("Juegos", "El alimento de las consolas", "juegos");
        let categoria2 = new Category("Consolas", "Lo esencial para jugar", "consolas");
        let categoria3 = new Category("Accesorios", "Complementos para tu consola", "accesorios");

        //Añado Categorias
        this.#storeHouseModel.addCategory(categoria1);
        this.#storeHouseModel.addCategory(categoria2);
        this.#storeHouseModel.addCategory(categoria3);

        //Creo 3 tiendas
        let coordenadas1 = new Coords("213123", "243123");
        let tienda1 = new Store(123123, "Game", "calle falsa", 1231723, coordenadas1, "game.jpg", "tienda1");
        let coordenadas2 = new Coords("852963", "741456");
        let tienda2 = new Store(963741, "TodoConsolas", "calle verdadera", 7539510, coordenadas2, "todoconsolas.jpg", "tienda2");
        let coordenadas3 = new Coords("712936", "471465");
        let tienda3 = new Store(845159, "Xtralife", "calle dudosa", 8396374, coordenadas3, "xtralife.jpg", "tienda3");

        //Añado Tiendas
        this.#storeHouseModel.addShop(tienda1);
        this.#storeHouseModel.addShop(tienda2);
        this.#storeHouseModel.addShop(tienda3);

        //Creo 3 productos por categoria
        let juego1 = new Videojuegos("CDE12", "FIFA 22", "EA", "Es un juego de Fútbol", 70, 21, "fifa22.png", "Deportivo", 1);
        let juego2 = new Videojuegos("WER74", "NBA 2k22", "2K", "Es un juego de Baloncesto", 70, 21, "nba2k22.png", "Deportivo", 3);
        let juego3 = new Videojuegos("REW47", "MADDEN NFL 22", "EA", "Es un juego de Fútbol Americano", 70, 21, "madden22.png", "Deportivo", 0);
        let consola1 = new Consolas("UTY21", "Xbox Series X", "Microsoft", "La mejor consola", 500, 21, "xbox.png", "sobremesa", "disco");
        let consola2 = new Consolas("IOP32", "PlayStation5", "Sony", "La consola de sony", 500, 21, "ps5.png", "sobremesa", "disco");
        let consola3 = new Consolas("SWY76", "Nintendo Switch", "Nintendo", "La híbrida de Nintendo", 300, 21, "switch.png", "portatil", "cartucho");
        let accesorio1 = new Accesorios("CDT12", "Mando", "Ardistel", "Un mando para profesionales", 20, 21, "mandopro.png", "Negro", "pc");
        let accesorio2 = new Accesorios("ASQ12", "Mando", "Logitech", "Un mando muy bonito", 50, 21, "mando.png", "Azul", "xbox");
        let accesorio3 = new Accesorios("RTY21", "Maleta", "Rainbow", "Un maleta para tu Nintendo Switch", 35, 21, "maleta.png", "Gris", "nintendo");

        //Añado Productos en Categoria
        this.#storeHouseModel.addProduct(juego1, categoria1);
        this.#storeHouseModel.addProduct(juego2, categoria1);
        this.#storeHouseModel.addProduct(juego3, categoria1);
        this.#storeHouseModel.addProduct(consola1, categoria2);
        this.#storeHouseModel.addProduct(consola2, categoria2);
        this.#storeHouseModel.addProduct(consola3, categoria2);
        this.#storeHouseModel.addProduct(accesorio1, categoria3);
        this.#storeHouseModel.addProduct(accesorio2, categoria3);
        this.#storeHouseModel.addProduct(accesorio3, categoria3);

        //Añado Productos en Tienda
        this.#storeHouseModel.addProductInShop(juego1, tienda1, 40);
        this.#storeHouseModel.addProductInShop(consola1, tienda1, 20);
        this.#storeHouseModel.addProductInShop(accesorio1, tienda1, 10);
        this.#storeHouseModel.addProductInShop(juego2, tienda2, 40);
        this.#storeHouseModel.addProductInShop(consola2, tienda2, 20);
        this.#storeHouseModel.addProductInShop(accesorio2, tienda2, 10);
        this.#storeHouseModel.addProductInShop(juego3, tienda3, 40);
        this.#storeHouseModel.addProductInShop(consola3, tienda3, 20);
        this.#storeHouseModel.addProductInShop(accesorio3, tienda3, 10);
    }

    constructor(storeHouseModel, storeHouseView) {
        this.#storeHouseModel = storeHouseModel;
        this.#storeHouseView = storeHouseView;
        this.onLoad();
        this.#storeHouseView.bindInicio(this.handleInicio);
        this.#storeHouseView.bindElemTiendas();
        this.#storeHouseView.bindMenuCategorias(this.handleMenuCategories);
        this.#storeHouseView.bindMenuTiendas(this.handleMenuShops);
        this.#storeHouseView.bindProductsCategoryList(this.handleProductsCategoryList);
        this.#storeHouseView.bindProductsStoreList(this.handleProductsStoreList);
        this.#storeHouseView.bindProductsStoreMenuList(this.handleProductsStoreList);
        this.#storeHouseView.bindDetalleProductos(this.handleshowDetailsProducts);
        this.#storeHouseView.bindProductosNuevaVentana(this.handleProductosNuevaVentana);
        this.#storeHouseView.bindCerrarVentanas(this.handleCerrarVentana);
    }

    //Invoco loadSHSingletonObjects mediante el onLoad()
    //despues de que se haya cargado el html.
    onLoad = () => {
        this.#loadSHSingletonObjects();
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaElemTiendas
    //que será la función encargada de pintar las tiendas.
    handleInicio = () => {
        let iteradorElemTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaElemTiendas(iteradorElemTiendas);
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaMenuCategorias
    //que será la función encargada de pintar la categorias en el nav.
    handleMenuCategories = () => {
        let iteradorCategorias = this.#storeHouseModel.categories;
        this.#storeHouseView.mostrarVistaMenuCategorias(iteradorCategorias);
    }

    //Recojo en una variable el iterador y se la paso a mostrarVistaMenuTiendas
    //que será la función encargada de pintar el listado de tiendas en el nav.
    handleMenuShops = () => {
        let iteradorTiendas = this.#storeHouseModel.shops;
        this.#storeHouseView.mostrarVistaMenuTiendas(iteradorTiendas);
    }

    //En StoreHouseModel.js he creado una función que me permite
    //conseguir el objeto categoria que quiero en función
    //del title pasado a handle que será a su vez el id del botón
    //al que pulso para ver los productos de la categoria.
    //Ese objeto categoria lo paso a su vez al getCategoryProducts
    //para poder conseguir los productos de dicha categoria.
    //Y ese generador lo paso a listProducts para poder pintar dichos productos
    //en el HTML.
    handleProductsCategoryList = (title) => {
        let categoria = this.#storeHouseModel.getCategory(title);
        this.#storeHouseView.listProducts(this.#storeHouseModel.getCategoryProducts(categoria));
    }

    //En StoreHouseModel.js he creado una función que me permite
    //conseguir el objeto tieda que quiero en función
    //del nombre pasado a handle que será a su vez el id del botón
    //al que pulso para ver los productos de la tienda.
    //Ese objeto tienda lo paso a su vez al getShopProducts
    //para poder conseguir los productos de dicha tienda.
    //Y ese generador lo paso a listProducts para poder pintar dichos productos
    //en el HTML.
    handleProductsStoreList = (nombre) => {
        let tienda = this.#storeHouseModel.getShop(nombre);
        this.#storeHouseView.listProducts(this.#storeHouseModel.getShopProducts(tienda));
    }

    //Recojo de bindDetalleProductos el id del botón que pulsemos y con ello
    //obtengo el objeto producto relacionado con ese nombre que recogemos en el id.
    //Ese objeto, en función del tipo que sea, llamaremos a un mostraDetalles u otro.
    handleshowDetailsProducts = (nombre) => {
        let producto = this.#storeHouseModel.getProduct(nombre);
        if (producto instanceof Videojuegos) {
            this.#storeHouseView.mostrarDetallesVideojuegos(producto);
        }
        else if (producto instanceof Consolas) {
            this.#storeHouseView.mostrarDetallesConsolas(producto);
        }
        else if (producto instanceof Accesorios) {
            this.#storeHouseView.mostrarDetallesAccesorios(producto);
        }
    }

    //Recojo de bindProductosNuevaVentana el id del botón que pulsemos y con ello
    //obtengo el objeto producto relacionado con ese nombre que recogemos en el id.
    //Ese objeto, en función del tipo que sea, llamaremos a un mostraDetalles u otro.
    handleProductosNuevaVentana = (nombre) => {
        let producto = this.#storeHouseModel.getProduct(nombre);
        if (producto instanceof Videojuegos) {
            this.#storeHouseView.mostrarDetallesVideojuegosNuevaVentana(producto);
        }
        else if (producto instanceof Consolas) {
            this.#storeHouseView.mostrarDetallesConsolasNuevaVentana(producto);
        }
        else if (producto instanceof Accesorios) {
            this.#storeHouseView.mostrarDetallesAccesoriosNuevaVentana(producto);
        }
    }

    //Recojo de bindCerrarVentanas el array websAbiertas y lo paso
    //a la función cerrarVentanas, que será la encargada de ir
    //cerrando todas las ventanas de producto que he ido abriendo
    handleCerrarVentana = (websAbiertas) => {
        this.#storeHouseView.cerrarVentanas(websAbiertas);
    }
}

export { storeHouseController };
