let main = document.querySelector('.main');

fetch('https://hotelbooking.stepprojects.ge/api/Hotels/GetAll').then(response => response.json()).then(response => renderHotels(response))


function renderHotels(arr) {
    main.innerHTML=""
     arr.forEach(hotels => {
       main.innerHTML+= `
         <div class="card" style="width: 600px;">
           <img src="${hotels.featuredImage}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">${hotels.name}</h5>
             <p class="card-text">${hotels.city}</p>
             <p class="card-text">${hotels.address}</p>
             <a href="./details.html?id=${hotels.id}" class="btn btn-primary">View Rooms</a>
           </div>
         </div>
         `
     });
 }


	
