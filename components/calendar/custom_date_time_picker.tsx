import { inputStyles } from "@/styles/input_styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TimePickerModal from "./time_picker_modal";

interface CustomDateTimePickerProps {
    value: Date;
    mode: "date" | "time";
    onChange: (event: any, selectedDate?: Date) => void;
    label?: string;
    display: "default" | "compact" | "inline" | "spinner" | "clock" | "calendar";
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
    value,
    mode,
    onChange,
    label,
    display
}) => {
    const [showPicker, setShowPicker] = useState(false);

    const formatDate = (date: Date) => {
        if (mode === "date") {
            return date.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        } else {
            return date.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
            });
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            onChange(event, selectedDate);
        }
    };

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                style={[inputStyles.input, styles.pickerButton]}
                onPress={() => setShowPicker(true)}>
                <Text style={styles.pickerText}>{formatDate(value)}</Text>
            </TouchableOpacity>

            {showPicker && (
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.pickerContainer}>
                            <View style={styles.pickerHeader}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setShowPicker(false)}>
                                </TouchableOpacity>
                                <Text style={styles.pickerTitle}>
                                    {mode === "date" ? "Choose Date" : "Choose Time"}
                                </Text>
                                <TouchableOpacity
                                    style={styles.doneButton}
                                    onPress={() => setShowPicker(false)}>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={value}
                                mode={mode}
                                onChange={handleDateChange}
                                themeVariant='light'
                                display={display}
                                style={{padding: 10}}
                            />
                        </View>
                    </View>
                </Modal>
                
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: "#1e293b",
        marginBottom: 8,
        fontWeight: "600",
    },
    pickerButton: {
        justifyContent: "center",
        minHeight: 50,
    },
    pickerText: {
        fontSize: 16,
        color: "#1e293b",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    pickerContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        margin: 20,
        minWidth: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pickerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },
    pickerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1e293b",
    },
    cancelButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#6b7280",
    },
    doneButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    doneButtonText: {
        fontSize: 16,
        color: "#059669",
        fontWeight: "600",
    },
});

export default CustomDateTimePicker;
