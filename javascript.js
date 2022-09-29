import { SaveProduct, onGetProducts, DeleteProduct, GetProduct, UpdateProduct } from './firebase.js'
const ProductsList = document.getElementById('bodyProductos')
const ProductsForm = document.getElementById('product-form')
const ProductModalAddBtn = document.getElementById('AddProductBtn')

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {

    onGetProducts((querySnapshot) => {

        let productsListener = ''

        querySnapshot.forEach(doc => {
            const products = doc.data()

            productsListener +=
                `
                    <tr>
                        <td>${products.code}</td>
                        <td>${products.descrip}</td>
                        <td>${products.cant}</td>
    
                        <td>
                        <button class="btn btn-outline-primary btn-edit" data-id='${doc.id}' data-bs-toggle="modal" data-bs-target="#exampleModal " ><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg> Editar</button> 
                        
                        <button class="btn btn-outline-danger btn-delete" data-id='${doc.id}'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg> Eliminar</button>
                        </td>
                    </tr>
                `
        })

        ProductsList.innerHTML = productsListener

        //Editar
        const btnEdit = ProductsList.querySelectorAll('.btn-edit')

        btnEdit.forEach(btn => {
            btn.addEventListener('click', async e => {
                const doc = await GetProduct(e.target.dataset.id)
                const products = doc.data()

                ProductsForm['codigo'].value = products.code
                ProductsForm['descripcion'].value = products.descrip
                ProductsForm['cantidad'].value = products.cant

                editStatus = true
                id = doc.id;

                ProductModalAddBtn.textContent = `Editar`
            })
        })

        //Eliminar
        const btnDelete = ProductsList.querySelectorAll('.btn-delete')
        btnDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                Swal.fire({
                    title: `¿Estas seguro de que quieres eliminar este producto? `,
                    text: "Esta acción no se podra revertir!",
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: `Borrar Producto`,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        DeleteProduct(dataset.id)
                    }
                })

            })
        })
    })


    ProductsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const codeProduct = ProductsForm['codigo'];
        const descProduct = ProductsForm['descripcion'];
        const cantProduct = ProductsForm['cantidad'];

        if (editStatus) {
            UpdateProduct(id, {
                code: codeProduct.value,
                descrip: descProduct.value,
                cant: cantProduct.value,
            });
            ProductModalAddBtn.innerText = `Producto editado`
            alert('Producto Editado')
        } else {
            SaveProduct(codeProduct.value, descProduct.value, cantProduct.value)
            ProductModalAddBtn.innerText = `Producto guardado`
            alert('Producto guardado')
        }
        ProductsForm.reset()
        editStatus = false
    })

})

let myModalEl = document.getElementById('exampleModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
    ProductsForm.reset()
    ProductModalAddBtn.innerText = `Guardar`
})


