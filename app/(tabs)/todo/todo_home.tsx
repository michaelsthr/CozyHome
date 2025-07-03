import { useSession } from "@/lib/context/SessionContext";
import { buttonStyles } from "@/styles/button_styles";
import { fontStyles } from "@/styles/font_styles";
import { headerStyles } from "@/styles/header_styles";
import { iconStyles } from "@/styles/icon_styles";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ToDoItem, ToDoItemProps } from "../../../components/todo/todo_item";
import { getTodos, updateTodo } from "../../../lib/appwrite/dbTodo"; //für db
import styles, { screenHeight, screenWidth } from "./styles";

const formatDate = (isoString: string) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

type TabsProps = {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
};

const tabs = ["All", "Tasks", "Shopping"];
const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => {
                        console.log(`${tab} selected`);
                        setSelectedTab(tab);
                    }}
                    style={[styles.tabItem, selectedTab === tab && styles.tabItemSelected]}>
                    <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default function Todo() {
    const router = useRouter();
    const [todos, setTodos] = useState<{ total: number; documents: any[] }>({
        total: 0,
        documents: [],
    });
    const { user } = useSession();

    const [loading, setLoading] = useState(true);
    const newToDo = () => router.push("./newtodo");
    const edit = () => router.push("./edit");
    const [selectedTab, setSelectedTab] = useState("All");
    const filteredTodos = todos?.documents?.filter((todo) => {
        if (selectedTab === "All") return true;
        return todo.tag === selectedTab;
    });

    const fetchTodos = async () => {
        try {
            const todos = await getTodos();
            console.log("Todos:", todos);
            setTodos(todos);
        } catch (err) {
            console.error("Error fetching todo contents:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTodos();
            console.log("Screen is focused – Daten neu geladen");
        }
    }, [isFocused]);

    const changeToDoStatus = async (id: string, done: boolean) => {
        if (!todos) return;

        const updatedTodos = todos.documents.map((todo: ToDoItemProps) =>
            todo.id === id || todo.$id === id ? { ...todo, done: !done } : todo
        );
        setTodos({ ...todos, documents: updatedTodos });

        try {
            await updateTodo({
                $id: id,
                done: !done,
                doneBy: user?.username,
            });
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <View style={[headerStyles.container, { paddingBottom: 40 }]}>
                    <View style={headerStyles.leftContainer}>
                        <Text style={fontStyles.h3}>To Do's</Text>
                    </View>
                    <View style={headerStyles.rightContainer}>
                        <TouchableOpacity onPress={edit}>
                            <Image
                                source={require("@/assets/images/icons/edit.png")}
                                style={iconStyles.icon1}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            hitSlop={5}
                            style={buttonStyles.plusButton}
                            onPress={newToDo}>
                            <Image
                                source={require("@/assets/images/symbol-plus.png")}
                                style={iconStyles.plusIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: 5,
                        width: screenWidth,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingRight: 10,
                    }}>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </View>
                <View style={{ height: screenHeight / 1.5 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                        {filteredTodos && filteredTodos.length > 0 ? (
                            filteredTodos?.map((item, index) => (
                                <ToDoItem
                                    key={index}
                                    id={item.$id}
                                    title={item.name}
                                    date={item.date ? formatDate(item.date) : null}
                                    routine={item.regularity ? item.regularity : null}
                                    isChecked={item.done}
                                    changeToDoStatus={changeToDoStatus}
                                    tag={item.tag ? item.tag : null}
                                    doneBy={item.doneBy || null}
                                    responsible={item.responsible || null}
                                />
                            ))
                        ) : (
                            <Text style={{ textAlign: "center", fontSize: 20, marginTop: 220 }}>
                                {" "}
                                No To Dos yet
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}
