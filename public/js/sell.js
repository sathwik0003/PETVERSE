// const sellform = document.querySelector("#sellform")
// const listcontainer = document.querySelector("listcontainer")
// const productTableBody = document.querySelector('#productTableBody')
// const petsells = document.querySelector('#petsells')

// const products = []
// sellform.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const breed = document.querySelector('#breed').value
//     const age = document.querySelector('#age').value
//     const weight = document.querySelector('#weight').value
//     const price = document.querySelector('#price').value
//     const pic= document.querySelector('#pic').value
//     const des = document.querySelector('#tad').value
//     const add = document.querySelector('#add').value
//     const contact = document.querySelector('#contact').value
   


//     const product = {
//         breed,age,weight, price, pic, des,add, contact
//     }

//     products.push(product)
//     sellform.reset()
//     saveProductsToLocalStorage()
//     renderTable()
// })

// function renderTable() {

//     let productsHTML = ''
//     products.forEach(product => {
//         const productHtmlText = `<tr>
//              <td>${product.breed}</td>
//              <td>${product.age}</td>
//              <td>${product.weight}</td>
//              <td>${product.price}</td>
//              <td>${product.des}</td>
//              <td><img src="${product.pic}"></img></td></td>
             
//              <td>${product.add}</td>
//              <td>${product.contact}</td>
//          </tr>`

//         productsHTML += productHtmlText
//     })
//     productTableBody.innerHTML = productsHTML
// }

// function saveProductsToLocalStorage() {
//     localStorage.setItem("products", JSON.stringify(products))
// }