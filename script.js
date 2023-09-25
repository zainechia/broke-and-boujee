/*-----------------------------------*\
  SIGNUP/LOGIN POPUP WINDOW
\*-----------------------------------*/

const popupContainer = document.querySelector('.popup-container');
const signupBox = document.querySelector(".signup-popup");
const loginBox = document.querySelector(".login-popup");

// Opening sign up box
document.querySelector("#profile-icon").addEventListener("click", function(){
  popupContainer.style.display = 'flex';
  signupBox.classList.add("active");
});

// Closing sign up box
document.querySelector("#signup-close-btn").addEventListener("click", function(){
  signupBox.classList.remove("active");
  popupContainer.style.display = 'none';
});

// Opening login box by clicking link in sign up box
document.querySelector("#login-link").addEventListener("click", function(){
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
});

// Closing login box
document.querySelector("#login-close-btn").addEventListener("click", function(){
  loginBox.classList.remove("active");
  popupContainer.style.display = 'none';
});

// Opening sign up box by clicking link in log in box
document.querySelector("#signup-link").addEventListener("click", function(){
  loginBox.classList.remove("active");
  signupBox.classList.add("active");
});

/*--------------------------------------------------*\
  SIGN UP/LOGIN FORM HANDLER
\*--------------------------------------------------*/
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Notify user that sign up and login functionality do not work yet
signupForm.addEventListener('submit', event =>{
  event.preventDefault();
  alert("Thanks for signing up but unfortunately at this point, we don't have backend functionality to handle sign ups :(");
});

loginForm.addEventListener('submit', event =>{
  event.preventDefault();
  alert("Thanks for logging in but unfortunately at this point, we don't have backend functionality to handle log ins :(");
});

/*--------------------------------------------------*\
  RESPONSIVE NAV BAR - HAMBURGER MENU, DROP DOWN MENU
\*--------------------------------------------------*/

// Get the navigation menu links element
const navMenuLinks = document.getElementsByClassName("nav-menu-links")[0];

// Get the toggle button element
const toggleButton = document.getElementsByClassName("toggle-button")[0];

// Get the toggle drop-down element
const toggleDropDown = document.querySelector("#gifts");

// Get the subnav element aka the dropdown menu
const subnav = document.querySelector(".sub-nav");

// Add event listener to toggle the active class on the navigation menu links
toggleButton.addEventListener('click', function(){
  navMenuLinks.classList.toggle('active');
});

// Add event listener to toggle the active class on the subnav element
toggleDropDown.addEventListener('click', function(){
  subnav.classList.toggle('active');
});

/*--------------------------------------------------*\
  PRODUCT PREVIEW/POPUP
\*--------------------------------------------------*/

const previewContainer = document.querySelector('.products-preview');
const previewBox = document.querySelectorAll('.preview');

// Iterate through each product in the DOM 
document.querySelectorAll('.products-container .product').forEach(product => {
  const productImage = product.querySelector('.image-container');
  const productTitle = product.querySelector('.product-title');
  const productPrice = product.querySelector('.price');

  // Only showPreview for clicking image, title, or price so as not to
  // interfere with the check-it-out button or heart icon
  productImage.onclick = showPreview;
  productTitle.onclick = showPreview;
  productPrice.onclick = showPreview;

  function showPreview() {
    previewContainer.style.display = 'block';

    let name = product.getAttribute('data-name');

    // Find the matching data-name in product with data-target in preview
    previewBox.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name == target) {
        preview.classList.add('active');
      }
    });
  }
});

// Detect for clicks on close button for preview boxes
previewBox.forEach(close =>{
  close.querySelector('.close-btn').onclick = () => {
    close.classList.remove('active');
    previewContainer.style.display = 'none';
  }
});

/*--------------------------------------------------*\
  PRODUCT PREVIEW/POPUP IMAGE CHANGER
\*--------------------------------------------------*/

// Itereate through only preview boxes in the DOM and change featured image src 
// to the src of image clicked
previewBox.forEach(preview => {
  const featuredImg = preview.querySelector('.img-featured img');
  const imgs = preview.querySelectorAll('.img-select img');

  imgs.forEach(img => {
    img.onclick = () => {
      featuredImg.setAttribute('src', img.getAttribute('src'));
    };
  });
});

/*--------------------------------------------------*\
  CONTACT US FORM VALIDATION
\*--------------------------------------------------*/

const contactUsForm = document.getElementById('contact-us-form');
const email = document.getElementById('contact-email');
const message = document.getElementById('message')
const errorMessage = document.getElementById('error-message');
// errorMessage appears on top of form as red padded square 

// isValidEmail() source code: https://codepen.io/FlorinPop17/pen/OJJKQeK
function isValidEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validateContactUsForm() {

  // trim emailValue so that we get rid of trailing whitespaces
  emailValue = email.value.trim()

  if (!isValidEmail(emailValue)) {
    errorMessage.innerHTML = "Please enter a valid email address";
    errorMessage.style.padding = '0.5rem';
    return false;
  } 

  // Check if at least 10 characters so as to make sure user puts in a
  // serious inquiry and not a troll remark
  if (message.value.length < 10) {
    errorMessage.innerHTML = "Please enter at least 10 characters in the message";
    errorMessage.style.padding = '0.5rem';
    return false;
  }

  alert("Thanks for submitting the form. We will be in touch with you soon.");
  return true;
};

/*--------------------------------------------------*\
  ADD TO WISHLIST
\*--------------------------------------------------*/

