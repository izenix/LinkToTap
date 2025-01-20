function addToCart() {
    const productElement = event.target.closest(".single-product");
    const id = productElement.getAttribute("data-id"); // Use the unique ID
    const name = productElement.getAttribute("data-name");
    const price = parseFloat(productElement.getAttribute("data-price"));
    const image = productElement.getAttribute("data-image");

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        // If product exists, increase its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product doesn't exist, add a new item
        const cartItem = { id, name, price, image, quantity: 1 };
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);

    // Update mini-cart
    updateMiniCart();

    // Recalculate cart totals
    calculateCartTotals();

    // Recalculate minicart totals
    calculateminiCartTotals();

}

document.addEventListener("DOMContentLoaded", function () {
    // Populate cart and mini-cart on page load
    populateCartTable();
    updateMiniCart();
    calculateCartTotals();
    calculateminiCartTotals();
});

// Modal Cart Start
function modalcart(event) {
    const tableBody = document.getElementById("modalbody");
    if (!tableBody) {
        console.error("Element with ID 'modalbody' not found.");
        return;
    }

    // Clear existing content
    tableBody.innerHTML = "";

    // Get product details from the clicked element
    const productElement = event.target.closest(".single-product");
    if (!productElement) {
        console.error("Product element not found.");
        return;
    }

    const id = productElement.getAttribute("data-id");
    const name = productElement.getAttribute("data-name");
    const price = parseFloat(productElement.getAttribute("data-price"));
    const image = productElement.getAttribute("data-image");
    const quantity = 1; // Default quantity

    // Build the modal content
    const productModal = `
        <div class="modal-product">
            <!-- Product Images -->
            <div class="product-images">
                <div class="main-image images">
                    <img alt="${name}" src="${image}" />
                </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
                <h1>${name}</h1>
                <div class="price-box-3">
                    <hr />
                    <div class="s-price-box">
                        <span class="new-price">Price: Rs. ${price * quantity}</span>
                        <span class="old-price">Price: 1200/-</span>
                    </div>
                    <hr />
                </div>
                <a href="#" class="see-all">See all features</a>
                <div class="quick-add-to-cart">
                    <form method="post" class="cart">
                        <div class="numbers-row">
                            <input type="number" id="product-quantity" value="${quantity}" min="1" onchange="updateModalPrice(${price}, this.value)">
                        </div>
                        <button class="single_add_to_cart_button" type="button" id="add-to-cart-modal">Add to cart</button>
                        </form>
                </div>
                <div class="quick-desc">
                ${name}
                </div>
                <div class="social-sharing">
                    <div class="widget widget_socialsharing_widget">
                        <h3 class="widget-title-modal">Share this product</h3>
                        <ul class="social-icons">
                            <li><a target="_blank" title="Google +" href="#" class="gplus social-icon"><i class="zmdi zmdi-google-plus"></i></a></li>
                            <li><a target="_blank" title="Twitter" href="#" class="twitter social-icon"><i class="zmdi zmdi-twitter"></i></a></li>
                            <li><a target="_blank" title="Facebook" href="#" class="facebook social-icon"><i class="zmdi zmdi-facebook"></i></a></li>
                            <li><a target="_blank" title="LinkedIn" href="#" class="linkedin social-icon"><i class="zmdi zmdi-linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add the modal content
    tableBody.insertAdjacentHTML("beforeend", productModal);


    // Add event listener to the Add to Cart button in the modal
    document.getElementById('add-to-cart-modal').addEventListener('click', function() {
        const quantity = document.getElementById('product-quantity').value;
        addToCartfromModal(id, name, price, image, quantity);
    });

}


function updateModalPrice(price, quantity) {
    const priceElement = document.querySelector(".new-price");
    if (priceElement) {
        priceElement.textContent = `Price: Rs. ${price * quantity}`;
    }
}

function addToCartfromModal(id, name, price, image, quantity) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        // If product exists, increase its quantity
        cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
        // If product doesn't exist, add a new item
        const cartItem = { id, name, price, image, quantity: parseInt(quantity) };
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);

    // Update mini-cart and recalculate totals
    updateMiniCart();
    calculateCartTotals();
    calculateminiCartTotals();
}

// Modal Cart End

// Add to Cart Start
function populateCartTable() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tableBody = document.getElementById("cartpagetable"); // Use the specific ID

    
    if (!tableBody) {
        console.error("Element with ID 'cartpagetable' not found.");
        return;
    }

    tableBody.innerHTML = ""; // Clear existing content

    cart.forEach((item, index) => {
        const row = `
            <tr>
                <td class="product-thumbnail text-left">
                    <div class="single-product">
                        <div class="product-img">
                            <img src="${item.image}" alt="${item.name}" />
                        </div>
                        <div class="product-info">
                            <h4 class="post-title">${item.name}</h4>
                        </div>
                    </div>
                </td>
                <td class="product-price">Rs. ${item.price}</td>
                <td class="product-quantity">
                    <div class="cart-plus-minus">
                        <input type="number" value="${item.quantity}" min="1" name="qtybutton" class="cart-plus-minus-box" onchange="updateQuantity(${index}, this.value)">
                    </div>
                </td>
                <td class="product-subtotal" id="subtotal-${index}">Rs. ${item.price * item.quantity}</td>
                <td class="product-remove">
                    <a href="#" onclick="removeFromCart(${index})"><i class="zmdi zmdi-close"></i></a>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// FUNCTION TO REMOVE AN ITEM FROM THE CART
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    //alert("Item removed from cart!");

    // Reload the page to update the table
    window.location.reload();
}


