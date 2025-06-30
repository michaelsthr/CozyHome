/**
 * TimePickerModal is a React Native component that integrates a DateTimePicker
 * within a React Native Paper Modal component. It provides a clean interface for
 * selecting dates in a modal popup that can be programmatically opened and closed.
 *
 * @component
 * @param {object} props - Component props
 * @param {boolean} props.showStartDatePicker - Controls visibility of the modal
 * @param {Date | undefined} props.value - Current selected date value
 * @param {Function} props.onDateChanges - Callback function triggered when date is changed
 * @param {string} props.title - Title text displayed above the date picker
 * @param {Function} props.onDismiss - Callback function triggered when modal is dismissed
 *
 * @returns {React.ReactElement} A modal containing a date picker component
 *
 * @example
 * <TimePickerModal
 *   showStartDatePicker={showPicker}
 *   value={selectedDate}
 *   onDateChanges={(event, date) => handleDateChange(date)}
 *   title="Select a date"
 *   onDismiss={() => setShowPicker(false)}
 * />
 *
 * // https://github.com/react-native-datetimepicker/datetimepicker/issues/483
 */

import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, View } from "react-native";
import { Modal } from "react-native-paper";

type TimePickerModalProps = {
    showStartDatePicker: boolean;
    value: Date;
    title: string;
    onDateChanges: (event: any, selectedDate: any) => void;
    onDismiss?: () => void;
};

const TimePickerModal = (props: TimePickerModalProps) => {
    const { showStartDatePicker, value, onDateChanges, title, onDismiss } = props;
    return (
        <Modal
            style={{
                backgroundColor: "transparent",
                padding: 10,
            }}
            contentContainerStyle={{}}
            dismissable={true}
            dismissableBackButton={true}
            visible={showStartDatePicker}
            onDismiss={onDismiss}>
            <View
                style={[
                    {
                        backgroundColor: "#FFF",
                        borderRadius: 8,
                        padding: 20,
                    },
                ]}>
                <DateTimePicker
                    themeVariant='light'
                    value={value || new Date()}
                    mode='date'
                    display='inline'
                    onChange={onDateChanges}
                    minimumDate={new Date()}
                />
                <Button title='Today' onPress={() => onDateChanges(null, new Date())} />
            </View>
        </Modal>
    );
};

export default TimePickerModal;
