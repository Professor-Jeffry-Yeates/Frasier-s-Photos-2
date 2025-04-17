const photoInventory = []

// Populate holiday photos
function getPhotosBySeason(season, photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.season === season);
}
function getPhotosByCategory(category, photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.category === category);
}
function loadPhotosFromJson() {
    fetch('../JSON/inventory.json')
    .then((res) => res.json())
    .then((data) => {
        photoInventory.photos = []
        data.inventory.forEach(photo => {
            photoInventory.photos.push(photo);
        }) 
        populateHolidayPhotos();
    })
}
function retrievePhotosFromMemory() {
    let value = window.localStorage.getItem("photos");
    let success = false
    if ( value ) {
        let results = JSON.parse(value);
        if ( results) {
            photoInventory.photos = []
            results.forEach(photo => {
                photoInventory.photos.push(photo);
            }) 
            success = true
        }
    }
    if (success) {
        populateHolidayPhotos();
    } else {
        loadPhotosFromJson()
    }
}
function populateHolidayPhotos() {
    const holidays = ['christmas', 'easter', 'halloween', 'birthday'];
    
    holidays.forEach(holiday => {
        const grid = document.getElementById(`${holiday}-grid`);
        const holidayPhotos = getPhotosBySeason(holiday);
        
        holidayPhotos.forEach(photo => {
            const holidayItem = document.createElement('div');
            holidayItem.className = 'holiday-item';
            holidayItem.innerHTML = `
                <div class="photo-placeholder">Photo ${photo.id}</div>
                <img src="../photos/${photo.image}" alt="${photo.title}" class="holiday-photo" />
                <div class="overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                    <div class="price">$${photo.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${photo.id})">
                        Add to Cart
                    </button>
                </div>
            `;
            grid.appendChild(holidayItem);
        });
    });
}
// Initialize holiday photos
document.addEventListener('DOMContentLoaded', retrievePhotosFromMemory);