// Constants
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const photosArray = [];

// Unsplash Api Information
const count = 10;
const apiKey = "U197PNUIMO4da5evgBICFds0nSRbKlloZfFOVpE7868";
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Helper functions 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create anchor tag with image inside and attach it to image container
function displayPhotos() {
    // Go trough all photos from the response
    this.photosArray.forEach(photo => {
        // Create an <a> for the image
        const anchorTag = document.createElement("a");
        setAttributes(anchorTag, {
            href: photo.links.html,
            target: "_blank",
        });
        // Create an <img> for the photo
        const imageTag = document.createElement("img");
        setAttributes(imageTag, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        });

        // Put <img> inside <a>, then both inside image container
        anchorTag.appendChild(imageTag);
        imageContainer.appendChild(anchorTag);
    });
}

// Get Photos from UnsplashApi
async function getPhotos() {
    try {
        const response = await fetch(unsplashUrl);
        this.photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
} 

// On Load
getPhotos();
