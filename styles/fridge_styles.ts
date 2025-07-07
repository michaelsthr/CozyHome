import { StyleSheet } from "react-native";

export const fridgeStyles = StyleSheet.create({
  
  // General Container Styles
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  
  // Header
  homeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
  },
  
  // Search
  searchContainer: {
    marginBottom: 25,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchInput: {
    height: 50,
    fontSize: 16,
    color: "#374151",
  },
  
  // Fridge Home Section
  fridgeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingBottom: 20,
    gap: 12,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  categoryContainer: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },
  fridgeHomeItemCard: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemDetailsContainer: {
    alignItems: "center",
    width: "100%",
    gap: 10,
  },

  // Item Content
  fridgeHomeItemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "left",
  },
  fridgeHomeItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },

  // Status
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
  statusIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    gap: 5,
  },
  itemDate: {
    fontSize: 14,
    color: "#666",
  },
  daysLeft: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    backgroundColor: "#7749f8",
    borderRadius: 6,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7749f8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  quantityDisplay: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  quantityInput: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#059669",
    backgroundColor: "#ffffff",
    minWidth: 25,
    minHeight: 25,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },

  // Add Button
  addButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#7749f8",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#7749f8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  plusButton: {
    width: 44,
    height: 44,
    backgroundColor: "#7749f8",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7749f8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: "#ffffff",
  },
  
  // Empty State & Loading
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    flex: 1,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 15,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1e293b",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#9ca3af",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 40,
    padding: 5,
  },
  clearButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#e0f2fe",
  },
  modalItemText: {
    fontSize: 18,
    color: "#374151",
  },
  selectedItemText: {
    fontWeight: "600",
    color: "#0c4a6e",
  },
  checkmark: {
    fontSize: 18,
    color: "#059669",
  },
});