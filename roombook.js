
let chidleft = document.querySelector(".chidleft")
let roomarray = []
let chatIcon = document.querySelector('#chat-icon');
let chatBox = document.querySelector('#chat-box');
let closeChat = document.querySelector('#close-chat');
let inpCheckin = document.querySelector(".inpCheckin")
let inpCheckOut = document.querySelector(".inpCheckOut")
let inpName = document.querySelector(".inpName")
let inpPhone = document.querySelector(".inpPhone")

let roomId = new URLSearchParams(window.location.search).get("id")
console.log("Room ID:", roomId)

let roomPrice = 0
let form = document.querySelector(".reservation-card")





inpCheckOut.addEventListener("input", function(){
    let CheckinDate = new Date(inpCheckin.value)
    let CheckOutDate = new Date(inpCheckOut.value)
    let diffDays = Math.ceil((CheckOutDate - CheckinDate) / (1000 * 60 * 60 * 24))
    roomPrice = diffDays * roomPrice
    document.querySelector(".price").textContent = `Total Price : ${roomPrice}$`
    
})
fetch(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${roomId}`)
  .then(resp => resp.json())
  .then(room => {
    renderproduct(room)
  })
  function renderproduct(room) {
    console.log(room)
    roomPrice = room.pricePerNight
    
    let carouselItemsHTML = ""
    room.images.forEach((image, index) => {
        carouselItemsHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image.source}" class="d-block w-100" alt="Room Image ${index + 1}">
            </div>`
    })

    chidleft.innerHTML = `
        <div id="carousel-room" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${carouselItemsHTML}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-room" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-room" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>`
}


form.addEventListener("submit", function(e){
    e.preventDefault();

    let postObj = {
        roomID: Number(roomId),
        checkInDate: inpCheckin.value,
        checkOutDate: inpCheckOut.value,
        totalPrice: roomPrice,
        isConfirmed: true,
        customerName: inpName.value,
        customerId: "123", 
        customerPhone: inpPhone.value
    };

    fetch("https://hotelbooking.stepprojects.ge/api/Booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
    .then(resp => {
        if (resp.status == 200) {
            showToast("Booked successfully!", 3000, "success");
        } else {
            showToast("Could not Book", 3000, "error");
        }
    })
    .catch(er => {
        showToast("Error: " + er, 3000, "error");
    });
});
function showToast(message, duration = 3000, type = "success") {
    let toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.textContent = message;

    document.getElementById("toast-container").appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, duration);
}

chatIcon.addEventListener('click', () => {
    chatBox.style.display = 'block';
});

closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

