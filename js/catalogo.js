document.addEventListener("DOMContentLoaded", function () {
    // Aquí dentro llamamos la función que deseamos ejecutar al cargar la página
    GetProductosInfo(); // Por ejemplo, pasando el ID del producto que deseas cargar
    const productGrid = document.getElementById("product-grid");

    // Función para crear un producto
    function createProduct(product) {
        // Crear elementos HTML
        const productDiv = document.createElement("div");
        const image = document.createElement("img");
        const name = document.createElement("h3");
        const price = document.createElement("p");

        // Agregar contenido y atributos a los elementos
        image.src = product.imagen;
        name.textContent = product.titulo;
        price.textContent = `$${product.precio}`;

        productDiv.setAttribute("data-id", product.ProductId);

        // Agregar clases a los elementos
        productDiv.classList.add("product");


        // Agregar manejador de eventos click para redirigir a la página de detalles del producto
        productDiv.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            window.location.href = `producto.html?id=${productId}`;
        });






        // Agregar los elementos al contenedor de productos
        productDiv.appendChild(image);
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productGrid.appendChild(productDiv);
    }

    // Función para crear múltiples productos
    function createProducts(products) {
        // Limpiar el contenedor de productos
        productGrid.innerHTML = "";

        // Crear productos uno por uno
        for (let i = 0; i < products.length; i++) {
            createProduct(products[i]);
        }

        // Ajustar altura del contenedor para que no quede espacio en blanco debajo de los productos
        const productRows = Math.ceil(products.length / 4);
        productGrid.style.height = `${productRows * 400}px`;
    }


    // Obtener datos de la API (en este ejemplo se utiliza fetch)
    function GetProductosInfo() {
        fetch('http://localhost:3000/Productos')
            .then(response => response.json())
            .then(data => {
                let productos = MapToListOfProductos(data);
                createProducts(productos);
            }
            );
    }






});
function MapToListOfProductos(productos) {
    return productos.map(producto => MapToProducto(producto));
}



function MapToProducto(JsonData) {
    let producto = Object.create(Producto);
    producto.ProductId = JsonData.ProductId;
    producto.imagen = JsonData.imagen;
    producto.titulo = JsonData.titulo;
    producto.precio = JsonData.precio;
    return producto;
}

let Producto = {
    ProductId: 0,
    imagen: "",
    titulo: "",
    precio: "",
};







