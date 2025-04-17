// Photo inventory data
const photoInventory = {
    photos: [
        {
            id: 1,
            sku: "SKU001",
            title: "Spring Bloom",
            description: "Fraisure playing among cherry blossoms",
            price: 29.99,
            salePrice: 24.99,
            category: "seasonal",
            season: "spring",
            image: "photo1.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: true,
            discontinued: false,
            visible: true
        },
        {
            id: 2,
            sku: "SKU002",
            title: "Summer Beach Day",
            description: "Fraisure enjoying the waves",
            price: 34.99,
            category: "standard",
            season: "summer",
            image: "photo2.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: true
        },
        {
            id: 3,
            sku: "SKU003",
            title: "Autumn Leaves",
            description: "Fraisure in a pile of colorful leaves",
            price: 29.99,
            category: "seasonal",
            season: "autumn",
            image: "photo3.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: true
        },
        {
            id: 4,
            sku: "SKU004",
            title: "Winter Wonderland",
            description: "Fraisure playing in the snow",
            price: 34.99,
            category: "seasonal",
            season: "winter",
            image: "photo4.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: true,
            visible: true
        },
        {
            id: 5,
            sku: "SKU005",
            title: "Christmas Spirit",
            description: "Fraisure with Santa hat",
            price: 39.99,
            category: "holiday",
            season: "winter",
            image: "photo5.jpg",
            inStock: false,
            quantity: 0,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: true
        },
        {
            id: 6,
            title: "Halloween Fun",
            sku: "SKU006",
            description: "Fraisure in a cute pumpkin costume",
            price: 39.99,
            category: "holiday",
            season: "autumn",
            image: "photo6.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: true
        },
        {
            id: 7,
            title: "Easter Bunny",
            sku: "SKU007",
            description: "Fraisure with bunny ears",
            price: 39.99,
            category: "holiday",
            season: "spring",
            image: "photo7.jpg",
            inStock: true,
            quantity: 4,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: false
        },
        {
            id: 8,
            title: "Birthday Celebration",
            sku: "SKU008",
            description: "Fraisure with party hat",
            price: 44.99,
            category: "special",
            season: "summer",
            image: "photo8.jpg",
            inStock: true,
            quantity: 10,
            reorderPoint: 5,
            reorder: 5,
            backOrder: 0,
            onSale: false,
            discontinued: false,
            visible: true
        }
    ],
    orders: [
        {
            id: "ORD001",
            date: "2024-03-15",
            customer: {
                name: "John Doe",
                email: "john@example.com"
            },
            items: [
                {
                    photoId: 1,
                    quantity: 1,
                    price: 29.99
                }
            ],
            total: 29.99,
            status: "completed"
        },
        {
            id: "ORD002",
            date: "2024-03-20",
            customer: {
                name: "Jane Smith",
                email: "jane@example.com"
            },
            items: [
                {
                    photoId: 3,
                    quantity: 2,
                    price: 29.99
                },
                {
                    photoId: 6,
                    quantity: 1,
                    price: 39.99
                }
            ],
            total: 99.97,
            status: "completed"
        },
        {
            id: "ORD003",
            date: "2024-04-05",
            customer: {
                name: "Robert Johnson",
                email: "robert@example.com"
            },
            items: [
                {
                    photoId: 2,
                    quantity: 1,
                    price: 34.99
                }
            ],
            total: 34.99,
            status: "pending"
        },
        {
            id: "ORD004",
            date: "2024-04-10",
            customer: {
                name: "Emily Davis",
                email: "emily@example.com"
            },
            items: [
                {
                    photoId: 5,
                    quantity: 1,
                    price: 39.99
                },
                {
                    photoId: 7,
                    quantity: 1,
                    price: 39.99
                },
                {
                    photoId: 8,
                    quantity: 1,
                    price: 44.99
                }
            ],
            total: 124.97,
            status: "pending"
        },
        {
            id: "ORD005",
            date: "2024-04-15",
            customer: {
                name: "Michael Wilson",
                email: "michael@example.com"
            },
            items: [
                {
                    photoId: 4,
                    quantity: 1,
                    price: 34.99
                }
            ],
            total: 34.99,
            status: "cancelled"
        },
        {
            id: "ORD006",
            date: "2024-04-20",
            customer: {
                name: "Sarah Brown",
                email: "sarah@example.com"
            },
            items: [
                {
                    photoId: 1,
                    quantity: 1,
                    price: 29.99
                },
                {
                    photoId: 2,
                    quantity: 1,
                    price: 34.99
                },
                {
                    photoId: 3,
                    quantity: 1,
                    price: 29.99
                },
                {
                    photoId: 4,
                    quantity: 1,
                    price: 34.99
                }
            ],
            total: 129.96,
            status: "completed"
        }
    ]
};

