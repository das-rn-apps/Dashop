import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuthStore } from "../../src/store/authStore";
import { request } from "../../src/api/api";

export default function Orders() {
    const token = useAuthStore((s) => s.token);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const data = await request("/orders/my", "GET", undefined, token || undefined);
            setOrders(data);
        })();
    }, []);

    return (
        <ScrollView>
            {orders.map((o) => (
                <View key={o._id} style={{ padding: 10, borderBottomWidth: 1 }}>
                    <Text>Order ID: {o._id}</Text>
                    <Text>Total: ₹{o.total}</Text>
                    <Text>Status: {o.status}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
