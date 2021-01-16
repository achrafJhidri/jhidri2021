
import React from 'react';
import {  StyleSheet ,Image,SafeAreaView } from 'react-native';
import {  Text, Layout, Button,   } from '@ui-kitten/components';
//short Description of the item

export const ItemDescription = ({item,isFavoris,actorMovies}) => {

   
   
    return (
        <SafeAreaView  style={{ flex: 1 }}>
        <Layout style={styles.container}>
            <Layout style={styles.TitleContainer}>
                <Text style={styles.restaurantName}> {item.name}</Text>

               
            </Layout>



            <Text style={styles.statsEtType} numberOfLines={1}>Profession : {item.known_for_department}</Text>
            
            

           
        </Layout>
        </SafeAreaView>
    
);
}


const styles = StyleSheet.create({
    restaurantName: {
        fontSize:20,
        fontWeight:"bold"
    },
    statsEtType: {
        fontSize:16
    },
    container:{
        flex : 1,
        padding:20,
    },
    TitleContainer : {
        flexDirection:"row"
    },
    subcontainer :{
        flexDirection:"row",
    },
    image: {
        width:20,
        height:20,
        borderRadius:20
    },
})

