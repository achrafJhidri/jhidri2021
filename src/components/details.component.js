import React ,{useState,useEffect} from 'react';
import { SafeAreaView,Image ,StyleSheet,ScrollView} from 'react-native';
import { Divider,Button, Icon, Layout, Text,Spinner, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {DisplayError} from './DisplayError.component'
import {getPersonnesById} from '../api/api'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

 const DetailsScreen = ({ navigation,route,dispatch ,favorisList}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [isError, setIsError] = useState(false);
  const [buttonTitle,setButtonTitle]=useState("")

  const navigateBack = () => {

    navigation.goBack();

  };
  const loadImage = () => {
    return (<Layout   >
      {/* <Image style={styles.imageView} source={{ uri : "https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg"}} /> */}
      <Image style={styles.imageView} source={{ uri : "https://image.tmdb.org/t/p/w500/"+result.profile_path }}/>

    </Layout>);
  }

  
  const updateFavoris = () => {
    let action ; 
    if ( favorisList.findIndex(i => i === route.params.id) !== -1){
      action = {type: 'REMOVE', value: route.params.id};
      setButtonTitle("follow")

    }else{
      
      action = {type: 'ADD', value: route.params.id};
      setButtonTitle("unfollow")

    }
   
    dispatch(action); 
  }


  useEffect(() => {
    requestDetails();
    favorisList.findIndex(i => i === route.params.id) !== -1 
    ? 
    setButtonTitle("unfollow")
    :
    setButtonTitle("follow")
        
    
  }, []); 
  
  const requestDetails = async () => {
    try {

        const resultat = await getPersonnesById(route.params.id);
        setResult(resultat);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
    }
  }


  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Details' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1 }}>
      {isError ?
        (<DisplayError message="Impossible de récupérer les données de l'acteur" />) :
        (isLoading ?
          (<Layout style={styles.containerLoading}>
            <Spinner  />
          </Layout>) :
          (  
            <ScrollView style={styles.containerScroll}  >
             
                { loadImage()}

                <Layout style={{flexDirection:"row",margin : 10,borderRadius:5,elevation:1}}>
                  <Layout style={styles.gauche}>
                    <Text style = {{fontWeight:"bold"}} >{result.name}</Text> 
                    <Text style = {{marginTop:10}} >{result.gender=="2" ? "Homme":"femme"}</Text>
                  </Layout>
                </Layout>

                

                <Layout style={[styles.corp,{elevation:1}]}>
                  <Layout  style={{margin : 10,marginTop:10}} >
                    <Text style = {styles.info}> travail en tant que : {result.known_for_department}</Text>
                    <Text style = {styles.info}>date de naissance : {result.birthday}</Text>
                    <Text style = {styles.info}>date de mort ? : {result.deathday ? result.deathday : "encore vivant"}</Text>
                    <Text style = {styles.info}> Biography : {result.biography}</Text>



                  </Layout>
                 

                    
                  
                </Layout>

                <Layout style={{margin : 10}}>
                  <Button 
                  onPress={ updateFavoris}
                  >
                      {buttonTitle}
                  </Button>
                </Layout>

            </ScrollView>
          )
        )}
      </Layout>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    favorisList: state.platFavoris
  }
}
export default connect(mapStateToProps)(DetailsScreen);



const styles = StyleSheet.create({
  bigTitles : {
    color : "red",
    fontWeight : "bold"
  },
  info : {
    fontSize : 15
  }
  ,
  gauche  : {
    margin: 10,
   flex : 5    
 },
  droite  : {
    margin: 10,
    alignItems:"flex-end",    
  },
  imageView: {
   margin:10,
   height: 280,
   resizeMode: 'center',
   borderBottomRightRadius:2,
   borderBottomLeftRadius:2
},   

   corp : {
     margin:10,
     flex : 8,
     fontWeight : "bold",
     borderRadius:2,

   },



  
 container:{
     flex : 1,

 },
 
 containerLoading: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 }
 ,
 containerScroll: {
   flex: 1,
   paddingHorizontal: 12,
   paddingVertical: 16,
 }
});

