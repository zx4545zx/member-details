document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 * index);
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.dropdown-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterType = this.textContent.trim();
            
            // Update filter button text
            document.querySelector('.dropdown-toggle').innerHTML = `<i class="bi bi-funnel"></i> ${filterType}`;
            
            // Apply filtering logic here
            if (filterType === 'ทั้งหมด') {
                document.querySelectorAll('.service-item, .product-item, .package-item').forEach(item => {
                    item.style.display = 'block';
                });
            } else if (filterType === 'บริการ') {
                document.querySelectorAll('.service-item').forEach(item => {
                    item.style.display = 'block';
                });
                document.querySelectorAll('.product-item, .package-item').forEach(item => {
                    item.style.display = 'none';
                });
            } else if (filterType === 'สินค้า') {
                document.querySelectorAll('.product-item').forEach(item => {
                    item.style.display = 'block';
                });
                document.querySelectorAll('.service-item, .package-item').forEach(item => {
                    item.style.display = 'none';
                });
            } else if (filterType === 'แพ็คเกจ/โปรโมชั่น') {
                document.querySelectorAll('.package-item').forEach(item => {
                    item.style.display = 'block';
                });
                document.querySelectorAll('.service-item, .product-item').forEach(item => {
                    item.style.display = 'none';
                });
            }
        });
    });

    // Add date range picker functionality
    const dateRangeSelector = document.getElementById('dateRangeSelector');
    if (dateRangeSelector) {
        dateRangeSelector.addEventListener('change', function() {
            const selectedValue = this.value;
            // Apply date filtering logic here
            console.log('Selected date range:', selectedValue);
        });
    }

    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                // Search in services
                document.querySelectorAll('.service-item').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
                
                // Search in products
                document.querySelectorAll('.product-item').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
                
                // Search in packages
                document.querySelectorAll('.package-item').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
            } else {
                // If search term is too short, show all items
                document.querySelectorAll('.service-item, .product-item, .package-item').forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    }

    // Add print functionality
    const printButton = document.getElementById('printButton');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
});
