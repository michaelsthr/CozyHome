import { StyleSheet } from "react-native";

export const fridgeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
  },
  username: {
    fontSize: 32,
    fontWeight: "700",
  },
  searchContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchInput: {
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
  },
  title: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    marginBottom: 15,
  },
  itemsList: {
    paddingVertical: 10,
  },
  itemCard: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  statusIcon: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
  },
  checkButton: {
    marginTop: 30,
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// Styles for Fridge Items screen
export const fridgeItemsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  searchContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  itemsLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  filterText: {
    fontSize: 14,
    color: "#007AFF",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    marginTop: 30,
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// Styles for Fridge Fruits screen
export const fridgeFruitsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: "700", marginTop: 16 },
  searchContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  searchInput: { height: 40, paddingHorizontal: 12, fontSize: 16 },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  sectionLabel: { fontSize: 18, fontWeight: "700" },
  filterText: { fontSize: 14, color: "#007AFF" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemImage: { width: 60, height: 60, resizeMode: "contain" },
  info: { flex: 1, marginLeft: 12 },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusIcon: { width: 30, height: 30, marginRight: 6 },
  statusText: { fontSize: 14, color: "#333" },
  itemName: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    fontSize: 14,
    fontWeight: "700",
    marginRight: 4,
  },
  fridgeIcon: { width: 50, height: 50 },
  separator: { height: 1, backgroundColor: "#eee" },
});

// Styles for Fridge Add screen
export const fridgeAddStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  title: { fontSize: 32, fontWeight: "700", marginVertical: 20 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});