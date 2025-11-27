import { StyleSheet} from 'react-native'
import React from 'react'
import { Image } from 'expo-image';

const AvatarComponent = () => {
  return (
<>


    <Image 
    source={require('../assets/icon.jpg')}
    className="w-20 h-20"
    contentFit='cover'
    style={{width:80, height:80, borderRadius:100}} 
    />



</>

)
}

export default AvatarComponent

const styles = StyleSheet.create({})