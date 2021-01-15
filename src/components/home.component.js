import React,{useEffect,useContext, useState} from 'react';
import {  SafeAreaView, Keyboard} from 'react-native';
import {Button,Spinner,  Divider, Input, Layout ,TopNavigation,TopNavigationAction} from '@ui-kitten/components';
import  CostumList from './myList.component'
import { apiData} from '../api/data'
import {Icons} from "../definitons/icons"
import { ThemeContext } from "../../theme-context"
import {DisplayError} from "./DisplayError.component"
export const HomeScreen = ({ navigation  }) => {
  
  const themeContext = useContext(ThemeContext);
  const [isLoading,setIsLoading] = useState(false)
  const [ifError,setIfError] = useState(false)
  const [input,setInput] = useState("")
  const [data,setData] = useState([])
  useEffect(()=>{

    callApi()

  },[data])

  const toggleTheme = () => (
    <TopNavigationAction icon={Icons.sunIcon} onPress={themeContext.toggleTheme}/>
  );
  const callApi = () => {
    setIsLoading(true)
    Keyboard.dismiss()
    setTimeout(()=>{
      setData(apiData)
    },3000)
    setIsLoading(false)
};

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
              onSubmitEditing={callApi}
             />
            <Button
        
              accessoryLeft={Icons.searchIcon} 
              onPress={ callApi}
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
                      <CostumList  style={{flex :1}} navigation={navigation} data={data} />
                  }
                </Layout>
          }
      </Layout>
    </SafeAreaView>
  );
};