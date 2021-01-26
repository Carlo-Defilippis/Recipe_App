import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Linking, Alert, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Wallpaper } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { ActivityIndicator, Avatar, DataTable } from 'react-native-paper'
import { Api } from "../../services/api"
import MyAppBar from "../../components/appbar/appbar"
import { Col, Row, Grid } from "react-native-easy-grid";


const FULL: ViewStyle = {
  flexGrow: 1,
  height: '100%'
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[10]
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#007FFF"
}
const CONTINUE_BORDER: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#007FFF",
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 18,
  marginBottom: 5
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
  paddingVertical: spacing[0],
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
  const navigation = useNavigation()
  const welcomeScreen = () => navigation.navigate("welcome")
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  let firstURLnoParams = mealResultsAPI.config.url
  const userSearchTerms = MealResultsScreen.arguments[0].route.params.myResult

  const finalURL = () => {
    let firstOptionWords = firstURLnoParams.replace('XXXXXXoXXXXXX', userSearchTerms)
    return firstOptionWords
  }


  useEffect(() => {
    fetch(finalURL())
      .then((response) => response.json())
      .then((json) => setData(json.hits))
      .catch((error) => Alert.alert(error))  // Displays errors
      .finally(() => setLoading(false)) // change loading state
  }, [])

  console.tron.log("Logging the data ", finalURL(), data);

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" style={TITLE} text="Meal Suggestions" />
        <Grid>
          {isLoading ? (<ActivityIndicator />) :
            (
              data.map(datas => {
                if (data.length != null) {
                  console.tron.log(data)
                  return (
                    <Row
                      style={CONTINUE_BORDER}
                      key={datas.recipe.shareAs} // you need a unique key per item
                      onPress={() => {
                        Linking.canOpenURL(datas.recipe.url).then(supported => {
                          if (supported) {
                            Linking.openURL(datas.recipe.url);
                          } else {
                            Alert.alert("Sorry! I don't know how to open URI: " + datas.recipe.url);
                          }
                        });
                      }}
                    >
                      <Col>
                        <Text>
                          <Avatar.Image source={{
                            uri: `${datas.recipe.image}`
                          }} />
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          {datas.recipe.label}
                        </Text>
                      </Col>
                      <Row>
                        <Col>
                          <Text>Cal#</Text>
                          <Text>
                            {Math.trunc(datas.recipe.calories)}
                          </Text>
                        </Col>
                        <Col>
                          <Text>Ingr#</Text>
                          <Text>
                            {datas.recipe.ingredientLines.length}
                          </Text>
                        </Col>
                      </Row>
                    </Row>
                  )
                } else {
                  console.tron.log(data)
                  return Alert.alert("Shoot, no recipes found!", "Try removing some items from the list and trying again")
                }
              }))
          }
        </Grid>
        <Button
          style={CONTINUE}
          textStyle={CONTINUE_TEXT}
          tx="welcomeScreen.goBack"
          onPress={welcomeScreen}
        />
        <Grid>
          <Col style={{ height: 100 }}>
            <Row>
            </Row>
          </Col>
        </Grid>
      </Screen>
      <MyAppBar />
    </View>
  )
})
