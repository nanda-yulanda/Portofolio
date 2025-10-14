// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ============================================
// SMOOTH SCROLLING
// ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20; // 20px extra padding
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after click
                    mobileMenu.classList.add('hidden');
                }
            });
        });

// ============================================
// ACTIVE MENU INDICATOR
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Hapus active class dari semua link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('text-pink-dark', 'font-semibold');
            });
            // Tambahkan active class ke link yang sedang aktif
            if (navLink) {
                navLink.classList.add('text-pink-dark', 'font-semibold');
            }
        }
    });
});

// ============================================
// ANIMASI SECTION SLIDE UP DARI BAWAH
// ============================================

// Fungsi untuk mengecek apakah elemen terlihat di viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const threshold = window.innerHeight * 0.15; // 15% dari tinggi viewport
    return (
        rect.top <= (window.innerHeight - threshold) &&
        rect.bottom >= threshold
    );
}

// Objek untuk melacak section mana yang sudah terlihat
const sectionStates = {};

// Fungsi untuk menambahkan/menghapus animasi slide up
function handleSectionAnimations() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const isVisible = isElementInViewport(section);
        
        if (isVisible) {
            // Jika section terlihat dan belum pernah ditandai sebagai visible
            if (!sectionStates[sectionId]) {
                section.classList.add('animate-visible');
                sectionStates[sectionId] = true;
                
                // Khusus untuk section skills, jalankan animasi progress bar
                if (sectionId === 'skills') {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 400); // Delay 400ms setelah section terlihat
                }
            }
        } else {
            // Jika section tidak terlihat lagi, reset animasi
            if (sectionStates[sectionId]) {
                section.classList.remove('animate-visible');
                sectionStates[sectionId] = false;
                
                // Reset skill bars jika section skills tidak terlihat
                if (sectionId === 'skills') {
                    resetSkillBars();
                }
            }
        }
    });
}

// ============================================
// ANIMASI PROGRESS BAR SKILLS
// ============================================

let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) {
        // Reset flag dan animasi ulang
        resetSkillBars();
    }
    
    const skillBars = document.querySelectorAll('#skills .skill-bar');
    
    skillBars.forEach((bar, index) => {
        // Delay bertahap untuk setiap bar
        setTimeout(() => {
            bar.classList.add('animate-width');
        }, index * 150); // 150ms delay antar skill
    });
    
    skillsAnimated = true;
}

function resetSkillBars() {
    const skillBars = document.querySelectorAll('#skills .skill-bar');
    
    skillBars.forEach(bar => {
        bar.classList.remove('animate-width');
    });
    
    skillsAnimated = false;
}

// ============================================
// EVENT LISTENERS
// ============================================

// Jalankan saat halaman dimuat
window.addEventListener('load', () => {
    handleSectionAnimations();
});

// Jalankan saat scroll dengan throttle untuk performance
let scrollTimeout;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleSectionAnimations();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================
// INTERSECTION OBSERVER (ALTERNATIF - LEBIH OPTIMAL)
// ============================================
// Jika browser mendukung Intersection Observer, gunakan ini
// untuk performa yang lebih baik

