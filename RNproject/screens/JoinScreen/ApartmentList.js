import React from 'react';
import {FlatList, Text, Image, View, StyleSheet, TouchableHighlight} from 'react-native';


export default ApartmentList = ({apartments}) => {
    return (
    <FlatList 
        data={apartments}
        keyExtractor={(movie, index) => {
            return movie.imdbID;
        }}
        renderItem={({index, item}) => {
           return (<MovieRow navigate={navigate} movie={item} />)
        }}
    
    />);
}

ApartmentRow = ({movie, navigate}) => {
    return (
        <TouchableHighlight activeOpacity={0.9} underlayColor="darkblue" onPress={() => navigate(movie)}>
            <View style={styles.container}>
                <Image style={styles.poster} source={{uri: movie.Poster}}/>
                <View style={[styles.container, styles.description]}>
                    <Text style={styles.title}>{movie.Title}</Text>
                    <Text style={styles.year}>{movie.Year}</Text>
                </View>
            </View> 
        </TouchableHighlight>
   

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    poster: {
        height: 250,
        width: 150,
        marginRight: 10
    },
    description: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: "500"
    },
    year : {
        fontSize: 16,
        fontWeight: "400"
    }
});