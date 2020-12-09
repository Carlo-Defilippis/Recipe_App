import React, { useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, TextInput, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"
const ccLogo = require('./ccLogo50.png')

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
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[1],
  maxWidth: "100%",
}
const DIRECTIONS: TextStyle = {
  ...TEXT,
  color: "#FFFFFF",
  fontSize: 16,
  lineHeight: 22,
  textAlign: "center",
  marginTop: spacing[5],
}
const INPUT: ViewStyle = {
  borderWidth: 1,
  alignItems: "center",
  padding: 9,
  marginTop: spacing[3],
  flex: 1,
  justifyContent: "center",
  backgroundColor: "#FFF"
}
const ADDBUTTON: ViewStyle = {
  flex: 1,
  paddingVertical: 9,
}
const ITEMS: TextStyle = {
  ...TEXT,
  fontSize: 15,
  lineHeight: 22,
  textAlign: "center",
  marginBottom: spacing[3],
  marginTop: spacing[3],
}
const SEARCH: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: palette.lightBlue,
}
const SEARCH_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 1,
}
const FOOTER: ViewStyle = { }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("mealResult")
  // const [ingredient, setIngredient] = useState([
  //   {name: 'lemon', key: '1'},
  //   {name: 'chicken', key: '2'},
  //   {name: 'asparagus', key: '3'},
  //   {name: 'spinach', key: '4'},
  // ]);

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Cupboard Cleanout!" />
        </Text>
        <Image source={ccLogo} style={BOWSER} />
        <Text style={TITLE} text="Let's get cooking!" />
        <Text style={DIRECTIONS}>
          Add your ingredients here:
        </Text>
        <TextInput 
          style={INPUT}
          keyboardType={'default'}
          autoCorrect={true} 
          placeholder={'e.g. lemon'}
          />
        <Button
          style={ADDBUTTON}
          textStyle={SEARCH_TEXT}
          text="ADD"
        />
        <Text style={ITEMS}>
          Ingredients: 
        </Text>
        {/* <ScrollView>
          { ingredient.map(item => (
              <View key={item.key}>
                <Text>(item.name)</Text>
              </View>
            )
          )}
          </ScrollView> */}
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
      <Button
            style={SEARCH}
            textStyle={SEARCH_TEXT}
            text="SEARCH RECIPES"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
