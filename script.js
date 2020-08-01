/*
    Clean up code and add more comments. 
*/

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadMoreImage = false;
let isInitialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let initialCount = 5;
const apiKey = 'IF-3DQxB7hxcWfDadD7_oAIzA-18rzek80-b_m9L298';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

const updateAPIURLWithNewCount = (imgCount) => {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
};

// Check if all images were loaded
const checkImageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loadMoreImage = true;
  }
};

const handleInitialLoad = () => {
  isInitialLoad = false;
  loader.hidden = true;
  updateAPIURLWithNewCount(20);
};

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, { href: photo.links.html, target: '_blank' });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // called when image is load
    img.addEventListener('load', checkImageLoaded);

    // Put <img> inside <a>, then put both inside imageConainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get Photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

    if (isInitialLoad) {
      handleInitialLoad();
    }
  } catch (error) {
    // Catch Error Here
  }
};

// Check to see if scrolling near bottom of the page, Load More Photos
window.addEventListener('scroll', () => {
  /* innerHeight - the height of our browser window
        scrollY - how high we are from the top of the page
    */

  // only run if conditions are met and is ready
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadMoreImage
  ) {
    loadMoreImage = false;
    getPhotos();
  }
});

// On Load
getPhotos();
