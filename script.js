/* =========================
   FOODVERSE - INTERACTIONS
========================= */

// 1. SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealElements.forEach(element => observer.observe(element));

// 2. NAVBAR SCROLL EFFECT
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// 3. MOBILE NAVBAR
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// 4. FOOD FILTER + SEARCH
const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");
const foodSearch = document.getElementById("foodSearch");
const emptyMessage = document.getElementById("emptyMessage");
let currentCategory = "all";
function filterFoods() {
    const searchValue = foodSearch.value.toLowerCase().trim();
    let visibleCount = 0;
    foodCards.forEach(card => {
        const categoryMatch = currentCategory === "all" || card.dataset.category === currentCategory;
        const searchMatch = card.dataset.name.includes(searchValue);
        const visible = categoryMatch && searchMatch;
        card.classList.toggle("hidden", !visible);
        if (visible) visibleCount++;
    });
    emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
}
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentCategory = button.dataset.category;
        filterFoods();
    });
});
foodSearch.addEventListener("input", filterFoods);

// 5. 3D FOOD CARD EFFECT
foodCards.forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth <= 750) return;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = (rect.height / 2 - y) / 18;
        const rotateY = (x - rect.width / 2) / 18;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// 6. COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1600;
        const startTime = performance.now();
        function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(updateCounter);
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.8 });
counters.forEach(counter => counterObserver.observe(counter));

// 7. BACK TO TOP
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 8. PARALLAX FEATURED IMAGE
const featuredImage = document.querySelector(".featured-image img");
window.addEventListener("scroll", () => {
    if (!featuredImage) return;
    const rect = featuredImage.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const movement = (window.innerHeight - rect.top) * 0.025;
        featuredImage.style.translate = `0 ${movement}px`;
    }
});

// 9. IMAGE FALLBACK
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
        img.style.background = "#D8C2A8";
        img.alt = "Gambar belum tersedia - cek folder images";
    });
});

// 10. WELCOME MESSAGE
console.log("FOODVERSE is ready!");


