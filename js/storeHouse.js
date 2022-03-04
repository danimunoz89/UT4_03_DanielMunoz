"use strict";

import { EmptyValueException, valueIncludedException, valueNotIncludedException, nullException, InvalidValueException, InvalidTypeObjectException } from "./errors.js";
import { Category } from "./category.js";
import { Coords } from "./coords.js";
import { Store } from "./store.js";
import { Product } from "./product.js";

class StoreHouse {
    //Creo una categoría y una tienda por defecto. Serán usadas
    //durante el ejercicio.
    #defaultShop = new Store(789456, "Tienda Por Defecto", "calle falsa", 1231723, new Coords("213123", "2431234"));
    #defaultCategory = new Category("Cat.Defecto", "Categoria Por Defecto");
    #nameStoreHouse;
    #shops;
    #categoriesStoreHouse;

    constructor(nameStoreHouse) {
        //Si el nombre del StoreHouse está vacio se lanzará una excepción.
        if (!nameStoreHouse) {
            throw new EmptyValueException("nameStoreHouse");
        }
        this.#nameStoreHouse = nameStoreHouse;
        this.#shops = [{ shop: this.#defaultShop, products: [] }];
        this.#categoriesStoreHouse = [{ category: this.#defaultCategory, products: [] }];
    }

    //Devuelve nombre del Almacen (StoreHouse)
    get nameStoreHouse() {
        return this.#nameStoreHouse;
    }

    //Settea un nuevo nombre para el Almacen (StoreHouse)
    set nuevoNameStoreHouse(newNameStoreHouse) {
        //Si el nombre está vacio se lanzará una excepción.
        if (!newNameStoreHouse) {
            throw new EmptyValueException("newNameStoreHouse");
        }
        this.#nameStoreHouse = newNameStoreHouse;
    }