// Helper functions for inventory management
function getPhotoById(id, photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.id === id);
}
function getPhotoBySku(sku, photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.sku === sku);
}
function getPhotoByName(name, photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.name === name);
}
function getPhotoByDiscontinued(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.discontinued === true);
}
function getPhotoByOnSale(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.onSale === true);
}
function getPhotoByInvisible(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.visible === false);
}
function getPhotoByVisible(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.visible === true);
}
function getPhotoByInStock(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.inStock === true);
}
function getPhotoByCurrentlyAvailable(photos=[]) {
    if (photos.length === 0) {
        photos = photoInventory.photos;
    }
    return photos.filter(photo => photo.visible === true && photo.inStock === true);
}
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
function discontinuePhoto(id) {
    const index = photoInventory.photos.findIndex(p => p.id === id);
    if (index !== -1) {
        photoInventory.photos[index].discontinued = !photoInventory.photos[index].discontinued;
        populateInventoryTable();
    }
}
function hidePhoto(id) {
    const index = photoInventory.photos.findIndex(p => p.id === id);
    if (index !== -1) {
        photoInventory.photos[index].visible = !photoInventory.photos[index].visible;
        populateInventoryTable();
    }
}
function updatePhotoStock(id) {
    const photo = getPhotoById(id);
    if (photo) {
        photo.inStock = photo.quantity > 0;
    }
}
// Populate inventory table
function populateInventoryTable() {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    photoInventory.photos.forEach(photo => {
        const row = document.createElement('tr');
        if (!photo.visible) {
            row.classList.add('status-invisible');
        }
        photo.inStock = photo.quantity > 0 ? true : false;
        let eachRow = ""
        let category = photo.category.charAt(0).toUpperCase() + photo.category.slice(1);
        let season = photo.season.charAt(0).toUpperCase() + photo.season.slice(1);
        if (category != 'Standard' && season != 'All Season') {
            category += " - " + season;
        }
        let actualPrice = parseFloat(photo.price).toFixed(2);
        let price = "$"+actualPrice;
        if (photo.onSale) {
            let salePrice = parseFloat(photo.salePrice).toFixed(2);
            price = `<i class="status-on-sale">$${salePrice}</i>`;
            category = `<span>${category}<i class="small-text"> (Sale)</i></span>`;
        }
        let status = "In Stock";
        if (photo.discontinued) {
            status = `<i class="status-discontinued">Discontinued</i>`;
        }
        else if (!photo.inStock) {
            status = `<i class="status-out-of-stock">Out of Stock</i>`;
        }
        else if (photo.inStock && photo.quantity <= photo.reorderPoint) {
            status = `<i class="status-low-stock">Low Stock</i>`;
        }
        else if (photo.onSale) {
            status = `<i class="status-on-sale">On Sale</i>`;
        }
        status += ` (${photo.quantity})`;
        eachRow = `
            <td>${photo.id}</td>
            <td>${photo.sku}</td>
            <td>${status}</td>
            <td>${photo.title}</td>
            <td>${category}</td>
            <td>${price}</td>
            <td>${photo.image}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editPhoto(${photo.id})">
                    <i class="fas fa-edit"></i> </button>`

        if (photo.discontinued) {
                eachRow += `<button class="action-btn good-btn" onclick="discontinuePhoto(${photo.id})">
            <i class="fas fa-trash"></i> </button>`
        }
        else {
                eachRow += `<button class="action-btn discontinue-btn" onclick="discontinuePhoto(${photo.id})">
            <i class="fas fa-trash"></i> </button>`
        }
        if (photo.visible) {
            eachRow += `
                <button class="action-btn warning-btn" onclick="hidePhoto(${photo.id})">
                    <i class="fas fa-eye-slash"></i> </button>`
        }
        else {
            eachRow += `
                <button class="action-btn good-btn" onclick="hidePhoto(${photo.id})">
                    <i class="fas fa-eye"></i> </button>`
        }
        eachRow += `</td>`
        row.innerHTML = eachRow
        tableBody.appendChild(row);
    });
}
// Modal functions
function openAddPhotoModal() {
    document.getElementById('modalTitle').textContent = 'Add New Photo';
    document.getElementById('photoForm').reset();
    document.getElementById('photoModal').style.display = 'block';
    // let photoID = document.getElementById('photoId');
    // photoID.value = "";
    // photoID.disabled = true;
    // photoID.style.display = "none";
}
function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
}
function editPhoto(id) {
    const photo = photoInventory.photos.find(p => p.id === id);
    if (photo) {
        document.getElementById('modalTitle').textContent = 'Edit Photo';
        document.getElementById('photoId').value = photo.id;
        document.getElementById('photoTitle').value = photo.title;
        document.getElementById('photoSku').value = photo.sku;
        document.getElementById('photoDescription').value = photo.description;
        document.getElementById('photoName').value = photo.image;
        document.getElementById('photoPrice').value = photo.price;
        document.getElementById('photoSalePrice').value = photo.salePrice;
        document.getElementById('photoCategory').value = photo.category;
        document.getElementById('photoSeason').value = photo.season;
        document.getElementById('photoStatus').value = photo.inStock;
        document.getElementById('photoQuantity').value = photo.quantity;
        document.getElementById('photoReorderPoint').value = photo.reorderPoint;
        document.getElementById('photoReorder').value = photo.reorder;
        document.getElementById('photoBackOrder').value = photo.backOrder;
        document.getElementById('photoVisible').value = photo.visible;
        document.getElementById('photoOnSale').value = photo.onSale;
        document.getElementById('photoDiscontinued').value = photo.discontinued;
        document.getElementById('photoModal').style.display = 'block';
    }
}

