import React from 'react';
import {  Layout, Text  } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';



export const DisplayError = ({ message = "Une erreur c'est produite" }) => (
  <SafeAreaView  style={{ flex: 1 }}>
    <Layout style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>{message}</Text>
    </Layout>
  </SafeAreaView>
);



