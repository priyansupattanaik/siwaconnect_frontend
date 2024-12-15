import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const dummyEvents = [
  {
    id: '1',
    name: 'Community Cleanup',
    date: '2024-11-01',
    details: 'Join us for a neighborhood cleanup event!',
  },
  {
    id: '2',
    name: 'Local Art Exhibition',
    date: '2023-06-20',
    details: 'Showcasing local artists and their work.',
  },
  {
    id: '3',
    name: 'Farmers Market',
    date: '2023-06-25',
    details: 'Fresh produce and handmade goods from local vendors.',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventDetails}>{item.details}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.notificationBar}>
        <Text style={styles.notificationText}>
          Upcoming: Community Picnic on July 1st!
        </Text>
      </View>
      <FlatList
        data={dummyEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9', // Beige background for a warm look
  },
  notificationBar: {
    backgroundColor: '#D9C8A1', // Light beige background for the notification bar
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D1B39E', // Subtle border to differentiate
  },
  notificationText: {
    color: '#3C3C3C', // Darker color for contrast
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  eventList: {
    padding: 10,
  },
  eventItem: {
    backgroundColor: '#F9F6F1', // A very light beige background for the events
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#D1B39E', // Light shadow for a soft look
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3C3C3C', // Darker color for better readability
  },
  eventDate: {
    fontSize: 14,
    color: '#6C6A5B', // Muted gray-beige for the date
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#4A4A44', // Darker muted color for the details
  },
});
