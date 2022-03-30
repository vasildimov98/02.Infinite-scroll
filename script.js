// Constants
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const photosArray = [];

// Unsplash Api Information
let imageToLoad = 5;
let initialLoad = true;
const apiKey = "U197PNUIMO4da5evgBICFds0nSRbKlloZfFOVpE7868";
let unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageToLoad}`;

// Create image loader function
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;

        if (!initialLoad && imageToLoad === 5) {
            imageToLoad = 30;
            unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageToLoad}`;
        }
    }
}

// Helper functions 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create anchor tag with image inside and attach it to image container
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = this.photosArray.length;
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
        // Add load function to image tag
        imageTag.addEventListener("load", imageLoaded);

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

// Check if reach the bottom of page and load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
