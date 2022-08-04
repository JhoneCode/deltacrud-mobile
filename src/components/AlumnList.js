import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TextInput, TouchableOpacity } from 'react-native';
import { AlumnItem } from './AlumnItem';
import  axios  from 'axios';
import { CantConnect } from './CantConnect';
import { LoadingScreen } from './LoadingScreen';
import { RefreshControl } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'



export function AlumnList() {

  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
      getData();
  }, [searchText, refreshing]);

  async function getData() {
      
    const controller = new AbortController();
  
    axios.get(
      'https://deltacrud-backend-production.up.railway.app/alumns',
      { signal: controller.signal }
    ).then(({ data }) => {
      if(searchText === '') {
        setList(data);
      }
      else {
        setList(
          data.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
          )
        )
      }
      setIsLoading(false)
    })
  .catch((error) => {
    console.log(error.response.data)
    setIsConnected(false);
    setIsLoading(false)
    })
  }

  const handleOrderClick = () => {
    let newList = [...list];

    newList.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
    setList(newList);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getData();
    setIsRefreshing(false);
  };

    function renderItem({ item }) {
      return <AlumnItem {...item} refresh={onRefresh}/>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise um aluno..."
          placeholderTextColor="#888888"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderbutton}>
          <MaterialCommunityIcons
            name='order-alphabetical-ascending'
            size={32}
            color='#888'
            style={styles.orderButtonIcon}
          />
        </TouchableOpacity>
      </View>
      { isLoading | refreshing ? <LoadingScreen/> : isConnected && list.length > 0 ? <FlatList
        data={list}
        keyExtractor= {item => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl
        progressBackgroundColor="#4c46c8"
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
      />}
      /> : <CantConnect refreshing={refreshing} refresh={onRefresh}/>}
      { }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  searchArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  input: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 280,
    marginBottom: 20,
    borderRadius: 5,
    color: '#eeeeee'
  },
  orderButtonIcon: {
    marginLeft: 20,
    marginBottom: 20,
  }
})
