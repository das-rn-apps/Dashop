import { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { request } from "../../src/api/api";
import { useCartStore } from "../../src/store/cartStore";

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<any>(null);
    const addToCart = useCartStore((s) => s.addToCart);

    useEffect(() => {
        (async () => {
            const data = await request(`/products/${id}`);
            setProduct(data);
        })();
    }, [id]);

    if (!product) return <Text>Loading...</Text>;

    return (
        <View>
            <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
            <Text>{product.name}</Text>
            <Text>₹{product.price}</Text>
            <Text>{product.description}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(product)} />
        </View>
    );
}