// 11. FOOD DETAIL POPUP
const foodDetails = {
    "rendang": { name: "Rendang", origin: "SUMATERA BARAT", description: "Hidangan daging khas Minangkabau yang dimasak perlahan bersama santan dan aneka rempah hingga bumbunya meresap.", ingredients: "Daging sapi, santan, cabai, serai, lengkuas, jahe, dan rempah-rempah.", taste: "Gurih, kaya rempah, sedikit pedas, dan aromatik.", story: "Rendang lekat dengan tradisi masyarakat Minangkabau dan sering hadir dalam acara adat maupun perayaan penting." },
    "nasi-goreng": { name: "Nasi Goreng", origin: "POPULER DI SELURUH INDONESIA", description: "Nasi yang dimasak kembali bersama bumbu, kecap, dan pelengkap sesuai selera. Setiap daerah dan keluarga bisa punya racikannya sendiri.", ingredients: "Nasi, bawang merah, bawang putih, cabai, kecap manis, telur, dan pelengkap pilihan.", taste: "Gurih, sedikit manis, dan harum bumbu tumis.", story: "Nasi goreng berkembang menjadi salah satu hidangan rumahan dan kaki lima yang sangat dikenal di Indonesia." },
    "sate-ayam": { name: "Sate Ayam", origin: "JAWA", description: "Potongan ayam yang ditusuk, dipanggang, lalu disajikan dengan saus kacang atau bumbu khas daerah.", ingredients: "Daging ayam, tusuk sate, bawang putih, kecap manis, kacang tanah, dan jeruk limau.", taste: "Smoky, gurih, dengan perpaduan saus kacang yang manis dan sedikit gurih.", story: "Sate punya banyak variasi di Nusantara. Sate ayam dengan saus kacang menjadi salah satu versi yang paling populer." },
    "soto-ayam": { name: "Soto Ayam", origin: "BERBAGAI DAERAH DI INDONESIA", description: "Hidangan berkuah berbahan ayam dengan racikan rempah. Penyajiannya berbeda-beda di tiap daerah.", ingredients: "Ayam, serai, kunyit, jahe, bawang, bihun atau soun, dan pelengkap seperti telur serta koya.", taste: "Hangat, gurih, segar, dan kaya aroma rempah.", story: "Soto memiliki banyak ragam daerah, mulai dari kuah bening hingga kuah kuning, dengan pelengkap yang khas." },
    "martabak": { name: "Martabak", origin: "POPULER DI SELURUH INDONESIA", description: "Nama martabak dikenal untuk beberapa jenis sajian, termasuk martabak telur yang gurih dan martabak manis dengan aneka topping.", ingredients: "Martabak telur: adonan kulit, telur, daun bawang, dan isian. Martabak manis: tepung, telur, susu, gula, dan topping.", taste: "Bisa gurih dan berbumbu atau manis dengan tekstur lembut.", story: "Martabak berkembang menjadi jajanan populer dengan banyak variasi isian dan gaya penyajian di berbagai kota." },
    "ayam-bakar": { name: "Ayam Bakar", origin: "BERBAGAI DAERAH DI INDONESIA", description: "Olahan ayam berbumbu yang dipanggang hingga matang, biasanya sambil diolesi bumbu agar meresap dan harum.", ingredients: "Ayam, bawang merah, bawang putih, ketumbar, kecap manis, serai, dan rempah pilihan.", taste: "Gurih, manis, sedikit smoky, dan kaya bumbu.", story: "Ayam bakar hadir dalam banyak versi Nusantara, dengan racikan bumbu dan sambal yang berbeda-beda." },
    "pempek": { name: "Pempek", origin: "PALEMBANG, SUMATERA SELATAN", description: "Makanan olahan ikan dan tepung sagu yang disajikan bersama kuah cuko bercita rasa asam, manis, dan pedas.", ingredients: "Ikan, tepung sagu, garam, air, gula merah, cuka, bawang putih, dan cabai.", taste: "Kenyal dan gurih, berpadu dengan cuko yang asam-manis-pedas.", story: "Pempek merupakan kuliner ikonik Palembang. Jenisnya beragam, seperti kapal selam, lenjer, adaan, dan kulit." },
    "rawon": { name: "Rawon", origin: "JAWA TIMUR", description: "Sup daging khas Jawa Timur dengan kuah gelap yang berasal dari penggunaan kluwek sebagai salah satu bumbu utamanya.", ingredients: "Daging sapi, kluwek, bawang merah, bawang putih, serai, lengkuas, dan tauge pendek.", taste: "Gurih, earthy, kaya rempah, dan memiliki aroma khas kluwek.", story: "Rawon dikenal sebagai salah satu hidangan khas Jawa Timur dan sering disajikan dengan nasi, tauge, telur asin, serta sambal." }
};

const foodModal = document.getElementById("foodModal");
const closeFoodModal = document.getElementById("closeFoodModal");
const modalFoodImage = document.getElementById("modalFoodImage");
let lastFocusedElement = null;

function openFoodModal(foodKey, card) {
    const detail = foodDetails[foodKey];
    if (!detail) return;
    lastFocusedElement = document.activeElement;
    const cardImage = card.querySelector(".food-image img");
    modalFoodImage.src = cardImage ? cardImage.getAttribute("src") : "";
    modalFoodImage.alt = detail.name;
    document.getElementById("modalFoodOrigin").textContent = detail.origin;
    document.getElementById("modalFoodName").textContent = detail.name;
    document.getElementById("modalFoodDescription").textContent = detail.description;
    document.getElementById("modalFoodIngredients").textContent = detail.ingredients;
    document.getElementById("modalFoodTaste").textContent = detail.taste;
    document.getElementById("modalFoodStory").textContent = detail.story;
    foodModal.classList.add("open");
    foodModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeFoodModal.focus();
}

function hideFoodModal() {
    foodModal.classList.remove("open");
    foodModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".food-detail-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".food-card");
        openFoodModal(button.dataset.food, card);
    });
});

closeFoodModal.addEventListener("click", hideFoodModal);
foodModal.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", hideFoodModal);
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && foodModal.classList.contains("open")) hideFoodModal();
});
