let main = document.querySelector("main")
let id = window.location.search.split("=")[1]

fetch(`https://fakestoreapi.com/products/${id}`)
.then(resp => resp.json())
.then(resp => renderProduct(resp))


function renderProduct(product){
        main.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.category}</p>
            <p class="card-text">${product.price}</p>
            <p class="card-text">${product.rating.rate}</p>
            <a href="./index.html" class="btn btn-primary">Go Back</a>
          </div>

        </div>
        `
}