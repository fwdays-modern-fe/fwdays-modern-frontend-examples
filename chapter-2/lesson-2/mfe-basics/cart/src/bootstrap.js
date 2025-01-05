import { faker } from '@faker-js/faker';

const mount = (el) => {
    // Generate a random number of items
    const itemCount = faker.number.int({ min: 0, max: 100 });

    // Create a more styled div for the cart
    const cartText = `
    <div style="
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: 'Arial', sans-serif;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    ">
        <span>You have <strong>${itemCount}</strong> items in your cart</span>
    </div>`;

    el.innerHTML = cartText;
};

if (process.env.NODE_ENV === "development") {
    const el = document.querySelector("#dev-cart");

    if (el) {
        mount(el);
    }
}

export { mount };
