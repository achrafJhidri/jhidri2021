import React,{useEffect,useContext, useState} from 'react';
import {  SafeAreaView, Keyboard} from 'react-native';
import {Button,Spinner,  Divider, Input, Layout ,TopNavigation,TopNavigationAction} from '@ui-kitten/components';
import  CostumList from './myList.component'

import {Icons} from "../definitons/icons"
import { ThemeContext } from "../../theme-context"
import {DisplayError} from "./DisplayError.component"

import {getPersonnes,getPersonnesByName} from "../api/api"
export const HomeScreen = ({ navigation  }) => {
  
  const themeContext = useContext(ThemeContext);
  const [isLoading,setIsLoading] = useState(false)
  const [ifError,setIfError] = useState(false)
  const [input,setInput] = useState("")
  const [result,setResult] = useState([])
  const [page,setPage]=useState(1)
  useEffect(()=>{

    loadPersonnes()

  },[])

  const toggleTheme = () => (
    <TopNavigationAction icon={Icons.sunIcon} onPress={themeContext.toggleTheme}/>
  );

const loadPersonnes = async () => {
  try {
      setIsLoading(true);
      const resultat = await getPersonnes(page);
      
      setResult([...result,...(resultat.results)]);
      setPage(page+1)
      setIsLoading(false);
  } catch (error) {
      setIfError(true);
      setResults([]);
      setPage(1)
  }
}
const searchPersonnesByName = async (name="") => {
  Keyboard.dismiss()
  if ( name != "")
    {
        try {
          setIsLoading(true);
          setPage(page)
          const resultat = await getPersonnesByName(name);
          
          setResult(resultat.results);
          setPage(page+1)
          setIsLoading(false);
          console.log(resultat)
      } catch (error) {
          setIfError(true);
          setResults([]);
          setPage(1)
      }
    }else {
      loadPersonnes()
    }
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Home' alignment='center' accessoryRight={toggleTheme} />
      <Divider/>

      <Layout style={{ flex: 1 }}>
        <Layout style={{justifyContent:"center",alignItems:"center"}}>
            <Input 
              style={{margin:10}}
              textAlign="center"
              placeholder='Nom du restaurant'
              onChangeText={(value)=> setInput(value)}
              onSubmitEditing={() => searchPersonnesByName(input)}
             />
            <Button
        
              accessoryLeft={Icons.searchIcon} 
              onPress={ ()=> searchPersonnesByName(input)}
            >
              Rechercher
            </Button>
           
        </Layout>
          {
              ifError ?
                <DisplayError message='Impossible de récupérer les données du item' />
              :
                <Layout style={{flex:1,justifyContent:"center"}} >
                  {
                    isLoading ?
                    <Layout style={{flex:1,justifyContent:"center",alignSelf:"center"}} >
                      <Spinner />
                      </Layout>
                    :
                      <CostumList isRefreshing={isLoading} page={page} onEndReached={ loadPersonnes} style={{flex :1}} navigation={navigation} data={result} />
                  }
                </Layout>
          }
      </Layout>
    </SafeAreaView>
  );
};