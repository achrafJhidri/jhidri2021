import React from 'react';
import { Button, Icon, List, ListItem,Layout } from '@ui-kitten/components';
import { SafeAreaView,Image ,StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import {Icons} from '../definitons/icons'

 const CostumList = ({isRefreshing,page,onEndReached,navigation,data,dispatch,favorisList}) => {
    const updateFavoris = (id) => {
        let action ;
        favorisList.findIndex(i => i === id) !== -1
        ? 
        action = {type: 'REMOVE', value: id} 
        :
        action = {type: 'ADD', value: id}
        dispatch(action)

    
      }
  const renderItemAccessory = (id) => {
    let text = favorisList.findIndex(i => i === id) !== -1 ? "unfollow" : "follow"
    
    return ( <Button size='tiny' onPress={()=> updateFavoris(id)}>{text}</Button>
  );}

  const renderItemIcon = (path) => {
    
  
  
    
    if (path) {
      return (
        <Image style={styles.miniatureSize} source={{ uri : "https://image.tmdb.org/t/p/w500"+path }}/>
      );
    };
    return (
      <Layout style={styles.noThumbnailContainer}>
        
         <Icon  name='person'/>
      </Layout>
    );
  };

  const showDescription = (id)=>{
    navigation.navigate("Details",{
      id : id 
    })
  }

  
  const displayThumbnail = () => {
    if (actorInfo.profile_path) {
      return (
        <Image style={styles.miniatureSize} source={{ uri : "https://image.tmdb.org/t/p/w500"+actorInfo.profile_path }}/>
      );
    };
    return (
      <View style={styles.noThumbnailContainer}>
        { <Icon source={icons.missingImg} /> }
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
        return(
            <ListItem
            title={`${item.name} `}
            accessoryLeft={() => renderItemIcon(item.profile_path)}
            accessoryRight={() => renderItemAccessory(item.id)}
            onPress={()=> showDescription(item.id)}
            />)
}
  return (
    <SafeAreaView  style={{ flex: 1 }}>
      <List
        data={data}
        renderItem={renderItem}
        keyExtractor={ (item) =>  item.id.toString() } 
        refreshing={isRefreshing}
        onRefresh={()=>onEndReached(1)}
        onEndReached={()=> onEndReached(page)}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
    return {
      favorisList: state.platFavoris
    }
  }
 export default connect(mapStateToProps)(CostumList);


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

