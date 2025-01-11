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
}


document.addEventListener("DOMContentLoaded", function () {
    // Populate cart and mini-cart on page load
    populateCartTable();
    updateMiniCart();
    calculateCartTotals();
});

function populateCartTable() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tableBody = document.querySelector(".shop-cart-table tbody");
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

// FUNCTION TO REMOVE AN ITEM FROM THE CART
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    //alert("Item removed from cart!");

    // Reload the page to update the table
    window.location.reload();
}

// FUNCTION TO REMOVE AN ITEM FROM THE MINI-CART
function removeFromMiniCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    //alert("Item removed from cart!");

    // Update mini-cart and recalculate totals
    updateMiniCart();
    removeFromCart();
    calculateCartTotals();
}

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
}

// Function to recalculate the cart totals
function calculateCartTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update main cart totals
    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = `Price: Rs. ${cartTotal.toFixed(2)}/-`;
}
