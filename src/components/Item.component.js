import { Text } from '@ui-kitten/components';
import React from 'react';
import {  StyleSheet,Image, TouchableOpacity  } from 'react-native';
import {ItemDescription} from './ItemShortDescription.component'

export const MyItem = ({onClick,item,isFavoris}) => {

    const displayThumbnail = () => {
        // if (item.thumb) {
          return (
              <Image style={styles.miniatureSize} source={{ uri : "https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg" }} />
          );
        // };
        // return (
        //   <View style={styles.noThumbnailContainer}>
        //     <Image source={Assets.icons.missingImg} />
        //   </View>
        // );
      }
    
    return (

        <TouchableOpacity  
             onPress = {() => { onClick(item.id) }}
             style={styles.container}>
            { displayThumbnail()  }
            <ItemDescription isFavoris={isFavoris} item={item}/>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    miniatureSize: {
        width:128,
        height:128,
        borderRadius:20
    },
    container:{
        flexDirection:"row",
        marginTop:10,
        marginLeft:10
    }, 
    noThumbnailContainer: {
      width: 128,
      height: 128,
      alignItems: 'center',
      justifyContent: 'center',
    }
   
})

