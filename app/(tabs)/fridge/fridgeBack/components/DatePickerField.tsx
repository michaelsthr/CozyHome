import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DatePickerFieldProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  label?: string;
  minimumDate?: Date;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ 
  date, 
  setDate, 
  label = "mhd:",
  minimumDate 
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Show picker with fade in animation
  const showPickerWithAnimation = () => {
    setShowPicker(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250, // Slightly slower fade in for a more pleasant appearance
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic), // Add easing for smoother animation
    }).start();
  };
  
  // Hide picker with fade out animation
  const hidePickerWithAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.in(Easing.cubic), // Add easing for smoother animation
    }).start(() => {
      // Use a small delay before completely hiding the picker to make the transition smoother
      setTimeout(() => setShowPicker(false), 150);
    });
  };

  // Reset animation when visibility changes
  useEffect(() => {
    // Instead of immediately setting values, use timing for smoother transitions
    // even when state changes programmatically
    if (showPicker) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    } else {
      // Just reset the value when hidden, don't animate
      fadeAnim.setValue(0);
    }
  }, [showPicker, fadeAnim]);
  
  // Handle date change from the picker with a smooth transition
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    try {
      // Update date if user did not cancel
      if (selectedDate) {
        // Ensure we have a valid date by creating a new Date object
        const validDate = new Date(selectedDate);
        if (!isNaN(validDate.getTime())) {
          // Update the date
          setDate(validDate);
          
          // Briefly flash the button to indicate success
          // This provides visual feedback that the date was selected
          if (Platform.OS === "android") {
            // Create a subtle success animation before hiding the picker
            setTimeout(() => {
              // Animate the fade out of the picker after a brief delay
              hidePickerWithAnimation();
            }, 400); // Slightly longer delay for Android 
          } else {
            // On iOS, a shorter delay feels more responsive
            setTimeout(() => {
              hidePickerWithAnimation();
            }, 250);
          }
        }
      } else {
        // User canceled, just hide the picker
        hidePickerWithAnimation();
      }
    } catch (error) {
      console.error("Error handling date change:", error);
      // Fallback: Just hide the picker
      hidePickerWithAnimation();
    }
  };

  // Format date for display in DD.MM.YYYY format
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>        <TouchableOpacity
          onPress={showPickerWithAnimation}
          style={[
            styles.datePickerButton,
            showPicker && {backgroundColor: "#e3f2fd"},
            date && {borderColor: "#2196F3", borderWidth: 1.5} // Highlight when date is selected
          ]}
          accessibilityLabel={date ? "Ausgewähltes Datum" : "Datum auswählen"}
          accessibilityHint={date ? formatDate(date) : ""}
          accessibilityRole="button"
        >
          <Text style={styles.datePickerButtonText}>
            {date ? formatDate(date) : "Datum auswählen"}
          </Text>
        </TouchableOpacity>
          {/* Clear date button */}
        {date && (
          <TouchableOpacity 
            style={styles.clearDateButton}
            onPress={() => setDate(null)}
            accessibilityLabel="Datum löschen"
            accessibilityRole="button"
          >
            <Text style={styles.clearDateText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
        {showPicker && (
        <Animated.View 
          style={{
            width: "100%", 
            marginTop: 10, 
            alignItems: "center",
            opacity: fadeAnim,
            ...(Platform.OS === "ios" ? { paddingVertical: 8, backgroundColor: "#f9f9f9", borderRadius: 8 } : {})
          }}
        ><DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
            minimumDate={minimumDate || new Date()}
            themeVariant="light"
            accentColor="#3498db"
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start" // Change to flex-start for better label alignment
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500"
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#f9f9f9",
    flex: 1,
    minHeight: 42,
    justifyContent: "center"
  },
  datePickerButtonText: {
    color: "#333",
    fontSize: 14
  },
  clearDateButton: {
    marginLeft: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f44336",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  clearDateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default DatePickerField;