// Get data from localStorage, parse JSON string into JS array and store in productsInWishList
let productsInWishlist = JSON.parse(localStorage.getItem('Wishlist'));

// If there's no data in localStorage, set productsInWishList to empty array
// to prevent null error in updateProductsInWishList()
if (!productsInWishlist) {
  productsInWishlist = [];
}

const wishlistProducts = document.querySelector('.wishlist .products-container');
// const wishlistProductsPreview = document.querySelector(".wishlist .products-preview");
// --> wishlistProductsPreview NOT YET implemented thus commented out but it's my future plan.

const products = document.querySelectorAll('.product');
// Defined above (just putting here for reference): const previewBox = document.querySelectorAll('.preview');

// Update the wishlist HTML display
function updateWishlistHTML() {

  // Store productsInWishlist in localStorage in JSON string format
  localStorage.setItem('Wishlist', JSON.stringify(productsInWishlist));

  // Display a message saying the wishlist is empty if there are no productsInWishlist
  if (productsInWishlist.length <= 0) {
    document.querySelector('.wishlist .wishlist-status').style.display = 'block';
  }

  // Toggle heartIcon if product/preview is in the wishlist
  products.forEach(product => {
    const productID = product.getAttribute('data-name');
    const heartIcon = product.querySelector('.fa-heart');
    toggleHeartIcon(heartIcon, isProductInWishlist(productID));
  });

  previewBox.forEach(preview => {
    const productID = preview.getAttribute('data-target');
    const heartIcon = preview.querySelector('.fa-heart');
    toggleHeartIcon(heartIcon, isProductInWishlist(productID));
  });


  // Generate the HTML for wishlist products
  let result = productsInWishlist.map(product => {
    return `
    <div class="product" data-name="${product.id}">
      <div class="price">${product.price}</div>
      <div class="image-container">
        <img src="${product.image}">
      </div>
      <div class="product-title">
        <p>${product.title}</p>
      </div>
      <div class="link-wishlist">
        <a href="${product.link}" target="_blank" class="check-it-out">CHECK IT OUT</a>
        <a href="#" class="remove-wishlist">REMOVE</a>
      </div>
    </div>`
  });
  wishlistProducts.innerHTML = result.join('');
}

// Add product to wishlist
function addToWishlist(event) {

  // Can only add product if a heart icon has been clicked
  if (event.target.classList.contains('fa-heart')) {

    const product = event.target.closest('.product');
    const preview = event.target.closest('.preview');

    // Check whether the heart icon is in the product or preview
    if (product) {
      const productID = product.getAttribute('data-name');
      const productTitle = product.querySelector('.product-title').innerHTML;
      const productPrice = product.querySelector('.price').innerHTML;
      const productImage = product.querySelector('.image-container img').src;
      const productLink = product.querySelector('.link-wishlist a').href;

      let productToWishlist = {
        id: productID,
        title: productTitle,
        price: productPrice,
        image: productImage,
        link: productLink,
      }
      updateProductsInWishlist(productToWishlist);
      updateWishlistHTML();
      
    }

    else if(preview) {
      const productID = preview.getAttribute('data-target');
      const productTitle = preview.querySelector('.product-details h3').innerHTML;
      const productPrice = preview.querySelector('.price').innerHTML;
      const productImage = preview.querySelector('.img-featured img').src;
      const productLink = preview.querySelector('.product-details a').href;
      
      let productToWishlist = {
        id: productID,
        title: productTitle,
        price: productPrice,
        image: productImage,
        link: productLink,
      }

      updateProductsInWishlist(productToWishlist);

      updateWishlistHTML();
    }
  }
}

// Toggle heart icon based on wishlist status
function toggleHeartIcon(element, isActive) {
  if (isActive) {
    element.classList.add('active');
  } else {
    element.classList.remove('active');
  }
}

// Check if a product is in the wishlist
function isProductInWishlist(productId) {
  for (let i = 0; i < productsInWishlist.length; i++) {
    if (productsInWishlist[i].id === productId) {
      return true;
    }
  }
  return false;
}

// Update the wishlist products array
function updateProductsInWishlist(product) {
  if (isProductInWishlist(product.id)) {
    return; 
  }
  productsInWishlist.push(product);
}

// Add event listeners to products and preview elements
products.forEach(product => {
  product.addEventListener('click', addToWishlist)
});


previewBox.forEach(preview => {
  preview.addEventListener('click', addToWishlist)
});


// updateWishListHTML always running
updateWishlistHTML();


/*--------------------------------------------------*\
  REMOVE FROM WISHLIST
\*--------------------------------------------------*/

const removeButtons = document.querySelectorAll('.remove-wishlist');

// Remove Product from wishlist
function removeProductFromWishlist(event) {

  // Find the closest product that was clicked
  const productElement = event.target.closest('.product');

  // Get the ID of the product
  const productId = productElement.getAttribute('data-name');

  // Remove the product with the matching ID from the wishlist
  for (let i = 0; i < productsInWishlist.length; i++) {
    if (productsInWishlist[i].id === productId) {
      productsInWishlist.splice(i, 1);
      break;
    }
  }

  // Update the wishlist HTML
  updateWishlistHTML();
}

removeButtons.forEach(removeButton => {
  removeButton.addEventListener('click', event => {
    event.preventDefault(); 
    removeProductFromWishlist(event);
    location.reload(); //Reload so that wishlist item disappears instantly
  });
});