import React ,{useState,useEffect} from 'react';
import { SafeAreaView,Image ,StyleSheet,ScrollView} from 'react-native';
import { Divider,Button, Icon, Layout, Text,Spinner, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {DisplayError} from './DisplayError.component'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

 const DetailsScreen = ({ navigation,route,dispatch ,favorisList}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isError, setIsError] = useState(false);
  const [buttonTitle,setButtonTitle]=useState("")

  const navigateBack = () => {

    navigation.goBack();

  };
  const loadImage = () => {
    return (<Layout   >
      <Image style={styles.imageView} source={{ uri : "https://cdn.vox-cdn.com/thumbor/HIluJzxPz3qH66lFxxHKVl10UzQ=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/60211577/acastro_180403_1777_youtube_0001.0.jpg"}} />
    </Layout>);
  }

  
  const updateFavoris = () => {
    let action ; 
    if ( favorisList.findIndex(i => i === route.params.id) !== -1){
      action = {type: 'REMOVE', value: route.params.id};
      setButtonTitle("Add to favorits")

    }else{
      
      action = {type: 'ADD', value: route.params.id};
      setButtonTitle("Remove from favorits")

    }
   
    dispatch(action); 
  }


  useEffect(() => {
    // requestRestaurant();
    favorisList.findIndex(i => i === route.params.id) !== -1 
    ? 
    setButtonTitle("Remove from favorits")
    :
    setButtonTitle("Add to favorits")
        
    
  }, []); 
  
  const requestRestaurant = async () => {
    try {
        const RestaurantResult = await getRestaurantbyId(route.params.id);
        setRestaurant(RestaurantResult);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
    }
  }
  const parseTimings = () => {
    let resultat =   ["soufiane","achraf"];
    let table = []
    resultat.forEach((item,index) => table.push(
    <Text key={index}>
        {item}
    </Text>
    ))
    return (<Layout>
      {table}
    </Layout>);
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
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<Layout style={styles.containerLoading}>
            <Spinner  />
          </Layout>) :
          (  
            <ScrollView style={styles.containerScroll}  >
             
                { loadImage()}

                <Layout style={{flexDirection:"row",margin : 10,borderRadius:5,elevation:1}}>
                  <Layout style={styles.gauche}>
                    <Text style = {{fontWeight:"bold"}} >sushi chop</Text> 
                    <Text style = {{marginTop:10}} >agadir city</Text>
                  </Layout>
                  
                  <Layout style={styles.droite}>
                    <Layout style = {{ backgroundColor:"#00FF00", flexDirection:"row", borderRadius:5,padding:5 }}>
                      <Text style = {{fontWeight:"bold",color:"white"}} >4.3 </Text> 
                      <Text style = {{color:"white",padding:3}} >/5</Text> 
                    </Layout>

                    <Text style = {{fontSize:12,fontStyle:"italic"}}>
                      399 votes
                    </Text>
                  </Layout>
                </Layout>

                

                <Layout style={[styles.corp,{elevation:1}]}>
                  <Layout  style={{margin : 10,marginTop:10}} >
                    <Text style = {styles.bigTitles}>Cuisines</Text>
                    <Text style = {styles.info}>MAl7 skar bismilah</Text>
                  </Layout>
                  <Layout  style={{margin : 10,marginTop:0}} >
                    <Text style = {styles.bigTitles}>Numéro(s) de téléphone</Text>
                    <Text style = {styles.info}>+3307192243</Text>
                  </Layout>
                  <Layout  style={{margin: 10,marginTop:0}} >
                    <Text style = {styles.bigTitles}>Adresse</Text>
                    <Text style = {styles.info}>9 rue serpenoise</Text>
                  </Layout>
                  <Layout  style={{margin: 10,marginTop:0,marginBottom:10}} >
                    <Text style = {styles.bigTitles}>Horraires d'ouverture</Text>
                    {parseTimings()}
                    
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
   resizeMode: 'stretch',
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

