import * as React from 'react';
import { View, Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
require('firebase/auth')
import { useNavigation, useRoute } from '@react-navigation/native';

function CreditsScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const items = [];
  const debts = route.params.debts;
  //console.log(debts);
  //console.log(props.red.apartment.members[debts[0].uid])

  //find a better way for generating the keys
  var i = 0;
  debts.forEach((debt) => {
    items.push(<Text key={i}>{debt.amount} - {props.red.apartment.members[debt.uid]}</Text>);
    i = i +1;
  })
  return (
    <PaperProvider>
      <View>
        {items}
      </View>
    </PaperProvider>
  );
}

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(CreditsScreen);