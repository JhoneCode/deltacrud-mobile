import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { UpdateModal } from './UpdateModal';
import { DeleteModal } from './DeleteModal';
import { DetailsModal } from './DetailsModal';

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  inter_500Medium,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';





export function AlumnItem({ name, address, url, createdAt, updatedAt, _id, refresh}) {
  const [showOptions, setShowOptions] = useState(false);

  
  useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    inter_500Medium,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  return (
    
    <TouchableWithoutFeedback onPress={() =>{setShowOptions(!showOptions)}}>
        <View style={styles.container}>
          <View style={styles.aside}/>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
            { showOptions ? 
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <UpdateModal name={name} address={address} id={_id} refresh={refresh}/>
              <DeleteModal name={name} id={_id} refresh={refresh}/>
              <DetailsModal name={name} address={address} updatedAt={updatedAt} createdAt={createdAt} url={url} _id={_id}/>
            </View> : null}
          </View>
          <Image style={styles.image} source={{uri: url}}/>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({

  container: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#4c46c8',
  },
  content: {
    width: 200,
    marginRight: 4,
    marginVertical: 10
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 10,
    color: '#d3d3d3',
  },
  address: {
    fontFamily: 'Inter_500Medium',
    color: '#797ef6',
    fontSize: 14,
    marginBottom: 20,

  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 10,    
  },
  aside: {
    backgroundColor: '#797ef6',
    width: 4,
    height: '100%'
  }
})