function handlePhotoSubmit(event) {
    event.preventDefault();
    photoImageName = document.getElementById('photoName').value;
    if ( photoImageName.length === 0 ) {
        photoImageName = "MissingPhoto.jpg"
    } else {
        let dotIndex = photoImageName.indexOf('.');
        if (dotIndex === -1) {
            photoImageName += ".jpg";
        }
    }
    let price = document.getElementById('photoPrice').value;
    let salePrice = document.getElementById('photoSalePrice').value;
    if (salePrice.length === 0 ) {
        salePrice = price;
    }
    price = parseFloat(price);
    salePrice = parseFloat(salePrice);

    let quantity = document.getElementById('photoQuantity').value;
    if (quantity.length === 0 ) {
        quantity = 10;
    } else {
        quantity = parseInt(quantity);
        if (quantity < 0) {
            quantity = 0;
        }
    }
    let reorderPoint = document.getElementById('photoReorderPoint').value;
    if (reorderPoint.length === 0 ) {
        reorderPoint = 5;
    } else {
        reorderPoint = parseInt(reorderPoint);
        if (reorderPoint < 0) {
            reorderPoint = 0;
        }
    }
    let reorder = document.getElementById('photoReorder').value;
    if (reorder.length === 0 ) {
        reorder = 5;
    } else {
        reorder = parseInt(reorder);
        if (reorder < 0) {
            reorder = 0;
        }
    }
    let backOrder = document.getElementById('photoBackOrder').value;
    if (backOrder.length === 0 ) {
        backOrder = 0;
    } else {
        backOrder = parseInt(backOrder);
        if (backOrder < 0) {
            backOrder = 0;
        }
    }
    let visible = document.getElementById('photoVisible').value
    visible = visible === "true" ? true : false;
    let onSale = document.getElementById('photoOnSale').value
    onSale = onSale === "true" ? true : false;
    let discontinued = document.getElementById('photoDiscontinued').value
    discontinued = discontinued === "true" ? true : false;
    
    const formData = {
        title: document.getElementById('photoTitle').value,
        sku: document.getElementById('photoSku').value,
        description: document.getElementById('photoDescription').value,
        image: photoImageName,
        price: price,
        salePrice: salePrice,
        category: document.getElementById('photoCategory').value,
        season: document.getElementById('photoSeason').value,
        quantity: quantity,
        reorderPoint: reorderPoint,
        reorder: reorder,
        backOrder: backOrder,
        visible: visible,
        onSale: onSale,
        discontinued: discontinued
    };
    // Add or update photo
    if (document.getElementById('modalTitle').textContent === 'Add New Photo') {
        let newID = 0;
        photoInventory.photos.forEach(eachPhoto => {
            if (eachPhoto.id >= newID) {
                newID = eachPhoto.id;
            }
        })
        formData.id = newID+1;
        photoInventory.photos.push(formData);
    } else {
        const id = parseInt(document.getElementById('photoId').value);
        const index = photoInventory.photos.findIndex(p => p.id === id);
        if (index !== -1) {
            // photoInventory.photos[index] = { ...photoInventory.photos[index], ...formData };
            formData.id = id;
            photoInventory.photos[index] = formData;
        }
    }
    populateInventoryTable();
    closePhotoModal();
    placePhotosIntoMemory()
}

// JSON Access
function savePhotosToJson() {
 // save the photos to a JSON file at "../JSON/inventory.json"
    const json = JSON.stringify({ inventory: photoInventory.photos }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.json'; // Goes into Downloads folder
    a.click();
    URL.revokeObjectURL(url);

}
function placePhotosIntoMemory() {
    let value = JSON.stringify(photoInventory.photos);
    window.localStorage.setItem("photos", value);
}
function retrievePhotosFromMemory() {
    let value = window.localStorage.getItem("photos");
    if ( value ) {
        let results = JSON.parse(value);
        if ( results) {
            photoInventory.photos = []
            results.forEach(photo => {
                photoInventory.photos.push(photo);
            }) 
        }
    }
    populateInventoryTable();
}
function loadPhotosFromJson() {
    fetch('../JSON/inventory.json')
    .then((res) => res.json())
    .then((data) => {
        photoInventory.photos = []
        data.inventory.forEach(photo => {
            photoInventory.photos.push(photo);
        }) 
        populateInventoryTable();
    })
}

// Helper functions for order management
function getOrderById(id) {
    return photoInventory.orders.find(order => order.id === id);
}

function createOrder(customer, items) {
    const order = {
        id: `ORD${String(photoInventory.orders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        customer,
        items,
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: "pending"
    };
    photoInventory.orders.push(order);
    return order;
}

function updateOrderStatus(orderId, status) {
    const order = getOrderById(orderId);
    if (order) {
        order.status = status;
    }
} 
// Initialize inventory table
document.addEventListener('DOMContentLoaded', retrievePhotosFromMemory);