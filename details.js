let main = document.querySelector('.main');
let priceSlider = document.querySelector('#price-range'); 
let priceSlider2 = document.querySelector('#price-range-to')
let priceValueDisplay = document.querySelector('.price #price-value');
let priceValue2Display = document.querySelector('.price #price-value2');
let roomtype = document.querySelector('#room-type');
let guestRangeSelect = document.querySelector('#guest-range');
let id = window.location.search.split("=")[1];
let allRooms = [];


fetch(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  .then(response => response.json())
  .then(hotel => renderHotelAndRooms(hotel));

function renderHotelAndRooms(hotel) {
    allRooms = hotel.rooms;

    main.innerHTML = `
        <div class="hotel-details">
            <img src="${hotel.featuredImage}" class="hotel-img" alt="${hotel.name}">
            <div class="hotel-info">
                <h2>${hotel.name}</h2>
                <p>${hotel.address}, ${hotel.city}</p>
            </div>
        </div>
        <h3>Available Rooms</h3>
        <div class="room-cards" id="room-cards-container">
        </div>
    `;

    renderRooms(allRooms); 
}

function renderRooms(rooms) {
    let roomContainer = document.querySelector('#room-cards-container');
    roomContainer.innerHTML = "";

    if (rooms.length === 0) {
        roomContainer.innerHTML = "<p>No rooms available for the selected filters.</p>";
    } else {
        rooms.forEach(room => {
            roomContainer.innerHTML += `
                <div class="card">
                    <img src="${room.images[0]?.source}" alt="${room.name}">
                    <div class="card-body">
                        <h5 class="card-title">${room.name}</h5>
                        <p class="card-text">Price: $${room.pricePerNight} per night</p>
                        <p class="card-text">Max Guests: ${room.maximumGuests}</p>
                        <a href="./rooms.html?id=${room.id}" class="btn btn-primary">Book Now</a>
                    </div>
                </div>
            `;
        });
    }
}

priceSlider.addEventListener('input', applyFilters); 
priceSlider2.addEventListener('input', applyFilters); 
roomtype.addEventListener('change', applyFilters);
guestRangeSelect.addEventListener('change', applyFilters);
priceSlider.value = 0;
priceSlider2.value = 1000;
function applyFilters() {

    let selectedType = roomtype.value;
    let roomTypeId = roomtype.value

    let selectedPrice = Number(priceSlider.value);
    let selectedPrice2 = Number(priceSlider2.value);   
    let priceFrom = selectedPrice;  
    let priceTo = selectedPrice2;

    let selectedGuestRange = guestRangeSelect.value;


    if (selectedType === "-1"){
        roomTypeId = null;
    }
    if (selectedGuestRange === "-1"){
        selectedGuestRange = null;
    }
    if (selectedPrice > selectedPrice2) {
        priceSlider2.value = selectedPrice;
        selectedPrice2 = selectedPrice;
    }
    let maximumGuests = selectedGuestRange !== '-1' ? Number(selectedGuestRange) : 0;

    priceValueDisplay.textContent = `$${selectedPrice}`;
    priceValue2Display.textContent = `$${selectedPrice2}`;

    let requestBody = {
        hotelId: Number(id),
        roomTypeId: roomTypeId,
        priceFrom: priceFrom,
        priceTo: priceTo,
        maximumGuests: maximumGuests,
    };

    fetch('https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        let filteredByHotel = data.filter(room => room.hotelId === Number(id));
        renderRooms(filteredByHotel);
    })
    .catch(error => console.error('Error fetching filtered rooms:', error));
}
