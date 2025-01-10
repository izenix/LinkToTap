function addToCart() {
    // Get product details from the parent element
    const productElement = event.target.closest(".single-product");
    const name = productElement.getAttribute("data-name");
    const price = parseFloat(productElement.getAttribute("data-price"));
    const image = productElement.getAttribute("data-image");

    // Create a cart item object
    const cartItem = { name, price, image, quantity: 1 };

    // Save the cart item to localStorage (for cart persistence)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);

    // Recalculate cart totals
    calculateCartTotals();
}

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Reference to the table body
    const tableBody = document.querySelector(".shop-cart-table tbody");

    // Populate the table
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

    // Recalculate cart totals on page load
    calculateCartTotals();
});

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from cart!");

    // Reload the page to update the table
    window.location.reload();
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

// Function to calculate and update the cart totals
function calculateCartTotals() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartSubtotal = 0;
    let shippingCost = 15; // Fixed shipping cost, you can change based on your logic
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





