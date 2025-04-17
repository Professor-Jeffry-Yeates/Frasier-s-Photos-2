
// Sales data management
let salesData = [];
let filteredSalesData = [];

// Initialize sales data from localStorage or data.js
function initializeSalesData() {
    // Try to get sales data from localStorage first
    const storedSalesData = localStorage.getItem('FrazierSalesData');
    if (storedSalesData) {
        salesData = JSON.parse(storedSalesData);
    } else {
        // If no data in localStorage, use the sample data from data.js
        salesData = photoInventory.orders || [];
        // Save to localStorage for future use
        localStorage.setItem('FrazierSalesData', JSON.stringify(salesData));
    }
    
    // Initialize filtered data with all sales
    filteredSalesData = [...salesData];
    
    // Update the UI
    updateSalesSummary();
    populateSalesTable();
}
// Update sales summary statistics
function updateSalesSummary() {
    const totalSales = salesData.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = salesData.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const pendingOrders = salesData.filter(order => order.status === 'pending').length;
    document.getElementById('total-sales').textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('avg-order-value').textContent = `$${avgOrderValue.toFixed(2)}`;
    document.getElementById('pending-orders').textContent = pendingOrders;
}
// Populate sales table with data
function populateSalesTable() {
    const tableBody = document.getElementById('sales-table-body');
    const noDataMessage = document.getElementById('no-data-message');
    
    tableBody.innerHTML = '';
    
    if (filteredSalesData.length === 0) {
        noDataMessage.style.display = 'block';
        return;
    }
    
    noDataMessage.style.display = 'none';
    
    filteredSalesData.forEach(order => {
        const row = document.createElement('tr');
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString();
        
        // Get status badge class
        let statusClass = '';
        switch(order.status) {
            case 'completed':
                statusClass = 'status-completed';
                break;
            case 'pending':
                statusClass = 'status-pending';
                break;
            case 'cancelled':
                statusClass = 'status-cancelled';
                break;
        }
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${formattedDate}</td>
            <td>${order.customer.name}<br><small>${order.customer.email}</small></td>
            <td>${order.items.length} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
            <td>
                <button class="action-btn" onclick="viewOrderDetails('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
// Filter sales data based on selected filters
function filterSalesData() {
    const statusFilter = document.getElementById('status-filter').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const customerFilter = document.getElementById('customer-filter').value.toLowerCase();
    
    filteredSalesData = salesData.filter(order => {
        // Status filter
        if (statusFilter !== 'all' && order.status !== statusFilter) {
            return false;
        }
        
        // Date range filter
        if (startDate && endDate) {
            const orderDate = new Date(order.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // End of day
            
            if (orderDate < start || orderDate > end) {
                return false;
            }
        }
        
        // Customer filter
        if (customerFilter) {
            const customerName = order.customer.name.toLowerCase();
            const customerEmail = order.customer.email.toLowerCase();
            
            if (!customerName.includes(customerFilter) && !customerEmail.includes(customerFilter)) {
                return false;
            }
        }
        
        return true;
    });
    
    populateSalesTable();
}
// View order details
function viewOrderDetails(orderId) {
    const order = salesData.find(o => o.id === orderId);
    if (order) {
        let itemsList = '';
        order.items.forEach(item => {
            const photo = photoInventory.photos.find(p => p.id === item.photoId);
            const photoTitle = photo ? photo.title : 'Unknown Photo';
            itemsList += `${photoTitle} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        alert(`Order Details:\n\nOrder ID: ${order.id}\nDate: ${order.date}\nCustomer: ${order.customer.name}\nEmail: ${order.customer.email}\n\nItems:\n${itemsList}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}`);
    }
}
// Update order status
function updateOrderStatus(orderId) {
    const order = salesData.find(o => o.id === orderId);
    if (order) {
        const newStatus = prompt(`Current status: ${order.status}\nEnter new status (completed, pending, cancelled):`, order.status);
        
        if (newStatus && ['completed', 'pending', 'cancelled'].includes(newStatus.toLowerCase())) {
            order.status = newStatus.toLowerCase();
            
            // Update in localStorage
            localStorage.setItem('FrazierSalesData', JSON.stringify(salesData));
            
            // Update UI
            updateSalesSummary();
            populateSalesTable();
        }
    }
}
// Refresh sales data
function refreshSalesData() {
    // In a real application, this would fetch data from a server
    // For this demo, we'll just reload from localStorage
    initializeSalesData();
    alert('Sales data refreshed!');
}
// Export sales data to CSV
function exportSalesData() {
    if (filteredSalesData.length === 0) {
        alert('No data to export!');
        return;
    }
    
    // Create CSV content
    let csvContent = 'Order ID,Date,Customer Name,Customer Email,Items,Total,Status\n';
    
    filteredSalesData.forEach(order => {
        const itemsCount = order.items.length;
        const itemsText = order.items.map(item => {
            const photo = photoInventory.photos.find(p => p.id === item.photoId);
            return `${photo ? photo.title : 'Unknown'} (${item.quantity})`;
        }).join('; ');
        
        csvContent += `${order.id},${order.date},${order.customer.name},${order.customer.email},"${itemsText}",${order.total},${order.status}\n`;
    });
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set up the download link
    link.setAttribute('href', url);
    link.setAttribute('download', `Frazier_sales_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}