// Add to Cart End

//Wishlist Start
function addToWishlist(event) {
    const productElement = event.target.closest(".single-product");
    const id = productElement.getAttribute("data-id"); // Use the unique ID
    const name = productElement.getAttribute("data-name");
    const price = parseFloat(productElement.getAttribute("data-price"));
    const image = productElement.getAttribute("data-image");

    // Retrieve wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if the product is already in the wishlist
    const existingProductIndex = wishlist.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        // If product exists, increase its quantity
        wishlist[existingProductIndex].quantity += 1;
    } else {
        // If product doesn't exist, add a new item
        const wishlistItem = { id, name, price, image, quantity: 1 };
        wishlist.push(wishlistItem);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert(`${name} has been added to your wishlist!`);

    // Update mini-cart
    updateMiniCart();

    // Recalculate cart totals
    calculateCartTotals();

    // Recalculate minicart totals
    calculateminiCartTotals();
}

function populateWishlistTable() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const tableBody = document.getElementById("wishlisttable"); // Use the specific ID

    if (!tableBody) {
        console.error("Element with ID 'wishlisttable' not found.");
        return;
    }

    tableBody.innerHTML = ""; // Clear existing content

    wishlist.forEach((item, index) => {
        const row = `
            <tr data-id="${item.id}">
                <td class="product-thumbnail text-left">
                    <!-- Single-product start -->
                    <div class="single-product">
                        <div class="product-img">
                            <a href="single-product.html"><img src="${item.image}" alt="${item.name}" /></a>
                        </div>
                        <div class="product-info">
                            <h4 class="post-title"><a class="text-light-black" href="#">${item.name}</a></h4>
                            <p class="mb-0">Color: ${item.name}</p> <!-- Assuming name is the color or replace with actual color -->
                        </div>
                    </div>
                    <!-- Single-product end -->
                </td>
                <td class="product-price">Rs.${item.price}</td>
                <td class="product-stock">In stock</td>
                <td class="product-add-cart">
                    <a class="text-light-black" href="#" data-id="${item.id}" id="add-to-cart-wishlist-${item.id}">
                        <i class="zmdi zmdi-shopping-cart-plus"></i>
                    </a>
                </td>
                <td class="product-remove">
                    <a href="#" data-id="${item.id}" class="remove-from-wishlist"><i class="zmdi zmdi-close"></i></a>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);

        // Add event listener to the Add to Cart button
        document.getElementById(`add-to-cart-wishlist-${item.id}`).addEventListener('click', function () {
            addToCartfromWishlist(item.id, item.name, item.price, item.image, item.quantity);
        });

        // Add event listener to the Remove button
        document.querySelector(`.remove-from-wishlist[data-id="${item.id}"]`).addEventListener('click', function () {
            removeFromWishlist(item.id);
        });
    });
}


function addToCartfromWishlist(id, name, price, image, quantity) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        // If product exists, increase its quantity
        cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
        // If product doesn't exist, add a new item
        const cartItem = { id, name, price, image, quantity: parseInt(quantity) };
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);

    // Update mini-cart and recalculate totals
    updateMiniCart();
    calculateCartTotals();
    calculateminiCartTotals();
}

// FUNCTION TO REMOVE AN ITEM FROM THE wishlist
function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    //alert("Item removed from cart!");

    // Reload the page to update the table
    window.location.reload();
}

//Wishlist End


//Mini Cart Start
function updateMiniCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update mini-cart UI
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-item-count").textContent = `${cartCount} items`;
    document.getElementById("cart-total").textContent = `Price : Rs. ${cartTotal.toFixed(2)}/-`;

    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
        const miniCartItem = `
            <div class="single-cart clearfix">
                <div class="cart-photo">
                    <a href="#"><img src="${item.image}" alt="${item.name}" /></a>
                </div>
                <div class="cart-info">
                    <h5><a href="#">${item.name}</a></h5>
                    <p class="mb-0">Price: Rs. ${item.price.toFixed(2)}</p>
                    <p class="mb-0">Qty: ${item.quantity}</p>
                    <span class="cart-delete"><a href="#" onclick="removeFromMiniCart(${index})"><i class="zmdi zmdi-close"></i></a></span>
                </div>
            </div>
        `;
        cartItemsList.insertAdjacentHTML("beforeend", miniCartItem);
    });
}

// Function to populate cart on the index page
function populateMiniCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update mini-cart UI
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-item-count").textContent = `${cartCount} items`;
    document.getElementById("cart-total").textContent = `Price : Rs. ${cartTotal.toFixed(2)}/-`;

    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
        const miniCartItem = `
            <div class="single-cart clearfix">
                <div class="cart-photo">
                    <a href="#"><img src="${item.image}" alt="${item.name}" /></a>
                </div>
                <div class="cart-info">
                    <h5><a href="#">${item.name}</a></h5>
                    <p class="mb-0">Price: Rs. ${item.price.toFixed(2)}</p>
                    <p class="mb-0">Qty: ${item.quantity}</p>
                    <span class="cart-delete"><a href="#" onclick="removeFromMiniCart(${index})"><i class="zmdi zmdi-close"></i></a></span>
                </div>
            </div>
        `;
        cartItemsList.insertAdjacentHTML("beforeend", miniCartItem);
    });
}

// Ensure the cart is populated when the page loads on index.html
document.addEventListener("DOMContentLoaded", function () {
    populateMiniCart(); // Call this function to populate the cart
    populateWishlistTable();
});


// FUNCTION TO REMOVE AN ITEM FROM THE MINI-CART
function removeFromMiniCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    //alert("Item removed from cart!");

    // Update mini-cart and recalculate totals
    updateMiniCart();
    calculateCartTotals();
    calculateminiCartTotals();
    window.location.reload();

}

// Function to recalculate the mini cart totals
function calculateminiCartTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update main cart totals
    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = `Price: Rs. ${cartTotal.toFixed(2)}/-`;
}

//Mini Cart Start


// Function to update quantity and recalculate totals
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (quantity < 1) quantity = 1; // Ensure the quantity is not less than 1
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the subtotal for this item
    const subtotalElement = document.getElementById(`subtotal-${index}`);
    subtotalElement.textContent = `Rs. ${cart[index].price * cart[index].quantity}`;

    // Recalculate the totals
    calculateCartTotals();
    calculateminiCartTotals();
}

// Function to calculate and update the cart totals
function calculateCartTotals() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartSubtotal = 0;
    let shippingCost = 0; // Fixed shipping cost, you can change based on your logic
    let vatCost = 0; // You can apply your VAT logic here

    // Calculate the subtotal of all items
    cart.forEach(item => {
        cartSubtotal += item.price * item.quantity;
    });

    // Calculate the order total
    let orderTotal = cartSubtotal + shippingCost + vatCost;

    // Update the UI with the new values
    document.getElementById('cart-subtotal').textContent = `Rs. ${cartSubtotal.toFixed(2)}`;
    document.getElementById('shipping-cost').textContent = `Rs. ${shippingCost.toFixed(2)}`;
    document.getElementById('vat-cost').textContent = `Rs. ${vatCost.toFixed(2)}`;
    document.getElementById('order-total').textContent = `Rs. ${orderTotal.toFixed(2)}`;
}

//Checkout Start



//onload of checkout code triggers
document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tableBody = document.getElementById("checkoutproductscontainer"); // Use the specific ID
    if (!tableBody) {
        console.error("Element with ID 'checkoutproductscontainer' not found.");
        return;
    }

    tableBody.innerHTML = ""; // Clear existing content

    let cartSubtotal = 0;
    const shippingCost = 0; // Fixed shipping cost
    const vat = 0.00; // VAT amount (modify if needed)

    cart.forEach(item => {
        const row = `
            <tr>
                <td>${item.name} x ${item.quantity}</td>
                <td class="text-end">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
        cartSubtotal += item.price * item.quantity;
    });

    // Add summary rows
    const summaryRows = `
        <tr>
            <td>Cart Subtotal</td>
            <td class="text-end">Rs. ${cartSubtotal.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Shipping and Handling</td>
            <td class="text-end">Rs. ${shippingCost.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Vat</td>
            <td class="text-end">Rs. ${vat.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Order Total</td>
            <td class="text-end">Rs. ${(cartSubtotal + shippingCost + vat).toFixed(2)}</td>
        </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", summaryRows);
});


