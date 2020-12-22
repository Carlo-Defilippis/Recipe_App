import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ClippingRectangle, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Wallpaper } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { ActivityIndicator, Avatar, DataTable } from 'react-native-paper'
import { Api } from "../../services/api"
import DEFAULT_API_CONFIG from "../../services/api/api-config"
import { Image } from "react-native-paper/lib/typescript/src/components/Avatar/Avatar"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#007FFF",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const FOOTER: ViewStyle = { backgroundColor: "#007FFF" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}



export const MealResultsScreen = observer(function MealResultsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
    const mealResultsAPI = new Api()
    mealResultsAPI.setup()
    const myResults = mealResultsAPI.getUsers()
    const navigation = useNavigation()
    const welcomeScreen = () => navigation.navigate("welcome")


    console.tron.log("My Log ",mealResultsAPI.config.url)

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() =>{
      fetch(mealResultsAPI.config.url)
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => alert(error))  // Displays errors
      .finally(() => setLoading(false)) // change loading state
    }, [])

    console.tron.log("Logging the data ",data, isLoading);

  return (
    <View style={FULL}>
    <Wallpaper />
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Text preset="header" style={TITLE} text="Meal Result Screen" />
      <DataTable.Header style={CONTINUE}>
        <DataTable.Title>Picture</DataTable.Title>
        <DataTable.Title>Description</DataTable.Title>
        <DataTable.Title>Link</DataTable.Title>
      </DataTable.Header>
      
        {isLoading ? ( <ActivityIndicator /> ) : 
        (
        data.map(datas => {
          return (
            <DataTable.Row
              style={CONTINUE}
              key={datas.location.coordinates.latitude} // you need a unique key per item
              onPress={() => {
                // added to illustrate how you can make the row take the onPress event and do something
                console.log(`selected id latitude is ${datas.location.coordinates.latitude}`)
              }}
            >
              <DataTable.Cell>
                <Avatar.Image source={{
                  uri:`${datas.picture.large}`
                  }} />
              </DataTable.Cell>
              <DataTable.Cell>
                {datas.gender}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {datas.location.postcode}
              </DataTable.Cell>
            </DataTable.Row>
        )}))
        }
        
      
      <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.goBack"
            onPress={welcomeScreen}
          />
        </View>
    </Screen>
    </View>
  )
})
