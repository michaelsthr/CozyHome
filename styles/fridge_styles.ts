import { StyleSheet } from "react-native";

export const fridgeStyles = StyleSheet.create({
  // General Container Styles
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#e1f5fe",
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },

  // Greeting & Title Sections
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 5,
  },
  username: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
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
    marginHorizontal: 20,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fridgeIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    tintColor: "#059669",
  },

  // Items (Carousel, Grid, List)
  itemsCarousel: {
    paddingLeft: 20,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    paddingBottom: 20,
    gap: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemsList: {
    paddingHorizontal: 20,
  },

  // Item Cards
  carouselItemCard: {
    width: 120,
    marginRight: 15,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
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
  gridItemCard: {
    width: "47%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 6,
  },
  fridgeHomeItemCard: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
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
  listItemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },

  // Item Content
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  fridgeHomeItemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 8,
  },
  listItemImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginRight: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    marginTop: 5,
  },
  fridgeHomeItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
    marginTop: 5,
  },
  listItemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  itemInfo: {
    flex: 1,
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

  itemDetailsRow: {
    alignItems: "center",
    width: "100%",
  },

  // Quantity Controls
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    gap: 6,
  },
  quantityButton: {
    backgroundColor: "#7749f8",
    borderRadius: 6,
    width: 28,
    height: 28,
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
  quantityButtonDisabled: {
    backgroundColor: "#94a3b8",
    shadowColor: "transparent",
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#059669",
    backgroundColor: "#ffffff",
  },

  // Labels & Filters
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  filterText: {
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
  },

  // Add Button
  addButton: {
    marginHorizontal: 20,
    marginBottom: 100,
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

  // Plus Button in Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  separator: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 8,
  },

  // Add Item Form Styles
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
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

  // Modal Styles
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

  // Calendar Modal Styles
  calendarModalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: "95%",
    alignSelf: "center",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 24,
    color: "#059669",
  },
  monthYearButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  yearJump: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  yearButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  yearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  weekDay: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    width: "14.28%",
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  emptyDay: {
    width: "14.28%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDay: {
    width: "14.28%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  calendarDayText: {
    fontSize: 16,
    color: "#374151",
  },
  pastDay: {
    opacity: 0.4,
  },
  pastDayText: {
    textDecorationLine: "line-through",
  },
  todayDay: {
    backgroundColor: "#e0f2fe",
  },
  todayDayText: {
    fontWeight: "700",
    color: "#0c4a6e",
  },
  selectedDay: {
    backgroundColor: "#059669",
  },
  selectedDayText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});