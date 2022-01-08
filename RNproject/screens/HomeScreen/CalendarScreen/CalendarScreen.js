import React, { useState, PureComponent } from "react";
import { View, StyleSheet } from 'react-native';
import firebase from "firebase/app";
require('firebase/auth')
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';


function CalendarScreen(props) {
  let [items, setItems] = useState({});
  let [markedDates, setMarkedDates] = useState({})
  let [firstCall, setFirstCall] = useState(true);

  var itemz = items;
  const apartment = props.red.apartment.name;
  const username = props.red.username;

  const currentDay = '2021-03-20';
  const nextDay = '2021-03-21';

  const mine = { key: 'mine', color: '#39e648', selectedDotColor: '#39e648' };
  const other = { key: 'other', color: '#0741f0', selectedDotColor: '#0741f0' };
  const single = { key: 'single', color: 'red', selectedDotColor: 'red' };

  var getTimetables = firebase.functions().httpsCallable('timetables-getEvents');


  function callBack(result, actualMonth, month) {

    var events = JSON.parse(result.data);

    var markdDates = JSON.parse(JSON.stringify(markedDates))

    if (events == undefined || events == null) {
      //copy of items in newItems
      const item = JSON.parse(JSON.stringify(items))

      for (let i = -15; i < 85; i++) {
        const time = month.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!item[strTime] && !items[strTime]) {
          item[strTime] = [];
        }
      }

      itemz = item;
      setItems(item);
      return;
    }

    if (events == undefined || events == null) return;

    var days;
    days = Object.keys(events);

    //copy of items in newItems
    const item = JSON.parse(JSON.stringify(itemz))
    //console.log(itemz);

    var eventObj;
    var dots;
    var evArray;
    days.forEach(function (day, index, days) {

      dots = [];
      evArray = [];

      let dayEvents = Object.keys(events[day]);

      if (day < 10) {
        days[index] = month.year + '-' + actualMonth.month + '-' + '0' + day;
      } else {
        days[index] = month.year + '-' + actualMonth.month + '-' + day;
      }

      dayEvents.forEach(function (ev, index, dayEvents) {
        eventObj = {};
        eventObj.event = events[day][ev].event;
        eventObj.member = events[day][ev].member;
        eventObj.isSingle = events[day][ev].isSingle;

        evArray.push(eventObj);
        if (eventObj.isSingle) {
          if (!dots.includes(single)) dots.push(single);
        } else {
          if (eventObj.member == username) {
            if (!dots.includes(mine)) dots.push(mine);
          } else {
            if (!dots.includes(other)) dots.push(other);
          }
        }
      })

      //console.log(day, " ha eventi: ", evArray);
      item[days[index]] = evArray;
      markdDates[days[index]] = { dots: dots }

    });

    //create an empty array for each day without events
    for (let i = -15; i < 85; i++) {
      const time = month.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if ((!item[strTime] && !items[strTime]) || (item[strTime] != [] && items[strTime] != [] && !days.includes(strTime) && isSameMonth(strTime, days[0]))) {
        item[strTime] = [];
      }
    }

    itemz = item;
    setItems(item);
    setMarkedDates(markdDates);
  }






  function isSameMonth(m1, m2) {
    let d1 = new Date(Date.parse(m1));
    let d2 = new Date(Date.parse(m2));

    return (d1.getMonth() == d2.getMonth())
  }




  function loadItems(month) {

    const date = {
      month: month.month,
      year: month.year
    }

    //adjusting the month
    var m = month.month + 1;
    if (m < 10) m = '0' + m;

    const actualMonth = {
      month: m
    }

    if (firstCall) {

      setFirstCall(false);

      let d = new Date();
      d.setMonth(month.month);
      d.setFullYear(month.year)
      d.setMonth(d.getMonth()-1);
      
      date.month = d.getMonth()
      date.year = d.getFullYear();

      let m = date.month + 1;
      if (m < 10) m = '0' + m;
      actualMonth.month = m;
    }
    
    getTimetables({ apartment: apartment, date: date }).then((result) => {
      callBack(result, actualMonth, month);
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
      callBack(result, actualMonth, month);
    });


  }


  function renderItem(item) {
    var color;
    var subt; 

    if (item.isSingle) {
      color = 'red'
      subt = ''
    } else {
      if (item.member === username) {
        color = '#40dbc2';
        subt = 'Your turn';
      } else {
        color = '#4839b8';
        subt = item.member + "'s turn";
      }
    }
    return (
      <View>
        <View style={styles.separator}></View>
        <Card
          style={styles.item}
        >
          <Card.Title 
          titleStyle={{fontFamily:'FuturaPTMedium', fontSize:25, marginLeft:18}} 
          title={item.event} 
          titleNumberOfLines={3}
          subtitle={subt}
          subtitleStyle={{fontFamily:'FuturaPTMedium', fontSize:20, marginLeft:18, marginTop:5}} 

          left={(props) => <Avatar.Text size={50} color='white' style={{backgroundColor:color}} label={item.member.substring(0,2).toUpperCase()}/>}
          />
          
        </Card>
      </View>
    );
  
  }
  
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
        onDayPress={(day) => { loadMonthOnPress(day) }}
        theme={{
          selectedDayBackgroundColor: '#f4511e',
          todayTextColor: '#f4511e',
          agendaTodayColor: '#f4511e',
        }}
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
    marginRight: 35,
  },
  emptyDate: {
    height: 110,
    flex: 1,
    paddingTop: 30
  },
  separator: {
    alignSelf: 'stretch',
    height: 2,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginRight:35
  }
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CalendarScreen);