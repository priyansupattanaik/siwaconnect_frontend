import React from 'react';
import {View, Image, StyleSheet, FlatList, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const imageSize = width / 3 - 8; // Adjusted margin to make space between images

export default function EventGalleryScreen() {
  const route = useRoute();
  const {eventId} = route.params;

  // Hardcoded event images for now
  const eventImages = [
    require('../assets/neighborhood-potluck-1.webp'),
    require('../assets/neighborhood-potluck-2.jpeg'),
    require('../assets/community-workshop-1.jpeg'),
    require('../assets/community-workshop-2.webp'),
    require('../assets/spring-festival-1.jpeg'),
    require('../assets/spring-festival-2.jpeg'),
  ];

  // Render each image
  const renderImageItem = ({item}) => (
    <Image source={item} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventImages}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9', // Light background color to match the palette
    paddingTop: 20, // Add some space at the top
  },
  imageList: {
    alignItems: 'center', // Center the images horizontally
    padding: 4, // Reduced padding for a cleaner layout
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 4, // Even spacing between images
    borderRadius: 8, // Rounded corners for a softer look
    borderWidth: 1,
    borderColor: '#D9C8A1', // Subtle border matching the color palette
  },
});
