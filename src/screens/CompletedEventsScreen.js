import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const {width} = Dimensions.get('window');

const dummyCompletedEvents = [
  {
    id: '1',
    name: 'Spring Festival',
    date: '2024-05-15',
    images: [
      require('../assets/spring-festival-1.jpeg'),
      require('../assets/spring-festival-2.jpeg'),
    ],
  },
  {
    id: '2',
    name: 'Community Workshop',
    date: '2024-05-20',
    images: [
      require('../assets/community-workshop-1.jpeg'),
      require('../assets/community-workshop-2.webp'),
    ],
  },
  {
    id: '3',
    name: 'Neighborhood Potluck',
    date: '2024-05-25',
    images: [
      require('../assets/neighborhood-potluck-1.webp'),
      require('../assets/neighborhood-potluck-2.jpeg'),
    ],
  },
];

export default function CompletedEventsScreen() {
  const navigation = useNavigation();
  const [dateRange, setDateRange] = useState({
    start: '2024-05-01',
    end: '2024-05-31',
  });
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventGallery', {eventId: item.id})}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <View style={styles.imageGrid}>
        {item.images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  const onDayPress = day => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate('');
    } else if (day.dateString > selectedStartDate) {
      setSelectedEndDate(day.dateString);
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate('');
    }
  };

  const applyDateFilter = () => {
    if (selectedStartDate && selectedEndDate) {
      setDateRange({start: selectedStartDate, end: selectedEndDate});
      setIsCalendarVisible(false);
    }
  };

  const filteredEvents = dummyCompletedEvents.filter(
    event => event.date >= dateRange.start && event.date <= dateRange.end,
  );

  return (
    <View style={styles.container}>
      {/* Fixed Date Range at the top */}
      <View style={styles.dateRangeContainer}>
        <Text style={styles.dateRangeText}>
          Date Range: {dateRange.start} - {dateRange.end}
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsCalendarVisible(true)}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList for Event List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No events found in selected date range
            </Text>
          </View>
        )}
      />

      {/* Modal for Calendar Filter */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCalendarVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedStartDate]: {startingDay: true, color: '#D9C8A1'},
                [selectedEndDate]: {endingDay: true, color: '#D9C8A1'},
              }}
              markingType={'period'}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyDateFilter}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#D9C8A1',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dateRangeText: {
    color: 'black',
    fontWeight: 'bold',
    maxWidth: width * 0.6, // Limit text width
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  eventList: {
    paddingHorizontal: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  eventItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButton: {
    backgroundColor: '#D9C8A1',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
