// Main JavaScript for ProClean Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-negative-45');
        });
    }
    
    // Gallery modal
    const galleryItems = document.querySelectorAll('.gallery-category-item');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    let currentGallery = [];
    
    if (galleryItems.length > 0) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const gallery = this.closest('.gallery-category-grid');
                const allImages = gallery.querySelectorAll('img');
                
                currentGallery = Array.from(allImages);
                currentIndex = Array.from(allImages).indexOf(img);
                
                modal.style.display = 'flex';
                modalImg.src = img.src;
            });
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                modalImg.src = currentGallery[currentIndex].src;
            }
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', function() {
            if (currentIndex < currentGallery.length - 1) {
                currentIndex++;
                modalImg.src = currentGallery[currentIndex].src;
            }
        });
    }
    
    // Upload functionality
    const passwordForm = document.querySelector('.password-form');
    const uploadForm = document.querySelector('.upload-form');
    const fileInput = document.querySelector('#file-input');
    const previewContainer = document.querySelector('.preview-container');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress');
    const statusMessage = document.querySelector('.status-message');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = this.querySelector('input[type="password"]').value;
            
            // Simple password check - in production this should be server-side
            if (password === 'proclean123') {
                this.style.display = 'none';
                uploadForm.classList.add('active');
            } else {
                alert('Incorrect password. Please try again.');
            }
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            previewContainer.innerHTML = '';
            
            if (this.files) {
                Array.from(this.files).forEach(file => {
                    if (!file.type.match('image.*')) {
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        
                        const removeBtn = document.createElement('span');
                        removeBtn.className = 'preview-remove';
                        removeBtn.innerHTML = '×';
                        removeBtn.addEventListener('click', function() {
                            previewItem.remove();
                        });
                        
                        previewItem.appendChild(img);
                        previewItem.appendChild(removeBtn);
                        previewContainer.appendChild(previewItem);
                    };
                    
                    reader.readAsDataURL(file);
                });
            }
        });
    }
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const category = this.querySelector('#category').value;
            const files = fileInput.files;
            
            if (files.length === 0) {
                alert('Please select at least one image to upload.');
                return;
            }
            
            // In a real implementation, this would send files to the server
            // Here we simulate the upload process
            progressContainer.classList.add('active');
            let progress = 0;
            
            const interval = setInterval(function() {
                progress += 5;
                progressBar.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    statusMessage.innerHTML = 'Upload complete! Your images have been added to the gallery.';
                    statusMessage.className = 'status-message success-message';
                    
                    // Reset form after successful upload
                    setTimeout(function() {
                        uploadForm.reset();
                        previewContainer.innerHTML = '';
                        progressContainer.classList.remove('active');
                        progressBar.style.width = '0';
                        statusMessage.innerHTML = '';
                    }, 3000);
                }
            }, 100);
        });
    }
});
