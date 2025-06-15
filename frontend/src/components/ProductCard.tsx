import { View, Text, Image, Button } from "react-native";

export const ProductCard = ({ product, onAdd, onView }: { product: any, onAdd: () => void, onView: () => void }) => (
    <View style={{ padding: 10, borderWidth: 1, margin: 5 }}>
        <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
        <Text>{product.name}</Text>
        <Text>₹{product.price}</Text>
        <Button title="View" onPress={onView} />
        <Button title="Add to Cart" onPress={onAdd} />
    </View>
);