if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '-15% 0px -15% 0px', // Trigger saat 15% dari viewport
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const sectionId = section.getAttribute('id');
            
            if (entry.isIntersecting) {
                // Section masuk viewport
                section.classList.add('animate-visible');
                
                // Animasi khusus untuk skills section
                if (sectionId === 'skills' && !skillsAnimated) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 400);
                }
            } else {
                // Section keluar viewport - reset animasi
                section.classList.remove('animate-visible');
                
                // Reset skill bars
                if (sectionId === 'skills') {
                    resetSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe semua section
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ============================================
// GALLERY PROJECT DOCUMENTATION
// ============================================

// Data foto untuk setiap project
const projectGalleries = {
    project1: {
        title: "Tugas Akhir - Pemotong Bawang Otomatis",
        images: [
            "img/projects/project1/foto1.jpg",
            "img/projects/project1/foto2.jpg",
            "img/projects/project1/foto3.jpg"
        ]
    },
    project2: {
        title: "E-Commerce Website - Dealer Mobil",
        images: [
            "img/projects/project2/foto1.png",
            "img/projects/project2/foto2.png",
            "img/projects/project2/foto3.png"
        ]
    },
    project3: {
        title: "Utility Website - Kalkulator PLN",
        images: [
            "img/projects/project3/foto1.png",
            "img/projects/project3/foto2.png",
            "img/projects/project3/foto3.png"
        ]
    }
};

// Variabel global untuk tracking
let currentProject = null;
let currentImageIndex = 0;

// ============================================
// FUNGSI MEMBUKA GALLERY
// ============================================
function openGallery(projectId) {
    currentProject = projectId;
    currentImageIndex = 0;
    
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('hidden');
    
    // Disable scroll pada body
    document.body.style.overflow = 'hidden';
    
    // Load images
    loadGalleryImages();
    updateMainImage();
}

// ============================================
// FUNGSI MENUTUP GALLERY
// ============================================
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('hidden');
    
    // Enable scroll pada body
    document.body.style.overflow = '';
    
    currentProject = null;
    currentImageIndex = 0;
}

// ============================================
// FUNGSI LOAD GALLERY IMAGES
// ============================================
function loadGalleryImages() {
    const gallery = projectGalleries[currentProject];
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    
    // Clear thumbnails
    thumbnailContainer.innerHTML = '';
    
    // Generate thumbnails
    gallery.images.forEach((imagePath, index) => {
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'cursor-pointer rounded-lg overflow-hidden border-4 transition-all';
        thumbnailDiv.className += index === currentImageIndex 
            ? ' border-pink-dark' 
            : ' border-transparent hover:border-pink-light';
        
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = imagePath;
        thumbnailImg.alt = `${gallery.title} - Foto ${index + 1}`;
        thumbnailImg.className = 'w-20 h-20 object-cover';
        thumbnailImg.onclick = () => goToImage(index);
        
        thumbnailDiv.appendChild(thumbnailImg);
        thumbnailContainer.appendChild(thumbnailDiv);
    });
}

// ============================================
// FUNGSI UPDATE MAIN IMAGE
// ============================================
function updateMainImage() {
    const gallery = projectGalleries[currentProject];
    const mainImage = document.getElementById('mainImage');
    const imageCounter = document.getElementById('imageCounter');
    
    // Update main image
    mainImage.src = gallery.images[currentImageIndex];
    mainImage.alt = `${gallery.title} - Foto ${currentImageIndex + 1}`;
    
    // Update counter
    imageCounter.textContent = `${currentImageIndex + 1} / ${gallery.images.length}`;
    
    // Update thumbnail borders
    updateThumbnailBorders();
}

// ============================================
// FUNGSI UPDATE THUMBNAIL BORDERS
// ============================================
function updateThumbnailBorders() {
    const thumbnails = document.querySelectorAll('#thumbnailContainer > div');
    
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.className = 'cursor-pointer rounded-lg overflow-hidden border-4 border-pink-dark transition-all';
        } else {
            thumbnail.className = 'cursor-pointer rounded-lg overflow-hidden border-4 border-transparent hover:border-pink-light transition-all';
        }
    });
}

// ============================================
// FUNGSI NAVIGASI IMAGE
// ============================================
function nextImage() {
    const gallery = projectGalleries[currentProject];
    currentImageIndex = (currentImageIndex + 1) % gallery.images.length;
    updateMainImage();
}

function previousImage() {
    const gallery = projectGalleries[currentProject];
    currentImageIndex = (currentImageIndex - 1 + gallery.images.length) % gallery.images.length;
    updateMainImage();
}

function goToImage(index) {
    currentImageIndex = index;
    updateMainImage();
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    
    // Hanya jalankan jika modal terbuka
    if (!modal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'Escape') {
            closeGallery();
        }
    }
});

// ============================================
// CLOSE MODAL SAAT KLIK DI LUAR GAMBAR
// ============================================
document.getElementById('galleryModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeGallery();
    }
});