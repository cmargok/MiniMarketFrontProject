
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
getProductoCompleteInfo(productId);



function getProductoCompleteInfo(id) {
    fetch(`http://localhost:3000/Productos?ProductId=${id}`)
        .then(response => response.json())
        .then(data => {
            let producto = MapToProducto(data[0]);
            RenderizarProducto(producto);
        }
        );
}

function RenderizarProducto(producto) {

    const img = document.getElementById('productoImagen');
    img.src = producto.imagen;

    const titulo = document.getElementById('productoTitulo');
    titulo.textContent = producto.titulo;

    const precio = document.getElementById('productoPrecio');
    precio.textContent = producto.precio;

    const EnPromocion = document.querySelector('.promocion');
    if (!producto.promocion) {
        EnPromocion.style.display = 'none';
    } else {
        EnPromocion.style.display = 'block';
    }


    const descripcion = document.getElementById('productoDescripcion');
    descripcion.textContent = producto.descripcion;

    const cantidad = document.getElementById('productoCantidad');
    cantidad.textContent = producto.cantidad;

}
let ProductosList = {
    productos: []
};

let Producto = {
    imagen: "",
    titulo: "",
    precio: "",
    promocion: false,
    descripcion: "",
    cantidad: 0
};

function MapToProducto(JsonData) {
    let producto = Object.create(Producto);
    producto.imagen = JsonData.imagen;
    producto.titulo = JsonData.titulo;
    producto.precio = JsonData.precio;
    producto.promocion = JsonData.promocion;
    producto.descripcion = JsonData.descripcion;
    producto.cantidad = JsonData.cantidad;

    console.log(producto);
    return producto;
}


window.onload = function () {
    const img = document.getElementById('productoImagen');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    const sombra = document.getElementById('sombra');
    const cerrar = document.getElementById('cerrar');

    img.addEventListener('click', () => {
        popupImg.src = img.src;
        popup.style.display = 'block';
        sombra.style.display = 'block';
        cerrar.style.display = 'block';
        popupImg.style.display = 'block';

    });

    sombra.addEventListener('click', () => {
        popup.style.display = 'none';
        sombra.style.display = 'none';
        cerrar.style.display = 'none';
    });


    const cerrarPopup = document.querySelector('#cerrar');

    cerrarPopup.addEventListener('click', () => {
        popup.style.display = 'none';
        sombra.style.display = 'none';
        cerrar.style.display = 'none';
    });

};
