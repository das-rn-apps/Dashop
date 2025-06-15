import { View, Text, Button } from "react-native";
import { useCartStore } from "@/src/store/cartStore";
import { useAuthStore } from "@/src/store/authStore";
import { request } from "@/src/api/api";

export default function CartScreen() {
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const token = useAuthStore((state) => state.token);

    const checkout = async () => {
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
        console.log("Order created:", data);
        // TODO: Trigger Razorpay here using data.rpOrder.id
        clearCart();
    };

    return (
        <View>
            {items.map((i) => (
                <Text key={i.product._id}>
                    {i.product.name} x {i.quantity}
                </Text>
            ))}
            <Button title="Checkout" onPress={checkout} />
        </View>
    );
}
