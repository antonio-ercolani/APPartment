import React, { useState, PureComponent } from "react";
import { View, StyleSheet, Text } from 'react-native';
import firebase from "firebase/app";
require('firebase/auth')
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';




function CalendarScreen(props) {
  let [items, setItems] = useState({});

  const apartment = props.red.apartment.name;

  const currentDay = '2021-03-20';
  const nextDay = '2021-03-21';

  var getTimetables = firebase.functions().httpsCallable('timetables-getEvents');

  function loadItems(month) {

    //let mm = month.month - 1;
    const date = {
      month: month.month,
      year: month.year
    }

    //adjusting the month
    var m = month.month+1;
    if (m < 10) m = '0' + m;

    const actualMonth = {
      month: m
    }

    getTimetables({ apartment: apartment, date: date }).then((result) => {

      var events = JSON.parse(result.data);

      if (events == undefined) {
        //copy of items in newItems
        const item = JSON.parse(JSON.stringify(items))

        for (let i = -15; i < 85; i++) {
          const time = month.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!item[strTime]) {
            item[strTime] = [];
          }
        }
        setItems(item);
        return;
      }

      var days;
      days = Object.keys(events);
      console.log(days);

      /*days.forEach(function (day, index, days) {
        if (day < 10) {
          days[index] = month.year + '-' + actualMonth.month + '-' + '0' + day;
        } else {
          days[index] = month.year + '-' + actualMonth.month + '-' + day;
        }
      });*/

      //copy of items in newItems
      const item = JSON.parse(JSON.stringify(items))

      setTimeout(() => {
        //create an empty array for each day without events
        for (let i = -15; i < 85; i++) {
          const time = month.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          //if (!item[strTime]) {
            item[strTime] = [];
          //}
        }
        item[currentDay] = [{ event: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }]
        item[nextDay] = [{ event: 'FDFDDDDDDDDDDDDD' }]


        var eventObj;
        days.forEach(function (day, index, days) {

          
          eventObj = {};

          let dayEvents = Object.keys(events[day]);

          if (day < 10) {
            days[index] = month.year + '-' + actualMonth.month + '-' + '0' + day;
          } else {
            days[index] = month.year + '-' + actualMonth.month + '-' + day;
          }

          dayEvents.forEach(function(ev, index, dayEvents) {
            eventObj.event = events[day][ev].event;
            eventObj.member = events[day][ev].member;
          })

          
          item[days[index]] = [eventObj]



        });
        setItems(item);

      }, 1000);

    });

  }

  function loadMonthOnPress(month) {
    let mm = month.month - 1;
    const date = {
      month: mm,
      year: month.year
    }

    //adjusting the month
    var m = month.month;
    if (m < 10) m = '0' + m;

    const actualMonth = {
      month: m
    }

    getTimetables({ apartment: apartment, date: date }).then((result) => {

      var events = JSON.parse(result.data);

      if (events == undefined) {
        //copy of items in newItems
        const item = JSON.parse(JSON.stringify(items))

        for (let i = -15; i < 85; i++) {
          const time = month.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!item[strTime]) {
            item[strTime] = [];
          }
        }
        setItems(item);
        return;
      }

      var days;
      days = Object.keys(events);
      console.log(days);

      /*days.forEach(function (day, index, days) {
        if (day < 10) {
          days[index] = month.year + '-' + actualMonth.month + '-' + '0' + day;
        } else {
          days[index] = month.year + '-' + actualMonth.month + '-' + day;
        }
      });*/

      //copy of items in newItems
      const item = JSON.parse(JSON.stringify(items))

      setTimeout(() => {
        //create an empty array for each day without events
        for (let i = -15; i < 85; i++) {
          const time = month.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          //if (!item[strTime]) {
            item[strTime] = [];
          //}
        }
        item[currentDay] = [{ event: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' }]
        item[nextDay] = [{ event: 'FDFDDDDDDDDDDDDD' }]


        var eventObj;
        days.forEach(function (day, index, days) {

          
          eventObj = {};

          let dayEvents = Object.keys(events[day]);

          if (day < 10) {
            days[index] = month.year + '-' + actualMonth.month + '-' + '0' + day;
          } else {
            days[index] = month.year + '-' + actualMonth.month + '-' + day;
          }

          dayEvents.forEach(function(ev, index, dayEvents) {
            eventObj.event = events[day][ev].event;
            eventObj.member = events[day][ev].member;
          })

          
          item[days[index]] = [eventObj]



        });
        setItems(item);

      }, 1000);

    });

  }



  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'red' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  const markedDates = {}
  markedDates[currentDay] = { dots: [vacation, massage] };
  markedDates[nextDay] = { dots: [workout] }

  return (
    <Agenda
      items={items}
      loadItemsForMonth={(month) => { loadItems(month) }}
      minDate={'2021-03-01'}
      maxDate={'2022-06-01'}
      pastScrollRange={2}
      futureScrollRange={12}
      markedDates={markedDates}
      markingType={'multi-dot'}
      renderEmptyDate={() => renderEmptyDate()}
      renderItem={(item) => renderItem(item)}
      onDayPress={(day)=>{loadMonthOnPress(day)}}  
      />
  );
}

function renderEmptyDate() {
  return (
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

  state = { item: this.props.item }

  render() {
    return (
      <View>
        <View style={styles.separator}></View>
        <View
          style={[styles.item, { height: 120 }]}
        >
          <Text>{this.state.item.event}</Text>
          <Text>{this.state.item.member}</Text>
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
    width: 290
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


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CalendarScreen);