import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';


 const CostumList = ({navigation,data,dispatch,favorisList}) => {
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
    let text = favorisList.findIndex(i => i === id) !== -1 ? "remove from favoris" : "add to favoris"
    
    return ( <Button size='tiny' onPress={()=> updateFavoris(id)}>{text}</Button>
  );}

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  const showDescription = (id)=>{
    navigation.navigate("Details",{
      id : id 
    })
  }

  const reCallApi = ()=> {
    
  }


  const renderItem = ({ item, index }) => {
        return(
            <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={() => renderItemAccessory(item.id)}
            onPress={()=> showDescription(item.id)}
            />)
}
  return (
    <SafeAreaView  style={{ flex: 1 }}>
      <List
        data={data}
        renderItem={renderItem}
        refreshing={true}
        // onRefresh={loadRestaurants}
        // onEndReached={loadRestaurants}
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

