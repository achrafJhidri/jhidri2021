import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from "../components/home.component"
import  DetailsScreen  from '../components/details.component';
import   FavorisScreen  from '../components/favorisScreen'

import {icons} from "../definitons/icons"


const stackNav = createStackNavigator();


const HomeNavigator = () => (
  <stackNav.Navigator headerMode='none'>
    <stackNav.Screen name='Home' component={HomeScreen}/>
    <stackNav.Screen name='Details' component={DetailsScreen}/>
  </stackNav.Navigator>
);


const TabNav = createBottomTabNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
      <TabNav.Navigator>
        <TabNav.Screen name="Home" component={HomeNavigator}  />
        <TabNav.Screen name="Followed" component={FavorisScreen} />
      </TabNav.Navigator>
  </NavigationContainer>
);


