let cont = document.querySelector(".cont")
let select = document.querySelector("#select")

let oldArr = []
let oldProduct = []

fetch("https://fakestoreapi.com/products")
.then(response => response.json())
.then(response => {
        oldArr = [...response]
        oldProduct = [...response]
        renderProduct(response)
})

function renderProduct(arr){
    cont.innerHTML = ""
    arr.forEach(product => {
        cont.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.category}</p>
            <p class="card-text">${product.price}</p>
            <p class="card-text">${product.rating.rate}</p>
            <a href="./details.html?id=${product.id}" class="btn btn-primary">See more</a>
          </div>

        </div>
        `
    });
}

select.addEventListener("change", function(){
    if (select.value == "1"){
        let sortedProduct = oldProduct.sort((a, b) => a.price - b.price)
        renderProduct(sortedProduct)
    }
    else if (select.value == "2"){
        let sortedProduct = oldProduct.sort((a, b) => b.price - a.price)
        renderProduct(sortedProduct)
    }
    else if (select.value == "3"){
        let sortedProduct = oldProduct.sort((a, b) => a.rating.rate - b.rating.rate)
        renderProduct(sortedProduct)
    }
    else if (select.value == "4"){
        let sortedProduct = oldProduct.sort((a, b) => b.rating.rate - a.rating.rate)
        renderProduct(sortedProduct)
    }
    else {
        renderProduct(oldArr)
    }
})
//