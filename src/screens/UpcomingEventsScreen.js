import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UpcomingEventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          'http://192.168.29.106:3001/api/events/all-events',
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
      <ImageBackground
        source={{uri: `http://192.168.29.106:3001/uploads/${item.event_image}`}}
        style={styles.eventImage}>
        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{item.event_title}</Text>

          <View style={styles.dateContainer}>
            <Icon name="calendar" size={16} color="#FFF" style={styles.icon} />
            <Text style={styles.eventDate}>{item.event_date}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Icon name="clock" size={16} color="#FFF" style={styles.icon} />
            <Text style={styles.eventTime}>{item.event_time}</Text>
            <Text style={styles.eventTime}>{item.event_location}</Text>
          </View>

          <Text style={styles.eventDescription}>{item.event_description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading events...</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.eventList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9',
    paddingTop: 20,
  },
  eventList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  eventItem: {
    marginBottom: 15,
  },
  eventImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventDetails: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#F1F1F1',
  },
  eventTime: {
    fontSize: 14,
    color: '#F1F1F1',
  },
  eventDescription: {
    fontSize: 14,
    color: '#F1F1F1',
  },
});
