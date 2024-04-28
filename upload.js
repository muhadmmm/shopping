// upload.js

function previewImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('uploadPreview').style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

window.onload = () => {
    const uploadForm = document.getElementById('uploadForm');
    const confirmUploadButton = document.getElementById('confirmUpload');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(uploadForm); // Create a FormData object to easily send form data

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Image uploaded successfully');
                uploadForm.reset(); // Reset the form after successful upload
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    confirmUploadButton.addEventListener('click', () => {
        const caption = document.getElementById('caption').value;
        const price = document.getElementById('price').value;
        const imageSrc = document.getElementById('previewImage').src;

        const imageCards = document.getElementById('imageCards');
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${imageSrc}" alt="${caption}">
            <div class="card-body">
                <h2>${caption}</h2>
                <p>Price: ${price}</p>
            </div>
        `;
        imageCards.appendChild(card);

        document.getElementById('uploadPreview').style.display = 'none'; // Hide the upload preview
    });
};

