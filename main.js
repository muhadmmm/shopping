// main.js (Client-side)
window.onload = async () => {
    const response = await fetch('/images');
    const images = await response.json();
    const imageCards = document.getElementById('imageCards');
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${image.imagePath}" alt="${image.caption}">
            <h2>${image.caption}</h2>
            <p>Price: ${image.price}</p>
        `;
        imageCards.appendChild(card);
    });
};
