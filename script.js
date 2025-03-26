document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Package Modal Functionality
    const usePackageModal = document.getElementById('usePackageModal');
    if (usePackageModal) {
        usePackageModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract package name from data attribute
            const packageName = button.getAttribute('data-package-name');
            // Update the modal's content
            const modalTitle = usePackageModal.querySelector('.package-title');
            if (modalTitle && packageName) {
                modalTitle.textContent = packageName;
            }
        });
    }
    
    // Coupon Modal Functionality
    const useCouponModal = document.getElementById('useCouponModal');
    if (useCouponModal) {
        useCouponModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract coupon name from data attribute
            const couponName = button.getAttribute('data-coupon-name');
            // Update the modal's content
            const modalTitle = useCouponModal.querySelector('.coupon-title');
            if (modalTitle && couponName) {
                modalTitle.textContent = couponName;
            }
        });
    }
    
    // Package History Modal Functionality
    const packageHistoryModal = document.getElementById('packageHistoryModal');
    if (packageHistoryModal) {
        packageHistoryModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract package name from data attribute
            const packageName = button.getAttribute('data-package-name');
            // Update the modal's content
            const modalTitle = packageHistoryModal.querySelector('.history-package-title');
            if (modalTitle && packageName) {
                modalTitle.textContent = packageName;
            }
        });
    }

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
    
    // Form validation for package and coupon usage
    const packageForm = document.querySelector('#usePackageModal .modal-footer .btn-primary');
    if (packageForm) {
        packageForm.addEventListener('click', function() {
            const date = document.getElementById('serviceDate').value;
            const time = document.getElementById('serviceTime').value;
            const stylist = document.getElementById('stylist').value;
            
            if (!date || !time) {
                alert('กรุณาเลือกวันและเวลาที่ต้องการใช้บริการ');
                return;
            }
            
            // Simulate successful booking
            const modal = bootstrap.Modal.getInstance(document.getElementById('usePackageModal'));
            modal.hide();
            
            // Show success message
            const successToast = new bootstrap.Toast(document.createElement('div'));
            const toastContainer = document.createElement('div');
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '11';
            
            toastContainer.innerHTML = `
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-success text-white">
                        <strong class="me-auto">สำเร็จ</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        จองใช้แพ็คเกจเรียบร้อยแล้ว วันที่ ${date} เวลา ${time}
                    </div>
                </div>
            `;
            
            document.body.appendChild(toastContainer);
            setTimeout(() => {
                toastContainer.remove();
            }, 5000);
        });
    }
    
    // Form validation for coupon usage
    const couponForm = document.querySelector('#useCouponModal .modal-footer .btn-primary');
    if (couponForm) {
        couponForm.addEventListener('click', function() {
            const serviceType = document.getElementById('serviceType').value;
            const date = document.getElementById('couponDate').value;
            const time = document.getElementById('couponTime').value;
            
            if (serviceType === null || !date || !time) {
                alert('กรุณาเลือกบริการ วันและเวลาที่ต้องการใช้คูปอง');
                return;
            }
            
            // Simulate successful booking
            const modal = bootstrap.Modal.getInstance(document.getElementById('useCouponModal'));
            modal.hide();
            
            // Show success message
            const successToast = new bootstrap.Toast(document.createElement('div'));
            const toastContainer = document.createElement('div');
            toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '11';
            
            toastContainer.innerHTML = `
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header bg-success text-white">
                        <strong class="me-auto">สำเร็จ</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        จองใช้คูปองเรียบร้อยแล้ว วันที่ ${date} เวลา ${time}
                    </div>
                </div>
            `;
            
            document.body.appendChild(toastContainer);
            setTimeout(() => {
                toastContainer.remove();
            }, 5000);
        });
    }
});
