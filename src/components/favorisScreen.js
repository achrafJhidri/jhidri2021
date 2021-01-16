import React,{useState,useEffect} from 'react';
import {  SafeAreaView } from 'react-native';
import { Divider, List,TopNavigation, Layout, Spinner, Text  } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {DisplayError} from './DisplayError.component'
import {MyItem} from './Item.component'
import {getPersonnesById,getMoviesByActorId} from '../api/api'

const FavorisScreen = ({navigation, favorisList }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [movies, setMovies] = useState([]);

  const [ifError,setError] = useState(false);

  useEffect(() => {
    loadRestaurants();
}, [favorisList]); 

const loadRestaurants = async () => {
  try {
      let info =[]
      let movies=[]
      
      for( id of favorisList){
          const informationsOfId = await getPersonnesById(id);
          const moviesOfId = await getMoviesByActorId(id);
          info.push(informationsOfId);
          movies.push(moviesOfId)
      
      }

      setIsLoading(false);
      setInfo(info);
      setMovies(movies);
      setError(false);
  } catch (error) {
    console.log(error)
      setError(true);
      setInfo([]);
      setMovies([]);

  }
}
const navigateToItemDetails = (id) => {
  navigation.navigate("Details",{
  id : id 
} );
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Followed' alignment='center'/>
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
        data={info} 
        renderItem={
           ({item}) =>
                    <MyItem 
                    isFavoris={favorisList.findIndex(i => i === item.id) !== -1}
                    actorInfo={item} 
                    actorMovies={movies}

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