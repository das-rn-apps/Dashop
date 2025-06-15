import { useEffect } from "react";
import { View, Text } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useRouter } from "expo-router";
import { useCartStore } from "../../src/store/cartStore";
import { useAuthStore } from "../../src/store/authStore";
import { request } from "../../src/api/api";

export default function Checkout() {
    const items = useCartStore((s) => s.items);
    const clearCart = useCartStore((s) => s.clearCart);
    const token = useAuthStore((s) => s.token);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const total = items.reduce(
                    (sum, i) => sum + i.product.price * i.quantity,
                    0
                );
                const products = items.map((i) => ({
                    productId: i.product._id,
                    quantity: i.quantity
                }));
                const data = await request(
                    "/orders",
                    "POST",
                    { products, total },
                    token || undefined
                );

                const options = {
                    description: "E-Commerce Payment",
                    image: "https://yourapp.com/logo.png",
                    currency: "INR",
                    key: "YOUR_RAZORPAY_KEY",
                    amount: total * 100,
                    name: "Shop App",
                    order_id: data.rpOrder.id,
                    prefill: {
                        email: "test@example.com", // Replace with user data
                        contact: "9999999999",
                        name: "Test User"
                    },
                    theme: { color: "#6200ee" }
                };
                RazorpayCheckout.open(options)
                    .then((paymentData) => {
                        console.log("Payment success", paymentData);
                        clearCart();
                        router.replace("/(shop)/orders");
                    })
                    .catch((err) => {
                        console.error("Payment failed", err);
                    });
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <View>
            <Text>Processing payment...</Text>
        </View>
    );
}