    //Permite recorrer el conjunto de categorías que insertemos mediante un iterador.
    get categories() {
        let category = this.#categoriesStoreHouse;
        return {
            [Symbol.iterator]() {
                let nextIndex = 0;
                return {
                    next: function () {
                        return nextIndex < category.length ?
                            { value: category[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }
        }
    }

    //Permite recorrer el conjunto de tiendas que insertemos mediante un iterador.
    get shops() {
        let shop = this.#shops;
        return {
            [Symbol.iterator]() {
                let nextIndex = 0;
                return {
                    next: function () {
                        return nextIndex < shop.length ?
                            { value: shop[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }
        }
    }

    //Permite añadir una categoría nueva al StoreHouse. Devuelve el número de categorías
    //que hay insertadas. Recordar que hay una ya incluida (la de por defecto).
    addCategory(newCategory) {

        //Si la categoría es null, se lanzará una excepción.
        if (!newCategory) {
            throw new nullException("newCategory");
        }

        //Si newCategory no es del tipo Category se lanzará una excepción.
        if (!(newCategory instanceof Category)) {
            throw new InvalidTypeObjectException("newCategory", "category");
        }

        //Compruebo si la categoría está ya incluida
        let aux = -1;
        this.#categoriesStoreHouse.forEach((elem, index) => {
            if (elem.category.title === newCategory.title) {
                aux = index;
            }
        });

        //Si lo está, lanzo excepción.
        if (!(aux === -1)) {
            throw new valueIncludedException("newCategory");
        }

        //Si no lo está, agrego la categoría.
        this.#categoriesStoreHouse.push({ category: newCategory, products: [] });
        return this.#categoriesStoreHouse.length;
    }

    //Permite eliminar una Categoría del StoreHouse Al eliminar la categoría, sus productos
    //pasan a la categoría por defecto. Devuelve el nº de categorías que hay tras el borrado (incluye la de por defecto).
    removeCategory(categoryToDelete) {

        //Si categoryToDelete no es del tipo Category se lanzará una excepción.
        if (!(categoryToDelete instanceof Category)) {
            throw new InvalidTypeObjectException("categoryToDelete", "category");
        }

        let aux = -1;
        let arrayAux;

        //Compruebo si la categoría a borrar existe. Si existe, recojo la posición
        //que usaremos para borrar y guardo en una variable los productos asociados a
        //esa categoría (que pasarán a forma parte de la categoría por defecto).
        this.#categoriesStoreHouse.forEach((elem, index) => {
            if (elem.category.title === categoryToDelete.title) {
                aux = index;
                arrayAux = elem.products;
            }
        });

        //En caso de que la categoría a borrar no exista, lanzamos excepción
        if (aux === -1) {
            throw new valueNotIncludedException("categoryToDelete");
        }

        //Reocorro la #categoriesStoreHouse en busca de la categoría por defecto.
        //Una vez dentro, meto todos los productos que se encontraban en la categoría
        //que vamos a borrar.
        this.#categoriesStoreHouse.forEach((elem) => {
            if (elem.category.title === "Cat.Defecto") {
                arrayAux.forEach(element => {
                    elem.products.push({ product: element });
                });
            }
        });

        //Borro la categoría.
        this.#categoriesStoreHouse.splice(aux, 1);

        return this.#categoriesStoreHouse.length;
    }

    //Permite añadir un producto al StoreHouse. Devuelve el número de productos
    //que tiene esa categoría.
    addProduct(newProduct, categoryToCheck) {

        //Si el newProduct es nulo, se lanzará una excepción.
        if (!newProduct) {
            throw new nullException("newProduct");
        }

        //Si newProduct no es del tipo Product se lanzará una excepción.
        if (!(newProduct instanceof Product)) {
            throw new InvalidTypeObjectException("newProduct", "product");
        }

        //Si categoryToCheck no es del tipo Category se lanzará una excepción.
        if (!(categoryToCheck instanceof Category)) {
            throw new InvalidTypeObjectException("categoryToCheck", "category");
        }

        //Compruebo si la categoría está ya incluida
        let aux = -1;
        this.#categoriesStoreHouse.forEach((elem, index) => {
            if (elem.category.title === categoryToCheck.title) {
                aux = index;
            }
        });

        //Si no lo está, lanzo excepción.
        if (aux === -1) {
            throw new valueNotIncludedException("categoryToCheck");
        }

        let cantidad;
        let cifTiendaDefecto = this.#defaultShop.cif;

        //Si lo está, agrego el producto.
        this.#categoriesStoreHouse.forEach((elem) => {
            if (elem.category.title === categoryToCheck.title) {
                elem.products.push({ product: newProduct, store: cifTiendaDefecto });
                cantidad = elem.products.length;
            }
        });
        return cantidad;
    }

    //Permite eliminar un producto introducido en el StoreHouse con todas sus relaciones
    //con otros objetos del almacen. Devuelve el número de productos existentes en la categoría
    //tras el borrado.
    removeProduct(productToRemove) {

        //Si el productToRemove es nulo, se lanzará una excepción.
        if (!productToRemove) {
            throw new nullException("productToRemove");
        }

        //Si productToRemove no es del tipo Product se lanzará una excepción.
        if (!(productToRemove instanceof Product)) {
            throw new InvalidTypeObjectException("productToRemove", "product");
        }

        let pos;
        let cantidad;
        let auxCIF;

        //Busco si el producto está dentro de las categorias.
        //Si existe, recojo la posición en la que se encontraba para poder
        //borrarlo posteriormente. Recojo tambien el cif del
        //producto a borrar para poder determinar posteriormente el número de
        //productos existentes.

        this.#categoriesStoreHouse.forEach((elem) => {
            elem.products.forEach((item, index) => {
                if (item.product === productToRemove) {
                    pos = index
                    auxCIF = item.store;
                    elem.products.splice (pos, 1);
                }
            });
        });

        //Busco en las tiendas los productos que coincidan con el que vamos
        //a borrar.
        //Recojo la posición y realizo el borrado.

       let pos2;
        this.#shops.forEach((elem) => {
            elem.products.forEach((item, index) => {
                if (item.product === productToRemove.serialNumber) {
                    pos2 = index;
                    elem.products.splice (pos2, 1);
                }
            });
            if (elem.shop.cif === auxCIF) {
                cantidad = elem.products.length;
            }
        });

        return cantidad;
    }

    //Permite añadir un producto en una tienda y asignarle un nº de unidades.
    //Devuelve le número de productos existentes en la tienda.
    addProductInShop(newProduct, shopForProduct, number) {

        //Si el newProduct es nulo, se lanzará una excepción.
        if (!newProduct) {
            throw new nullException("newProduct");
        }

        //Si el shopForProduct es nulo, se lanzará una excepción.
        if (!shopForProduct) {
            throw new nullException("shopForProduct");
        }

        //Si newProduct no es del tipo Product se lanzará una excepción.
        if (!(newProduct instanceof Product)) {
            throw new InvalidTypeObjectException("newProduct", "product");
        }

        //Si shopForProduct no es del tipo Store se lanzará una excepción.
        if (!(shopForProduct instanceof Store)) {
            throw new InvalidTypeObjectException("shopForProduct", "store");
        }

        //Si el stock es negativo, se lanza excepción.
        if (number < 0) {
            throw new InvalidValueException("number");
        }

        //Compruebo que la tienda está incluida
        let aux = -1;
        this.#shops.forEach((elem, index) => {
            if (elem.shop.cif === shopForProduct.cif) {
                aux = index;
            }
        });

        //Si no lo está, se lanza una excepción.
        if (aux === -1) {
            throw new valueNotIncludedException("shopForProduct");
        }

        let cantidad;
        //Si lo está, añade a la tienda el producto con una cantidad.
        this.#shops.forEach((elem) => {
            if (elem.shop.cif === shopForProduct.cif) {
                elem.products.push({ product: newProduct.serialNumber, quantity: number });
                cantidad = elem.products.length;
            }
        });

        //Modifico el cif del producto en caso de que este tenga el de la tienda por defecto.
        this.#categoriesStoreHouse.forEach((elem) => {
            elem.products.forEach((item) => {
                if (item.product.serialNumber === newProduct.serialNumber) {
                    if (item.store === this.#defaultShop.cif) {
                        item.store = shopForProduct.cif;
                    }
                }
            });

        });
        return cantidad;
    }

    //Permite aumentar el número de unidades de un producto que esté dentro de una tienda.
    //Devuelve la cantidad de stock de la tienda.
    addQuantityProductInShop(newProduct, shopForProduct, newNumber) {
        //Si el newProduct es nulo, se lanzará una excepción.
        if (!newProduct) {
            throw new nullException("newProduct");
        }

        //Si el shopForProduct es nulo, se lanzará una excepción.
        if (!shopForProduct) {
            throw new nullException("shopForProduct");
        }

        //Si newProduct no es del tipo Product se lanzará una excepción.
        if (!(newProduct instanceof Product)) {
            throw new InvalidTypeObjectException("newProduct", "product");
        }

        //Si shopForProduct no es del tipo Store se lanzará una excepción.
        if (!(shopForProduct instanceof Store)) {
            throw new InvalidTypeObjectException("shopForProduct", "store");
        }

        //Si el stock es negativo, se lanza excepción.
        if (newNumber < 0) {
            throw new InvalidValueException("newNumber");
        }

        let aux = -1;
        let cantidad;

        if (newNumber === 0) {
            newNumber = 1;
        }

        //Busco que la tienda con la que vamos a trabajar esté incluida.
        //Recorro la tienda en busca de productos que coincidan con el que hemos
        //pasado como argumento. Si coincide, aumentamos su número de unidades.
        this.#shops.forEach((elem, index) => {
            if (elem.shop.cif === shopForProduct.cif) {
                aux = index;
                elem.products.forEach((item) => {
                    if (item.product === newProduct.serialNumber) {
                        let ayuda = item.quantity;
                        cantidad = ayuda + newNumber;
                        item.quantity = cantidad;
                    }
                });
            }
        });

        //En caso que no exista la tienda, lanzamos excepción.
        if (aux === -1) {
            throw new valueNotIncludedException("shopForProduct");
        }

        return cantidad;
    }

    //Muestra todos los productos de una misma categoria pasada una categoria.
    //Se mostrá también su stock. Si pasamos el tipo de producto también será filtrado.
    *getCategoryProducts(category, categoryProduct = Object) {
        //Si category es nulo, se lanzará una excepción.
        if (!category) {
            throw new nullException("category");
        }

        //Si category no es del tipo Category se lanzará una excepción.
        if (!(category instanceof Category)) {
            throw new InvalidTypeObjectException("category", "category");
        }

        //Para hacer este método me he apoyado en los generadores.

        //Busco que la tienda que hemos pasado coincida con una que ya tengamos incluida via cif.
        for (const elem of this.#categoriesStoreHouse) {
            if (elem.category.title === category.title) {
                //Busco aquellos productos que sean de la misma categoría que la que hemos pasado por argumento.
                for (const item of elem.products) {
                    if (item.product instanceof categoryProduct) {
                        //Recojo el id de la tienda y el serialNumber del producto encontrado.
                        let idStore = item.store;
                        let productSN = item.product.serialNumber;
                        //Con esta información, procedo a obtener el número de unidades del producto.
                        for (const elem2 of this.#shops) {
                            if (elem2.shop.cif === idStore) {
                                for (const item2 of elem2.products) {
                                    if (item2.product === productSN) {
                                        yield item.product.serialNumber + " : " + item.product.name + " : " + item2.quantity;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //Permite añadir una tienda nueva al StoreHouse
    addShop(newShop) {
        //Si newShop es nulo, se lanzará una excepción.
        if (!newShop) {
            throw new nullException("newShop");
        }

        //Si newShop no es del tipo Store se lanzará una excepción.
        if (!(newShop instanceof Store)) {
            throw new InvalidTypeObjectException("newShop", "store");
        }

        //Compruebo si la tienda está ya incluida
        let aux = -1;
        this.#shops.forEach((elem, index) => {
            if (elem.shop.cif === newShop.cif) {
                aux = index;
            }
        });

        //Si lo está, lanzo excepción.
        if (!(aux === -1)) {
            throw new valueIncludedException("newShop");
        }

        //Si no lo está, agrego la tienda.
        this.#shops.push({ shop: newShop, products: [] });
        return this.#shops.length;
    }

    //Permite eliminar una tienda del StoreHouse
    removeShop(shopToRemove) {
        
        //Si shopToRemove es nulo, se lanzará una excepción.
        if (!shopToRemove) {
            throw new nullException("shopToRemove");
        }

        //Si shopToRemove no es del tipo Store se lanzará una excepción.
        if (!(shopToRemove instanceof Store)) {
            throw new InvalidTypeObjectException("shopToRemove", "store");
        }

        let aux = -1;
        let cifDelete;
        let auxSN;
        let auxCantidad;
        
        //Compruebo si la tienda está incluida o no.
        //Si la tienda está incluida, recojo su posición para
        //eliminarla posteriormente.
        //Además, recojo el cif de la tienda a borrar. Será util para
        //modificar el cif de los productos asociados a la tienda que será borrada.
        //Tambien uso variables de apoyo para ir recogiendo el serialNumber y la cantidad
        //de los productos para, tras eliminarse la tienda, pasarlos a la tienda por defecto.
        this.#shops.forEach((elem, index) => {
            if (elem.shop.cif === shopToRemove.cif) {
                aux = index;
                cifDelete = elem.shop.cif;
                elem.products.forEach((elem3) => {
                    auxSN = elem3.product;
                    auxCantidad = elem3.quantity;
                    this.#shops.forEach((elem2) => {
                        if (elem2.shop.cif === this.#defaultShop.cif) {
                            elem2.products.push({ product: auxSN, quantity: auxCantidad});
                        }
                    });
                });
            }
        });

        //En caso que no exista la tienda, lanzamos excepción.
        if (aux === -1) {
            throw new valueNotIncludedException("shopToRemove");
        }
        
        //Borro la tienda.
        this.#shops.splice(aux, 1);

        //Modifico el cif de los productos que coincidan con
        //el cif de la tienda borrada. A esos productos le pongo el cif de la tienda por defecto.
        this.#categoriesStoreHouse.forEach((elem) => {
            elem.products.forEach((item) => {
                if (item.store === cifDelete) {
                    item.store = this.#defaultShop.cif;
                }
            });
        });

        return this.#shops.length;
    }

    //Muestra todos los productos de una misma tienda.
    //Se mostrá también su stock. Si pasamos el tipo de producto también será filtrado.
    *getShopProducts(shop, categoryProduct = Object) {

        //Si shop es nulo, se lanzará una excepción.
        if (!shop) {
            throw new nullException("shop");
        }

        //Si shop no es del tipo Store se lanzará una excepción.
        if (!(shop instanceof Store)) {
            throw new InvalidTypeObjectException("shop", "store");
        }

        //Para hacer este método me he apoyado en los generadores.

        //Busco que la tienda que hemos pasado coincida con una que ya tengamos incluida via cif.
        for (const elem of this.#categoriesStoreHouse) {
            for (const item of elem.products) {
                if (item.store === shop.cif) {
                    //Compruebo que los productos de esta tienda son del mismo tipo que el de la categoría
                    //que hemos pasado por argumentos.
                    if (item.product instanceof categoryProduct) {
                        yield item.product;
                    }
                }
            }
        }
    }
}

//Compruebo si el objeto StoreHouse está ya creado usando un patrón Singleton.
//En el caso de que no sea el caso, StoreHouse se instanciará a través de init.
//Y si ya se ha creado, te retorna la instancia previamente creada.

const SHSingleton = (function () {
    let instantiated;

    function init (nameStoreHouse) {
        let createdSH = new StoreHouse (nameStoreHouse);
        return createdSH;
    }

    return {
        getInstance: function (nameStoreHouse){
            if(!instantiated) {
                instantiated = init (nameStoreHouse);
            }
            return instantiated;
        },
    };
})();

//Exporto el Singleton para poder crear el storeHouse en el testing.
export {SHSingleton};