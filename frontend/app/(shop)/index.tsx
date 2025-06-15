import { useEffect, useState } from "react";
import {
    ScrollView,
    TextInput,
    Button,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { request } from "../../src/api/api";
import { useCartStore } from "../../src/store/cartStore";
import { ProductCard } from "../../src/components/ProductCard";
import { useRouter } from "expo-router";
import colors from "@/src/constants/colors";

export default function Shop() {
    const [products, setProducts] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<any[]>([]);
    const addToCart = useCartStore((s) => s.addToCart);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await request("/products")
                .then((data) => {
                    setProducts(data);
                    setFiltered(data);
                    console.log("Products:", data)
                })
                .catch((err) => console.error("Failed:", err));
        })();
    }, []);

    const search = () => {
        setFiltered(
            products.filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.heading}>Shop Products</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search products..."
                        value={query}
                        onChangeText={setQuery}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={search} style={styles.searchButton}>
                        <Text style={styles.searchText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {filtered.length > 0 ? (
                        filtered.map((p) => (
                            <ProductCard
                                key={p._id}
                                product={p}
                                onAdd={() => addToCart(p)}
                                onView={() => router.push(`/product/${p._id}`)}
                            />
                        ))
                    ) : (
                        <Text style={styles.noProductText}>No Products Found</Text>
                    )}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colors.backgroundSecondary,
    },
    searchButton: {
        marginLeft: 8,
        backgroundColor: colors.buttonPrimary,
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    searchText: {
        color: colors.textInverse,
        fontWeight: "500",
    },
    scrollContainer: {
        gap: 16,
        paddingBottom: 40,
    },
    noProductText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: colors.buttonDisabled,
    },
});
