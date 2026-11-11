import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const getItemId = (item) => item?._id || item?.id;

const getUnitPrice = (item) => {
    const storedPrice = Number(item?.unitPrice);
    if (Number.isFinite(storedPrice) && storedPrice >= 0) {
        return storedPrice;
    }

    const parsedPrice = Number(String(item?.price || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsedPrice) ? parsedPrice : 0;
};

const readStoredCart = () => {
    try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!Array.isArray(storedCart)) {
            return [];
        }

        return storedCart
            .filter((item) => getItemId(item) && item.heading)
            .map((item) => ({
                ...item,
                _id: getItemId(item),
                quantity: Math.max(1, Number(item.quantity) || 1),
                unitPrice: getUnitPrice(item),
            }));
    } catch {
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
        localStorage.removeItem("totalItems");
        return [];
    }
};

const getTotals = (cart) => ({
    total: cart.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0),
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
});

const initialCart = readStoredCart();
const initialState = {
    cart: initialCart,
    ...getTotals(initialCart),
};

const persistCart = (state) => {
    const totals = getTotals(state.cart);
    state.total = totals.total;
    state.totalItems = totals.totalItems;
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("total", JSON.stringify(state.total));
    localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action) => {
            const product = action.payload;
            const productId = getItemId(product);
            if (!productId || !product?.heading) {
                toast.error("This item could not be added.");
                return;
            }

            const existingItem = state.cart.find((item) => getItemId(item) === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({
                    ...product,
                    _id: productId,
                    unitPrice: getUnitPrice(product),
                    quantity: 1,
                });
            }

            persistCart(state);
            toast.success(`${product.heading} added to cart`);
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find((cartItem) => getItemId(cartItem) === id);
            if (!item || !Number.isInteger(quantity) || quantity < 1) {
                return;
            }

            item.quantity = quantity;
            persistCart(state);
        },
        remove: (state, action) => {
            const itemIndex = state.cart.findIndex((item) => getItemId(item) === action.payload);
            if (itemIndex === -1) {
                return;
            }

            state.cart.splice(itemIndex, 1);
            persistCart(state);
            toast.success("Item removed from cart");
        },
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },
});

export const { add, setQuantity, resetCart, remove } = cartSlice.actions;
export default cartSlice.reducer;