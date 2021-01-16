import React from 'react';

import {  StyleSheet,Image, TouchableOpacity ,View } from 'react-native';
import {ItemDescription} from './ItemShortDescription.component'
import {Icons} from '../definitons/icons'
export const MyItem = ({onClick,actorInfo,isFavoris,actorMovies}) => {

    const displayThumbnail = () => {
        if (actorInfo.profile_path) {
          return (
            <Image style={styles.miniatureSize} source={{ uri : "https://image.tmdb.org/t/p/w500"+actorInfo.profile_path }}/>
          );
        };
        return (
          <View style={styles.noThumbnailContainer}>
            { <Icon source={Icons.missingImg} /> }
          </View>
        );
      }

    return (

        <TouchableOpacity
             onPress = {() => { onClick(actorInfo.id) }}
             style={styles.container}>
            { displayThumbnail()  }
            <ItemDescription isFavoris={isFavoris} item={actorInfo} actorMovies={actorMovies}/>
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

