import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get("screen").width;
export const containerWidth = Math.min(screenWidth * 0.95, 400);
export const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    width: "100%"
  },
  container_box: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      paddingVertical: 20,
  },
  box: {
      width: containerWidth,
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3, 
      marginTop:"10%",
      zIndex: 3000,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:"10%"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "5%",
    marginTop:"10%",
    paddingHorizontal: 12,
    gap:"20%",
    width: containerWidth,
    alignSelf:"center"
  },
  button: {     
    flex:1,               
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginBottom: "3%",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "blue"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold"
  },
  tabs: {
    alignSelf:"center"
  },
  tabsStack: {
    justifyContent:"space-between",
    width: containerWidth,
    marginBottom:"2%",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#f9f9f9"
  },
  todoItem: {
    width: containerWidth,
    alignSelf: "center",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#f9f9f9"
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
    marginRight: 8
  },
  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: "10%"
  },
  badgeText: {
    fontSize: 12
  },
  checkboxRow: {
    justifyContent: "flex-end",
    marginTop: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  dateText: {
    fontSize: 14,
    color: "#555"
  },
  routineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10%"
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6
  },
  routineText: {
    fontSize: 12,
    color: "#555"
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: containerWidth,
    height: 50
  },
  tabItem: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  tabItemSelected: {
    backgroundColor: '#E5E5EA',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  tabTextSelected: {
    fontWeight: '600',
  },
  buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop:"8%",
      width: containerWidth,
      gap:"25%",
  },
  buttons: {      
      flex:1,            
      paddingVertical: "1%",
      paddingHorizontal: "8%",
      marginBottom: "3%",
      borderRadius: 10,
      alignItems: "center",
  },
  textInput: {
      width: "99%",
      height: 44,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: "10%",
      marginTop: "2%",
      fontSize: 14,
      color: "#000",
    },
    buttonContainer_edit: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "3%",
      marginTop:"10%",
      gap:"25%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  modalText: {
    fontSize: 16,
    marginBottom: "2%",
    textAlign: "center"
  },
  IconRow: {
    justifyContent: "flex-end",
    marginTop: 10
  },
  badgeErrorMessage: {
    backgroundColor:"rgba(255,0,0,0.1)", 
    borderColor:"red", 
    borderWidth: 1, 
    width: containerWidth, 
    borderRadius:6 
  },
  badgeErrorMessageText:{
    color:"red", 
    justifyContent:"center", 
    alignItems:"flex-start", 
    paddingLeft:10
  },
  badgeSuccessMessage: {
    backgroundColor:"rgba(0,128,0,0.1)", 
    borderColor:"green", 
    borderWidth: 1, 
    width: containerWidth, 
    borderRadius:6 
  },
  badgeSuccessMessageText: {
    color:"green", 
    justifyContent:"center", 
    alignItems:"flex-start", 
    paddingLeft:10,
    textTransform:"none"
  }
});
export default styles;