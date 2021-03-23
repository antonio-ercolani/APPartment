import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase/app";
require('firebase/auth')
import { useNavigation } from '@react-navigation/native';

function NewTransactionScreen(props) {
  const navigation = useNavigation(); 

  return (
    <View>
        <Text>
            Come va la vita a milano?
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});


const mapStateToProps = (state) => {
  const { red } = state
  return { red }
};

export default connect(mapStateToProps)(NewTransactionScreen);
