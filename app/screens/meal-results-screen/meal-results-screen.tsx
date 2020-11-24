import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ClippingRectangle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Wallpaper } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { DataTable } from 'react-native-paper'
import { Api } from "../../services/api"

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
    console.log(myResults)
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
