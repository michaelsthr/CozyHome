import { getGroupById } from "@/lib/appwrite/dbGroup";
import { getUsersByGroupId, updateUserGroup } from "@/lib/appwrite/dbUser";
import { useSession } from "@/lib/context/SessionContext";
import { cardStyles } from "@/styles/card_styles";
import { ContainerStyles } from "@/styles/container_styles";
import { fontStyles } from "@/styles/font_styles";
import { globalStyles } from "@/styles/global_styles";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

interface GroupMember {
  $id: string;
  username: string;
  groupID: string;
}

export default function HomePage() {
  const { user, setUser, group, setGroup } = useSession();
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

  const leaveGroup = async () => {
    try {
      if (!user || !user.$id) {
        return Alert.alert("Error", "User can't be loaded.");
      }

      await updateUserGroup(user.$id, null);

      const updatedUser = { ...user, groupID: null }; // aktualisiertes Objekt
      setUser(updatedUser);

      console.log("Updated user after leaving group:", updatedUser);

      router.push("/(group)");
    } catch (error) {
      console.error("Error leaving group:", error);
      Alert.alert("Error", "Failed to leave Group");
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);

      setUser(null);
      setGroup(null);

      router.push('/(auth)');

    } catch (error) {
      console.error("Error log out:", error);
      Alert.alert("Error", "Failed to log out");
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={ContainerStyles.container} showsVerticalScrollIndicator={false}>
        <View style={[ContainerStyles.greetingSection, { paddingBottom: 20 }]}>
          <Text style={[fontStyles.modernHeading, { marginTop:10}]}>
            Cozy Home
          </Text>
        </View>

        {/* Welcome Section */}
        <View style={[ContainerStyles.greetingSection, {paddingTop: 0}]}>
          <Text style={fontStyles.greeting}>Welcome back,</Text>
          <Text style={fontStyles.username}>{user?.username || "Guest"}!</Text>
          <Text style={fontStyles.subtitle}>Manage your {group?.type}.</Text>
        </View>

        {/* Group Information Card */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={[cardStyles.Card, { marginHorizontal: 20, width: "90%" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", marginBottom: 15 }}>
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
              <View style={{ flex: 1 }}>
                <Text style={fontStyles.title}>{group?.name || "Unknown Group"}</Text>
                <Text style={[fontStyles.large, { color: "#64748b", marginTop: 5 }]}>
                  Group Key: {group?.groupKey || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Group Members Section */}
        <View style={[ContainerStyles.titleSection, { marginHorizontal: 20 }]}>
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
                    backgroundColor: member.$id === user.$id ? "#22c55e" : "#6366f1",
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
                    {member.$id === user.$id && (
                      <Text style={{ color: "#22c55e", fontWeight: "normal" }}> (You)</Text>
                    )}
                  </Text>
                </View>
              </View>
            ))}
            <Button
              title="Leave Group"
              color="blue"
              onPress={() => leaveGroup()}
            />
            <Button
              title="Log Out"
              color="blue"
              onPress={() => logOut()}
            />
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
      </ScrollView>
    </SafeAreaView>

  );
}
