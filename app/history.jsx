import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Layout } from '@ui-kitten/components'
import { RouteHistoryComponent } from '../components'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'


const data = [1, 2, 3, 4, 5, 6];
const duration = 300

const history = () => {
  return (

<Layout style={styles.container}>
<View style={styles.viewContainer}> 

<FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({index}) => (
        <Animated.View  entering={FadeInLeft.duration(duration + (index*500))} style={styles.innerContainer}>
          <RouteHistoryComponent />
        </Animated.View>
      )}
    />
                       

</View>

</Layout>
      


  )
}

export default history

const styles = StyleSheet.create({

  container:{
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",

  },
  viewContainer:{
    
    flex:1,
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingTop:10
  },
  innerContainer:{
    marginBottom:8,
  justifyContent: 'center',
  alignItems: 'center',
    
  }

})