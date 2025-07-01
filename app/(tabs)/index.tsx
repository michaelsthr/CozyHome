import { getGroupById } from "@/lib/appwrite/dbGroup";
import { getUsersByGroupId } from "@/lib/appwrite/dbUser";
import { useSession } from "@/lib/context/SessionContext";
import { cardStyles } from "@/styles/card_styles";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { globalStyles } from "@/styles/global_styles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Models } from "react-native-appwrite";

interface GroupMember {
  $id: string;
  username: string;
  groupID: string;
}

export default function HomePage() {
  const { user, group } = useSession();
  const router = useRouter();
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (!user?.groupID) {
        setLoading(false);
        return;
      }

      try {
        // Fetch group members
        const membersData = await getUsersByGroupId(user.groupID.$id);
        setGroupMembers(membersData.documents.map(doc => ({
          $id: doc.$id,
          username: doc.username,
          groupID: doc.groupID.$id
        })));
      } catch (error) {
        console.error("Error fetching group data:", error);
        Alert.alert("Error", "Failed to load group information");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupMembers();
  }, [user?.groupID]);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={[fontStyles.medium, { marginTop: 10, color: "#64748b" }]}>
          Loading your group...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={ContainerStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header with App Logo */}
      <View style={ContainerStyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/fridge_icons/logo-2.png")}
            style={globalStyles.logo}
          />
          <Text style={[fontStyles.h1, { marginLeft: 10, marginRight: 0 }]}>
            CozyHome
          </Text>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={ContainerStyles.greetingSection}>
        <Text style={fontStyles.greeting}>Welcome back,</Text>
        <Text style={fontStyles.username}>{user.username}!</Text>
        <Text style={fontStyles.subtitle}>Manage your {group?.type}.</Text>
      </View>

      {/* Group Information Card */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={[cardStyles.Card, { marginHorizontal: 20, width: "90%" }]}>
          <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", marginBottom: 15}}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#3b82f6",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {group?.name?.charAt(0)?.toUpperCase() || "G"}
              </Text>
            </View>
            <View style={{ flex: 1}}>
              <Text style={fontStyles.title}>{group?.name || "Unknown Group"}</Text>
              <Text style={[fontStyles.large, { color: "#64748b", marginTop: 5}]}>
                Group Key: {group?.groupKey || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Group Members Section */}
      <View style={ContainerStyles.titleSection}>
        <Text style={fontStyles.title}>Group Members</Text>
        <Text style={[fontStyles.subtitle, { marginBottom: 0 }]}>
          {groupMembers.length} member{groupMembers.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {groupMembers.length > 0 ? (
        <View style={{ paddingHorizontal: 20 }}>
          {groupMembers.map((member, index) => (
            <View key={member.$id} style={ContainerStyles.row}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: member.$id === user.userId ? "#22c55e" : "#6366f1",
                  borderRadius: 22.5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                  {member.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={ContainerStyles.info}>
                <Text style={[fontStyles.itemName, { textAlign: "left" }]}>
                  {member.username}
                  {member.$id === user.userId && (
                    <Text style={{ color: "#22c55e", fontWeight: "normal" }}> (You)</Text>
                  )}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={ContainerStyles.emptyState}>
          <Image
            source={require("@/assets/images/fridge_icons/profile-picture.png")}
            style={globalStyles.emptyIcon}
          />
          <Text style={fontStyles.emptyText}>No members found</Text>
          <Text style={fontStyles.emptySubtext}>
            Invite others to join your group
          </Text>
        </View>
      )}

      {/* Quick Actions */}
      <View style={ContainerStyles.titleSection}>
        <Text style={fontStyles.title}>Quick Actions</Text>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => router.push("/(tabs)/fridge")}
        >
          <Image
            source={require("@/assets/images/fridge_icons/fridge.png")}
            style={{ width: 30, height: 30, marginRight: 15 }}
          />
          <View>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Check Fridge
            </Text>
            <Text style={{ color: "#dbeafe", fontSize: 14, marginTop: 2 }}>
              See what's available
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#10b981",
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => router.push("/(tabs)/todo")}
        >
          <Image
            source={require("@/assets/todo.png")}
            style={{ width: 30, height: 30, marginRight: 15 }}
          />
          <View>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              View Tasks
            </Text>
            <Text style={{ color: "#d1fae5", fontSize: 14, marginTop: 2 }}>
              Manage household todos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#f59e0b",
            borderRadius: 16,
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => router.push("/(tabs)/calendar")}
        >
          <Image
            source={require("@/assets/images/calendar.png")}
            style={{ width: 30, height: 30, marginRight: 15 }}
          />
          <View>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Check Calendar
            </Text>
            <Text style={{ color: "#fef3c7", fontSize: 14, marginTop: 2 }}>
              View upcoming events
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
