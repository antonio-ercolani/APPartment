import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { RefreshControl, ActivityIndicator, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import "firebase/database";
import { DataTable } from 'react-native-paper';



const font = 'FuturaPTDemi';
const fontConfig = {
  default: {
    regular: {
      fontFamily: font,
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    text: 'black',
    placeholder: 'black'
  },
  fonts: configureFonts(fontConfig)
};



function StockManagementScreen(props) {
  const navigation = useNavigation();

  const items = [];
  const [renderList, setRenderList] = useState([]);
  const [missingItems, setMissingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noItems, setNoItems] = useState(false);

  const members = props.red.apartment.members;
  let name;
  let member;
  let date;
  let timestamp, day, month, year;

  function callGetMissingItems() {
    firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items/').get()
      .then((result) => {
        if (result.val() != null) {
          setMissingItems(result.val());
          setLoading(false);
        } else {
          setNoItems(true);
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    callGetMissingItems();
  }, []);

  useEffect(() => {
    if (missingItems.length !== 0) {
      items.push(

      )
    }
    if (missingItems.length !== 0) {
      items.push(
        <View key={1} >
          <Text style={styles.missingItemsTitle}>MISSING ITEMS</Text>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Inserted by</DataTable.Title>
            <DataTable.Title numeric>Missing from</DataTable.Title>
          </DataTable.Header>
        </View>
      )
    }
    for (var key in missingItems) {
      name = missingItems[key].name;
      member = members[missingItems[key].member];

      timestamp = new Date(missingItems[key].timestamp);
      day = timestamp.getDate();
      month = timestamp.getMonth() + 1;
      year = timestamp.getFullYear();
      date = day + '/' + month + '/' + year;

      items.push(
        <DataTable.Row key={key} >
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell numeric>{member}</DataTable.Cell>
          <DataTable.Cell numeric>{date}</DataTable.Cell>
        </DataTable.Row>)
    }

    setRenderList(items);
  }, [missingItems])


  function goToNewItem() {
    navigation.navigate('NewItem');
  }

  function goToRemoveItems() {
    const vett = [];
    function Item(name, id) {
      this.name = name;
      this.id = id;
    }
    firebase.database().ref('/app/stockManagement/' + props.red.apartment.name + '/items/').get()
      .then((snapshot) => {
        snapshot.forEach(child => {
          vett.push(new Item(child.val().name, child.key));
        })
        navigation.navigate('RemoveItems', { items: vett })
      })
  }

  return (
    
    <ScrollView
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={callGetMissingItems}
    />
    }
    >
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNewItem()}>
            <Text style={styles.buttonText}>ADD {'\n'}ITEM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToRemoveItems()}>
            <Text style={styles.buttonText}>REMOVE {'\n'}ITEMS </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <View style={styles.separator}></View>
          <DataTable>
            {renderList}
          </DataTable>
          {noItems &&
          <View style={styles.noAnnouncements}>
            <Text style={styles.noAnnouncementsText}>There are no missing items,</Text>
            <Text style={styles.noAnnouncementsText}>click on the button to add one!</Text>
          </View>
        }
        </View>
        {loading && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 30 }} />}
        
      </PaperProvider>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  main: {
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#f4511e',
    width: 120,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: 270,
    alignSelf: 'center'
  },
  buttonText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "white",
    fontFamily: "FuturaPTBold",
    marginLeft: 12
  },
  separator: {
    width: 270,
    alignSelf: 'center',
    height: 2,
    marginTop: 10,
    backgroundColor: "#6b6b6b",
    borderRadius: 34,
  },
  missingItemsTitle: {
    textAlign: "center",
    fontFamily: "FuturaPTBold",
    fontSize: 30,
    marginBottom: 10,
    color: "#f4511e",
    marginTop: 20
  },
  noAnnouncements: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 40,
  },
  noAnnouncementsText: {
    fontFamily: "FuturaPTDemi",
    fontSize: 20
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(StockManagementScreen);
