
import React from 'react';
import {  StyleSheet ,Image,SafeAreaView } from 'react-native';
import {  Text, Layout,   } from '@ui-kitten/components';
//short Description of the item

export const ItemDescription = ({item,isFavoris}) => {
    return (
        <SafeAreaView  style={{ flex: 1 }}>
        <Layout style={styles.container}>
            <Layout style={styles.TitleContainer}>
                <Text style={styles.restaurantName}> {item.title}</Text>

                { 
                isFavoris ?
                    <Image style={[styles.image,{marginLeft:"auto"}]} source={{ uri:"https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg"}} />
                    :
                    <Image style={[styles.image,{marginLeft:"auto"}]} source={{ uri:"https://criarestilosnet.com/wp-content/uploads/2020/04/youtube-video-thumbnail-1200x675.jpg"}}  />
                }
            </Layout>
        
            <Text style={styles.statsEtType} numberOfLines={1}>bonjour bienvenu chez nous</Text>
            <Layout style={styles.subcontainer}>

                <Image style={styles.image} source={{ uri:"https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg"}} />

                <Text style={styles.statsEtType}> 99 </Text>

                <Image 
                style={styles.image}
                source={{ uri:"https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg"}} 
                />

                <Text style={styles.statsEtType}> 400/1000</Text>
            </Layout>
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

