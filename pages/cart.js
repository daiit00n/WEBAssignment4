// Define an empty array to store the cart items
const cart = [];
let totalPrice = 0; 
let applied = false; // Initialize it as false


// Function to update the shopping cart display
function updateCartDisplay() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    totalPrice = 0; // Reset the total price

    // Loop through each item in the cart
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        const itemPrice = item.price * item.quantity;

        // Display the item, quantity, and price, along with a "Remove" button
        li.innerHTML = `${item.quantity}x ${item.name} - ₸${itemPrice.toFixed(2)}
            <button class="remove-item btn-dark px-4 rounded-5" data-index="${index}">Remove</button>`;

        cartList.appendChild(li);

        totalPrice += itemPrice; // Update the total price
    });

    updateTotalPriceDisplay();
}

// Function to update the total price display
function updateTotalPriceDisplay() {
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Total Price: ₸${totalPrice.toFixed(2)}`;
}

// Event listener for remove buttons
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        removeItemFromCart(index);
    }
});


// Function to add an item to the cart with enhanced animation
function addItemToCart(name, price) {
    // Check if the item is already in the cart
    const item = cart.find((cartItem) => cartItem.name === name);
    if (item) {
      item.quantity++; // Increase the quantity if it exists in the cart
    } else {
      cart.push({ name, price, quantity: 1 }); // Add the item to the cart with quantity 1
    }
  
    // Add the animation class to the cart for the "add" animation
    const cartElement = document.querySelector(".cart");
    cartElement.classList.add("cart-animation-add");
  
    // Remove the animation class after the animation is complete
    cartElement.addEventListener("animationend", () => {
      cartElement.classList.remove("cart-animation-add");
    });
  
    if (applied) {
      alert("Coupon has already been applied.");
      return;
    }
    updateCartDisplay(); // Update the cart display
  }
  
  // Function to remove an item from the cart with enhanced animation
  function removeItemFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart array
  
    // Add the animation class to the cart for the "remove" animation
    const cartElement = document.querySelector(".cart");
    cartElement.classList.add("cart-animation-remove");
  
    // Remove the animation class after the animation is complete
    cartElement.addEventListener("animationend", () => {
      cartElement.classList.remove("cart-animation-remove");
    });
  
    updateCartDisplay(); // Update the cart display
  }
  
  


document.addEventListener("DOMContentLoaded", function () {
    // Event listener for "Apply Coupon" button
    document.getElementById("applyCoupon").addEventListener("click", applyCoupon);

    // Function to apply a discount coupon
    function applyCoupon() {
        if (cart.length === 0) {
            alert("Your shopping cart is empty. Add items to apply the coupon.");
            return;
        }
        const couponCode = document.getElementById("couponCode").value;

    // Check if the entered coupon code is valid (you can define your own valid coupon codes)
        if (isValidCoupon(couponCode)) {
            // Calculate the discount amount (20% off the total price)
            const discount = totalPrice * 0.2;
            // Update the total price after applying the discount
            totalPrice -= discount;
            updateTotalPriceDisplay();
            applied = true; // Set the applied flag to true
            document.getElementById("applyCoupon").disabled = true; // Disable the button
        } else {
            alert("Invalid coupon code. Please try again.");
        }
    }

    // Function to check if a coupon code is valid (you can define your own valid codes)
    function isValidCoupon(code) {
    // Replace "YOUR_COUPON_CODE" with the actual coupon code you want to use
        return code === "promo20";
    }
});

