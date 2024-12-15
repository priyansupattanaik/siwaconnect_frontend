import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export default function EventDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {eventId} = route.params;

  // In a real app, you would fetch the event details based on the eventId
  const eventDetails = {
    name: 'Community Cleanup',
    date: '2023-06-15',
    time: '10:00 AM - 2:00 PM',
    location: 'Central Park',
    description:
      "Join us for a neighborhood cleanup event! We'll be working together to pick up litter and beautify our community. Gloves and trash bags will be provided. Don't forget to bring water and wear comfortable clothes!",
    image: require('../assets/central-park.jpeg'),
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={eventDetails.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{eventDetails.name}</Text>
        <Text style={styles.date}>
          {eventDetails.date} • {eventDetails.time}
        </Text>
        <Text style={styles.location}>{eventDetails.location}</Text>
        <Text style={styles.description}>{eventDetails.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('JOIN pressed')}>
          <Text style={styles.buttonText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9', // Light background color
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333', // Darker shade for text
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#555', // Slightly lighter shade for subtext
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D9C8A1', // Primary color for buttons
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    width: '60%',
    marginTop: 20,
  },
  buttonText: {
    color: '#333', // Text color for button
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
