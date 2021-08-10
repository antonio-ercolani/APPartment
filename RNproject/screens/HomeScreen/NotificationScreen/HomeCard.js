import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, ThemeProvider } from 'react-native-paper';
import { Avatar, Button, IconButton, Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


function HomeCard(props) {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={()=> {
        switch (props.nav) {
          case 'payments':
            navigation.navigate("Payments");
            break;
          case 'calendar':
            navigation.navigate("Calendar");
            break;
          case 'members':
            navigation.navigate("Members");
            break;
          case 'stockManagement':
              navigation.navigate("StockManagement");
              break;
          }
        }
      }
    >
      <Card.Title
        style={styles.card}
        title={props.title}
        titleStyle={styles.cardText}
        titleNumberOfLines={2}
        subtitle={props.subtitle}
        subtitleStyle={styles.cardSubtitle}
        right={() => <Avatar.Icon style={{marginRight:8}} size={60} icon={props.icon} />}
      />
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4511e',
    width: '87.6%',
    height: 105,
    borderRadius: 8,
    justifyContent: "center",

  },
  cardText: {
    fontSize: 17,
    fontFamily: "FuturaPTDemi",
    color: "#fff",
    marginLeft:11,
    lineHeight:24
  },
  cardSubtitle: {
    fontSize: 13,
    fontFamily: "FuturaPTDemi",
    color: "#fff",
    marginLeft:15
  }
});

export default HomeCard;