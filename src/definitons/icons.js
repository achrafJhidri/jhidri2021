import React from 'react';
import {Icon} from '@ui-kitten/components';


const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );
const StarIcon = (props) => (
  <Icon {...props} name='star' />
);
const HomeIcon = (props) => (
  <Icon {...props} name='home' />
);

const searchIcon = (props) => (
  <Icon {...props} name='search'/>
);
const sunIcon = (props) => (
<Icon {...props} name='sun'/>
);
const personIcon = (props) => (
  <Icon {...props} name='person'/>
);

export const  Icons = {
  BackIcon,
  StarIcon,
  searchIcon,
  sunIcon,
  HomeIcon,
  personIcon,
}