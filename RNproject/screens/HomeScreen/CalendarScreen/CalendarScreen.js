import React, { useState, PureComponent } from "react";
import { View, StyleSheet, Text } from 'react-native';
import firebase from "firebase/app";
require('firebase/auth')
import {Agenda} from 'react-native-calendars';




export default function CalendarScreen() {
  let [items, setItems] = useState({})

  const currentDay = '2021-03-20';
  const nextDay = '2021-03-21'
  function loadItems(day) {
    console.log("CHIAMATO")
    const items = {}
    setTimeout(() => {
      for (let i = -15; i < 85 ; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      items[currentDay] = [{name: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'}]
      items[nextDay] = [{name: 'FDFDDDDDDDDDDDDD'}]

      setItems(items)
    }, 1000);
  }

  const vacation = {key:'vacation', color: 'red', selectedDotColor: 'red'};
  const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key:'workout', color: 'green'};

  const markedDates = {}
  markedDates[currentDay] = {dots: [vacation, massage]};
  markedDates[nextDay] = {dots: [workout]}
  
  return (
        <Agenda
          items={items} 
          loadItemsForMonth={(month) => {loadItems(month)}}
          minDate={'2021-03-01'}  
          maxDate={'2022-06-01'}
          pastScrollRange={2}
          futureScrollRange={12}
          markedDates={markedDates}
          markingType={'multi-dot'}
          renderEmptyDate={() => renderEmptyDate()}
          renderItem={(item)=> renderItem(item)}
        />
  );
}

function renderEmptyDate() {
  return(
    <PureEmptyDate></PureEmptyDate>
  )
}

class PureEmptyDate extends PureComponent {
  
  render() {
    return (
      <View style={styles.emptyDate}>
        <View style={styles.separator}></View>
      </View>
    );
  }
}

function renderItem(item) {
  return (
    <PureRenderItem item={item}></PureRenderItem>
  );
}

class PureRenderItem extends PureComponent {

  state = {item: this.props.item}

  render() {
    return (
      <View>
      <View style={styles.separator}></View>
      <View
        style={[styles.item, { height: 120 }]} 
      >
      <Text>{this.state.item.name}</Text>
      </View>
    </View>
    );
  }
}

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}



const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    width:290
  },
  emptyDate: {
    height: 110,
    flex: 1,
    paddingTop: 30
  },
  separator: {
    width: 290,
    height: 2,
    backgroundColor: "rgba(230, 230, 230,1)"
  }
});