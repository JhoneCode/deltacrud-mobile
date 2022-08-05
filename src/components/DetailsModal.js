import React, { useState } from 'react';
import {  Modal, StyleSheet, Text, Pressable, View, Image, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
  useFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';


export function DetailsModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

  useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent:  'center', paddingTop: 35}} style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Mais informações</Text>
            <Text style={styles.modalTextTitle}>Nome:</Text>
            <Text style={styles.modalTextName}>{props.name}</Text>
            <Text style={styles.modalTextTitle}>Avatar:</Text>
            <Image style={{width: 180, height: 180, borderRadius: 10, marginBottom: "5%"}} source={{uri: props.url}}/>
            <Text style={styles.modalTextTitle}>Endereço:</Text>
            <Text style={styles.modalTextName}>{props.address}</Text>
            <Text style={styles.modalTextTitle}>Criado em:</Text>
            <Text style={styles.modalTextName}>{props.createdAt}</Text>
            <Text style={styles.modalTextTitle}>Atualizado em:</Text>
            <Text style={styles.modalTextName}>{(props.updatedAt ?  props.updatedAt : '-')}</Text>
            <Text style={styles.modalTextTitle}>ID no sistema:</Text>
            <Text style={styles.modalTextName}>{(props._id)}</Text>
            <Text style={styles.modalTextTitle}>Url do Avatar:</Text>
            <Text style={styles.modalTextName}>{(props.url)}</Text>
            <View style={{flexDirection: 'row', borderTopColor:'#eeeeee', borderTopWidth: 1, marginTop: 10, width: '90%'}}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalTextButtonClose}>Fechar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>
        <MaterialIcons name='info-outline' size={32} style={styles.icon} 
        onPress={() => setModalVisible(true)}/>
    </View>
  );
};

const styles = StyleSheet.create({

  centeredView: {
    flex:1,
    justifyContent:  'center',
    alignItems: 'center',
  },
  centeredView2: {
    flex:1,
    flexDirection: 'row',
    justifyContent:  'center',
    alignItems: 'center',
  },

  modalView: {
    height: '82%',
    margin: 20,
    backgroundColor: '#18191A',
    opacity: .95,
    borderRadius: 20,
    shadowColor: '#4c46c8',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  icon: {
    color: '#eeeeee',
    marginRight: 30
  },

  buttonClose: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextTitle: {
    fontSize: 18,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: 'center',
    color: '#eeeeee',
    fontFamily: 'Inter_300Light'
  },
  modalTextName: {
    fontSize: 16,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: 'center',
    color: '#797ef6',
    fontFamily: 'Inter_500Medium'
  },
  modalTextButtonClose: {
    fontSize: 16,
    textAlign: 'center',
    color: '#eeeeee',
    fontFamily: 'Inter_600SemiBold'
  },

});






