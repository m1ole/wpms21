import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ListItem = ({singleMedia}) => {
  console.log(singleMedia);
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.row}>
        <View style={styles.imagebox}>
          <Image
            style={styles.image}
            source={{uri: singleMedia.thumbnails.w160}}
          />
        </View>
        <View style={styles.textbox}>
          <Text style={styles.listTitle}>{singleMedia.title}</Text>
          <Text style={styles.description}> {singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'rgb(36,40,52)',
    borderBottomWidth: 10,
    height: 150,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 50,
  },
  textbox: {
    flex: 1,
    marginLeft: 5,
  },
  listTitle: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
    color: 'white',
  },
  description: {
    marginLeft: 5,
    fontSize: 13,
    color: 'grey',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
