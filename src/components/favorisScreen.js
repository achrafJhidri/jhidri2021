import React,{useState,useEffect} from 'react';
import {  SafeAreaView } from 'react-native';
import { Divider, List,TopNavigation, Layout, Spinner, Text  } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {DisplayError} from './DisplayError.component'
import {MyItem} from './Item.component'
import {apiData} from '../api/data'

const FavorisScreen = ({navigation, favorisList }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [ifError,setError] = useState(false);

  useEffect(() => {
    // loadRestaurants();
}, [favorisList]); 
const asyncCall = (id) => {

}
const loadRestaurants = async () => {
  // try {
  //     let tab =[]
      
  //     for( id of favorisList){
  //         const result = await asyncCall(id);
  //         tab.push(result);
      
  //     }
 
  //     setIsLoading(false);
  //     setResults(tab);
  //     console.log(result)
  // } catch (error) {
  //     setError(true);
  //     setResults([]);
  // }
}
const navigateToItemDetails = (id) => {
  navigation.navigate("Details",{
  id : id 
} );
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Favoris' alignment='center'/>
      <Divider/>
      {ifError ?
       <DisplayError message='Impossible de récupérer les données du item' />
       :
       isLoading ?
       (<Layout >
         <Spinner size="large" />
       </Layout>) 
       :

       <List
        data={apiData} 
        renderItem={
           ({item}) => 
                    <MyItem 
                    isFavoris={favorisList.findIndex(i => i === item.id) !== -1}
                    item={item} 
                    onClick={navigateToItemDetails} 
                    /> 

                  }
        keyExtractor={ (item) =>  item.id.toString() } 
        extraData={favorisList}
        refreshing={isLoading}
        onRefresh={loadRestaurants}
        onEndReached={loadRestaurants}
        onEndReachedThreshold={0.5}
      />
       }
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    favorisList: state.platFavoris
  }
}


export default connect(mapStateToProps)(FavorisScreen);