import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useAuthStore } from "../../src/store/authStore";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = useAuthStore((state) => state.register);

    return (
        <View>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Register"
                onPress={() => register(name, email, password)}
            />
        </View>
    );
}