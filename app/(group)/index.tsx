import { fontStyles } from "@/styles/font_styles";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    function goBack() {
        router.back();
        setLoading(true);
        setUser(null);
        setGroup(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        fontSize: 40,
                        fontWeight: "800",
                        color: "#7749f8",
                        letterSpacing: -1,
                        lineHeight: 40,
                        paddingTop: 10,
                    }}>
                    Group Selection
                </Text>
                <Image
                    source={require("@/assets/images/groups_page.png")}
                    style={{
                        width: 320,
                        height: 320,
                    }}
                    resizeMode='contain'
                />
            </View>
            <View style={{ width: "100%", paddingHorizontal: 32 }}>
                <Text style={[fontStyles.lighter, { paddingVertical: 20, textAlign: "center" }]}>
                    Do you want to join an existing group or create a new one?
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#7749f8",
                        padding: 20,
                        borderRadius: 12,
                        alignItems: "center",
                        marginBottom: 20,
                        height: 100,
                        justifyContent: "center",
                    }}
                    onPress={() => router.push("/(group)/existingGroup")}>
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        {" "}
                        Join Existing Group
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#7749f8",
                        padding: 20,
                        borderRadius: 12,
                        alignItems: "center",
                        height: 100,
                        justifyContent: "center",
                    }}
                    onPress={() => router.push("/(group)/newGroup")}>
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        New Group
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingTop: 20,
                    }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ color: "#007aff", fontSize: 18 }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "white",
    },
});
function setUser(arg0: null) {
    throw new Error("Function not implemented.");
}

function setGroup(arg0: null) {
    throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
