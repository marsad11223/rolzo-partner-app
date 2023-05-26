import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { icons } from '../../assets/images';
import moment from 'moment'
const CalendarInput = ({ placeholder, onDateSelect }) => {

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const inputRef = useRef(null);

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    const formattedDate = moment(date.dateString).format('ddd, Do MMM YYYY');
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
    setShowCalendar(false);
  };

  const getborder = () => {
    if (showCalendar) {
      return styles.selected
    } else {
      return {}
    }
  }
  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity
        style={{ ...styles.inputContainer, ...getborder() }}
        onPress={handleToggleCalendar}
        onBlur={() => setShowCalendar(false)}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={selectedDate}
          editable={false}
          ref={inputRef}
        />
        <Image resizeMode='contain' style={styles.calenderIcon} source={icons.calendar} ></Image>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          style={styles.calendar}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#fbfbfb', selectedTextColor: '#0c0c0c' },
          }}
          theme={{
            backgroundColor: '#ffffff',
            arrowColor: '#0c0c0c',
            todayTextColor: '#0c0c0c',
          }}

        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139,149,158,.2)',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fbfbfb'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#0c0c0c'
  },
  calendar: {
    marginBottom: 10,
  },
  calenderIcon: {
    height: 25,
    width: 30
  },
  selected: {
    borderWidth: 1.5,
    borderColor: '#0c0c0c'
  }
});

export default CalendarInput;
