import React, { useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, TextInput, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { palette } from "../../theme/palette"
import { generate } from 'shortid';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const ccLogo = require('./ccLogo50.png')


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
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
  maxWidth: "100%"
}
const DIRECTIONS: TextStyle = {
  ...TEXT,
  color: "black",
  fontSize: 16,
  lineHeight: 15,
  textAlign: "center",
  marginTop: spacing[1],
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
  flexWrap: 'wrap'
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

interface Health {
  id: string
  healthTerm: string
}





export const WelcomeScreen = observer(function WelcomeScreen() {

  const navigation = useNavigation()
  const [searches, setSearches] = useState<Search[]>([]);
  const [query, setQuery] = useState<string>("");
  const [health, setHealthTerm] = useState<Health[]>([]);

function removeElement(eraseId) {
  const items = searches.filter(item => item.id !== eraseId)
  console.tron.log('INSIDE DELETE FUNCTION ',items)
  setSearches(items)
};


  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Cupboard Cleanout!" />
        </Text>
        <Image source={ccLogo} style={BOWSER}/>
        <Text style={DIRECTIONS}>
          Add your ingredients here:
        </Text>
        <View style={INPUT}>
          <TextInput
            style={CENTER}
            returnKeyLabel={'next'}
            keyboardType={'default'}
            // ref={query}
            autoCorrect={true}
            placeholder={'e.g. lemon'}
            enablesReturnKeyAutomatically={true}
            // onSubmitEditing={() => {
            //   this.ref.query.clear
            // }}
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
            if (query.length != 0) {
            setSearches(currentSearches => [
              ...currentSearches,
              {
                id: generate(),
                searchTerm: query
              },
            ]);
          } else {
            Alert.alert("Oh no!", "You have to enter some foods in the search box before adding!")
          }
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
                <Text style={DIRECTIONS}>
          Add your dietary needs here:
        </Text>
        <DropDownPicker
            items={[
              { label: 'Vegan', value: 'YYveganYY', icon: () => <MaterialCommunityIcons name="egg-off" size={20} /> },
              { label: 'Vegetarian', value: 'YYvegetarianYY', icon: () => <MaterialCommunityIcons name="carrot" size={20}/> },
              { label: 'Paleo', value: 'YYPaleoYY', icon: () => <MaterialCommunityIcons name="food-steak" size={20}/> },
              { label: 'Dairy-Free', value: 'YYdairy-freeYY', icon: () => <MaterialCommunityIcons name="cow" size={20}/> },
              { label: 'Gluten-Free', value: 'YYgluten-freeYY', icon: () => <MaterialCommunityIcons name="barley-off" size={20}/> },
              { label: 'Wheat-Free', value: 'YYwheat-freeYY', icon: () => <MaterialCommunityIcons name="barley-off" size={20}/> },
              { label: 'Fat-Free', value: 'YYfat-freeYY', icon: () => <MaterialCommunityIcons name="food-off" size={20}/> },
              { label: 'Low-Sugar', value: 'YYlow-sugarYY', icon: () => <MaterialCommunityIcons name="spoon-sugar" size={20}/> },
              { label: 'Egg-Free', value: 'YYegg-freeYY', icon: () => <MaterialCommunityIcons name="egg-off" size={20}/> },
              { label: 'Peanut-Free', value: 'YYPeanut-FreeYY', icon: () => <MaterialCommunityIcons name="peanut-off-outline" size={20}/> },
              { label: 'Tree-Nut-Free', value: 'YYtree-nut-freeYY', icon: () => <MaterialCommunityIcons name="peanut-off" size={20}/> },
              { label: 'Soy-Free', value: 'YYsoy-freeYY', icon: () => <MaterialCommunityIcons name="soy-sauce-off" size={20}/> },
              { label: 'Fish-Free', value: 'YYfish-freeYY', icon: () => <MaterialCommunityIcons name="fish-off" size={20}/> },
              { label: 'Shell-Fish-Free', value: 'YYshell-fish-freeYY', icon: () => <MaterialCommunityIcons name="fruit-citrus-off" size={20}/> },
            ]}
            defaultValue={''}
            multiple={true}
            multipleText="%d items have been selected."
            min={0}
            max={14}

            containerStyle={{ height: 40, width: 220, alignSelf: 'center' }}
            itemStyle={{
              justifyContent: 'center'
            }}
            activeLabelStyle={{color: 'green'}}
            onChangeItem={(item) =>
              setHealthTerm([{ id: generate(), healthTerm: item }]
              )
            }
          />
        <Text style={ITEMS}>
          Ingredients:
        </Text>
        <ScrollView>
          <View style={PILLS}>
            {searches.map(s => {
              if (s.id != "" || s.searchTerm != "") {
                console.tron.log('log in searches map function ', s, s.searchTerm, searches)
                return (
                  <Button 
                    key={s.id} 
                    style={PILL_BUTTON}
                    onPress={() => {
                      removeElement(s.id)
                      console.tron.log('button pressed with id ' + s.id + ' And query of ' + s.searchTerm)
                    }}
                    >
                      <Icon 
                        name={'close'} 
                        size={15} 
                        style={{ alignItems: "flex-end", position: 'absolute', top: 1, right: 1, marginRight: 6 }}
                        />
                          <Text style={PILL_TEXT}>{s.searchTerm}</Text></Button>
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
            onPress={() => {
              let myResult = ''
              let mySearchArray = [];
              searches.forEach((e) => {
                const term = e.searchTerm.trim()
                mySearchArray.push(term + "+")
                myResult = mySearchArray.join('').toString().replace(/^\++|\++$/gm, '').trim()
              })
              if (myResult.length != 0) {
                const nextScreen = () => navigation.navigate('mealResult', { myResult })
                return nextScreen()
              } else {
                Alert.alert("Oh no!", "You have to enter some foods before searching!")
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})