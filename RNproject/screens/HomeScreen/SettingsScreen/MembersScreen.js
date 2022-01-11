import React, { useState } from "react";
import { connect } from 'react-redux';
import { update } from '../Redux/actions';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ScrollView } from "react-native";
require('firebase/auth')
import { configureFonts, DefaultTheme, Provider as PaperProvider, List, Switch } from 'react-native-paper';
import firebase from "firebase/app";

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


function MembersScreen(props) {
  const items = [];

  //handles lock apartment switch
  const [isSwitchOn, setIsSwitchOn] = useState(props.red.apartment.locked);

  const onToggleSwitch = () => {
    firebase.database().ref('/app/apartments/' + props.red.apartment.name).update({
     locked:!isSwitchOn
    });
    let new_state = {...props.red};
    new_state.apartment.locked = !isSwitchOn;
    props.update(new_state);
    setIsSwitchOn(!isSwitchOn);
  }

  var members = props.red.apartment.members;
  Object.keys(members).forEach(memberKey => {
    items.push(
      <List.Item
        key={memberKey}
        titleStyle={styles.list}
        title={members[memberKey]}
        left={props => <List.Icon icon="account" />}
      />
    )
  })

  return (
    <ScrollView>
      <View style={styles.main}>
        <PaperProvider theme={theme}>
          <View>
            {items}
            <List.Item
              style={styles.lock}
              description="Deny the access to the apartment"
              titleStyle={styles.lockFont}
              title={"Lock aparment"}
              left={props => <List.Icon icon={isSwitchOn ? "lock" : "lock-open-outline"} />}
              right={props =>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color="#f4511e"
                  style={styles.switch}
                />
              }
            />
          </View>
        </PaperProvider>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    fontSize: 21
  },
  switch: {
    marginRight: 15
  },
  lock: {
    marginTop: 10,
  },
  lockFont:{
    fontSize: 19
  }
})


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    update,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersScreen);