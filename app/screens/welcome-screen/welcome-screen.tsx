import React, { useState, useEffect } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, TextInput, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"
import { generate } from 'shortid';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  alignContent: 'center',
  padding: 9,
  marginTop: spacing[3],
  flex: 1,
  justifyContent: "center",
  backgroundColor: "#FFF",
}
const ADDBUTTON: ViewStyle = {
  flex: 2,
  paddingVertical: 13,
  marginTop: 1,
  marginBottom: 1,
  marginLeft: spacing[6],
  marginRight: spacing[6]
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
const PILL_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  letterSpacing: 0,
}
const PILL_BUTTON: ViewStyle = {
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  width: 75,
  height: 40,
  backgroundColor: palette.orange,
  borderRadius: 50,
}
const FOOTER: ViewStyle = {}
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const PILLS: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginRight: 1
}
const CENTER: TextStyle = {
  textAlign: 'center'
}

interface Search {
  id: string
  searchTerm: string
}

export const WelcomeScreen = observer(function WelcomeScreen() {

  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("mealResult")
  const [searches, setSearches] = useState<Search[]>([]);
  const [query, setQuery] = useState<string>("");
  let mySubmitArray = ''

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
        <View style={INPUT}>
          <TextInput
            style={CENTER}
            keyboardType={'default'}
            autoCorrect={true}
            placeholder={'e.g. lemon'}
            enablesReturnKeyAutomatically={true}
            onChangeText={(e) => {
              setQuery(e)
            }}
          />
        </View>
        <Button
          style={ADDBUTTON}
          textStyle={SEARCH_TEXT}
          text="ADD INGREDIENTS"
          onPress={() => {
            setSearches(currentSearches => [
              ...currentSearches,
              {
                id: generate(),
                searchTerm: query
              }
            ]);
          }
          }
        />
        <Button
          style={ADDBUTTON}
          textStyle={SEARCH_TEXT}
          text="CLEAR INGREDIENTS"
          onPress={() =>
            setSearches([{ id: '', searchTerm: '' }]
            )
          }
        />
        <Text style={ITEMS}>
          Ingredients:
        </Text>
        <ScrollView>
          <View style={PILLS}>
            {searches.map(s => {
              if (s.id != "" && s.searchTerm != "") {
                return (
                  <Button key={s.id} style={PILL_BUTTON}><Icon name={'close'} onPress={() => [
                    setSearches(currentSearches => [
                      ...currentSearches,
                      {
                        id: '',
                        searchTerm: ''
                      }
                    ])
                  ]} size={15} style={{alignItems: "flex-end", position: 'absolute', top: 1, right: 1, marginRight: 6}}></Icon><Text style={PILL_TEXT}>{s.searchTerm}</Text></Button>
                );
              } else {
                return null
              }
            })}
          </View>
        </ScrollView>
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
