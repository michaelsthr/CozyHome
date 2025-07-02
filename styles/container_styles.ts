import { StyleSheet } from "react-native";

export const ContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContainer: {
    flexGrow: 1,
  },
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
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
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
  fridgeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemsCarousel: {
    paddingLeft: 20,
  },
  statusRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  statusIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
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
  row: {
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
  info: {
    flex: 1,
  },
  category_statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    ModalContainer: {
        alignContent: "center",
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 30,
        marginVertical: 10,
    },
    timePickerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 20,
        alignContent: "center",
    },
    categoryPicker: {
        flexDirection: "row",
        alignItems: "center",
    },
    categoryPickerText: {
        fontSize: 16,
        marginRight: 8,
    },
    categoryPickerValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
    },
    categoryPickerValueText: {
        fontSize: 16,
    },
    categoryPickerPlaceholder: {
        color: "#888",
        marginLeft: "auto",
    },
    titleSection: {
      paddingVertical: 25,
      paddingHorizontal: 25,
    },
});;
