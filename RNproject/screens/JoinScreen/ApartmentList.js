import React, { useState } from 'react';
import {FlatList, Text, TextInput, Modal, View, StyleSheet, TouchableHighlight} from 'react-native';


export default ApartmentList = (props) => {
    [modalVisible, setModalVisible] = useState(false);
    return (
    <FlatList 
        data={props.apartments}
        keyExtractor={(item) => item}
        renderItem={({index, item}) => {
           return (<ApartmentRow apartment={item}/>)
        }}
    
    />);
}

ApartmentRow = (props) => {
    return (
        <View>
            <TouchableHighlight activeOpacity={0.8} underlayColor="white" onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.apartment}</Text>
                </View> 
        </TouchableHighlight>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <TextInput
                style={styles.input}
                placeholder="Code"
                />
                </View>
            </View>
        </Modal>
        </View>
        

        
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(249,99,70,1)",
        flex: 1,
        marginTop:13,
        marginBottom:13,
        marginLeft:10,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
        color: "#fff"
    },
    input: {
        height: 50,
        margin: 5,
        fontSize: 28
      }
   
});