import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ClippingRectangle, FlatList, Linking, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Wallpaper } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { ActivityIndicator, Avatar, DataTable } from 'react-native-paper'
import { Api } from "../../services/api"
import MyAppBar from "../../components/appbar/appbar"


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

  // Dummy api used to not exceed limit

  const dummyAPI = [
    {
      recipe: {
        uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_00999988c3d37cad1ae7dc2d98f6d345",
        label: "Chicken, Lemon, and Dill with Orzo recipes",
        image: "https://www.edamam.com/web-img/774/7748dcf7ea582e275f638da9d377913d",
        source: "Martha Stewart",
        url: "http://www.marthastewart.com/317393/chicken-lemon-and-dill-with-orzo",
        shareAs: "http://www.edamam.com/recipe/chicken-lemon-and-dill-with-orzo-recipes-00999988c3d37cad1ae7dc2d98f6d345/chicken+lemon/alcohol-free/591-722-cal",
        yield: 6,
        dietLabels: [],
        healthLabels: [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
        ],
        cautions: [
          "Gluten",
          "Wheat",
          "Sulfites",
          "FODMAP"
        ],
        ingredientLines: [
          "4 cups low-sodium chicken broth",
          "1 tablespoon unsalted butter",
          "1 1/4 teaspoons coarse salt",
          "1/4 teaspoon ground pepper",
          "1 pound chicken tenderloins, cut into 1-inch pieces",
          "1 pound orzo",
          "2 cups crumbled feta (4 ounces)",
          "1/4 cup coarsely chopped fresh dill",
          "2 teaspoons finely grated lemon zest, plus 1 tablespoon fresh lemon juice",
          "2 teaspoons finely grated lemon zest, plus 1 tablespoon fresh lemon juice",
          "1 cup grated Parmesan"
        ],
        ingredients: [
          {
            text: "4 cups low-sodium chicken broth",
            weight: 960,
            image: "https://www.edamam.com/food-img/2eb/2eb3c708f58f5fa1543022650ff0ae8d.png"
          },
          {
            text: "1 tablespoon unsalted butter",
            weight: 14.2,
            image: null
          }
        ],
        calories: 4020.73892333356,
        totalWeight: 2166.772415834365,
        totalTime: 50,
        totalNutrients: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 4020.73892333356,
            unit: "kcal"
          },
          FAT: {
            label: "Fat",
            quantity: 158.2069565210025,
            unit: "g"
          },
          FASAT: {
            label: "Saturated",
            quantity: 66.42695299028375,
            unit: "g"
          }
        },
        totalDaily: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 201.03694616667798,
            unit: "%"
          },
          FAT: {
            label: "Fat",
            quantity: 243.39531772461925,
            unit: "%"
          },
          VITD: {
            label: "Vitamin D",
            quantity: 15.448722400000001,
            unit: "%"
          },
          TOCPHA: {
            label: "Vitamin E",
            quantity: 11.737172130010316,
            unit: "%"
          },
          VITK1: {
            label: "Vitamin K",
            quantity: 61.56805639583333,
            unit: "%"
          }
        },
        digest: [
          {
            label: "Fat",
            tag: "FAT",
            schemaOrgTag: "fatContent",
            total: 158.2069565210025,
            hasRDI: true,
            daily: 243.39531772461925,
            unit: "g",
            sub: [
              {
                label: "Saturated",
                tag: "FASAT",
                schemaOrgTag: "saturatedFatContent",
                total: 66.42695299028375,
                hasRDI: true,
                daily: 332.1347649514188,
                unit: "g"
              },
              {
                label: "Trans",
                tag: "FATRN",
                schemaOrgTag: "transFatContent",
                total: 0.46547599999999995,
                hasRDI: false,
                daily: 0,
                unit: "g"
              }
            ]
          },
          {
            label: "Carbs",
            tag: "CHOCDF",
            schemaOrgTag: "carbohydrateContent",
            total: 429.75931314932126,
            hasRDI: true,
            daily: 143.2531043831071,
            unit: "g",
            sub: [
              {
                label: "Carbs (net)",
                tag: "CHOCDF.net",
                schemaOrgTag: null,
                total: 409.96369123931817,
                hasRDI: false,
                daily: 0,
                unit: "g"
              }
            ]
          },
          {
            label: "Protein",
            tag: "PROCNT",
            schemaOrgTag: "proteinContent",
            total: 214.78313363492032,
            hasRDI: true,
            daily: 429.56626726984064,
            unit: "g"
          },
          {
            label: "Water",
            tag: "WATER",
            schemaOrgTag: null,
            total: 1335.0313322474522,
            hasRDI: false,
            daily: 0,
            unit: "g"
          }
        ]
      },
      recipe2: {
        uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_00999988c3d37cad1ae7dc2d98f6d345",
        label: "Chicken, Lemon, and Dill with Orzo recipes",
        image: "https://www.edamam.com/web-img/774/7748dcf7ea582e275f638da9d377913d",
        source: "Martha Stewart",
        url: "http://www.marthastewart.com/317393/chicken-lemon-and-dill-with-orzo",
        shareAs: "http://www.edamam.com/recipe/chicken-lemon-and-dill-with-orzo-recipes-00999988c3d37cad1ae7dc2d98f6d345/chicken+lemon/alcohol-free/591-722-cal",
        yield: 6,
        dietLabels: [],
        healthLabels: [
          "Sugar-Conscious",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
        ],
        cautions: [
          "Gluten",
          "Wheat",
          "Sulfites",
          "FODMAP"
        ],
        ingredientLines: [
          "4 cups low-sodium chicken broth",
          "1 tablespoon unsalted butter",
          "1 1/4 teaspoons coarse salt",
          "1/4 teaspoon ground pepper",
          "1 pound chicken tenderloins, cut into 1-inch pieces",
          "1 pound orzo",
          "2 cups crumbled feta (4 ounces)",
          "1/4 cup coarsely chopped fresh dill",
          "2 teaspoons finely grated lemon zest, plus 1 tablespoon fresh lemon juice",
          "2 teaspoons finely grated lemon zest, plus 1 tablespoon fresh lemon juice",
          "1 cup grated Parmesan"
        ],
        ingredients: [
          {
            text: "4 cups low-sodium chicken broth",
            weight: 960,
            image: "https://www.edamam.com/food-img/2eb/2eb3c708f58f5fa1543022650ff0ae8d.png"
          },
          {
            text: "1 tablespoon unsalted butter",
            weight: 14.2,
            image: null
          }
        ],
        calories: 4020.73892333356,
        totalWeight: 2166.772415834365,
        totalTime: 50,
        totalNutrients: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 4020.73892333356,
            unit: "kcal"
          },
          FAT: {
            label: "Fat",
            quantity: 158.2069565210025,
            unit: "g"
          },
          FASAT: {
            label: "Saturated",
            quantity: 66.42695299028375,
            unit: "g"
          }
        },
        totalDaily: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 201.03694616667798,
            unit: "%"
          },
          FAT: {
            label: "Fat",
            quantity: 243.39531772461925,
            unit: "%"
          },
          VITD: {
            label: "Vitamin D",
            quantity: 15.448722400000001,
            unit: "%"
          },
          TOCPHA: {
            label: "Vitamin E",
            quantity: 11.737172130010316,
            unit: "%"
          },
          VITK1: {
            label: "Vitamin K",
            quantity: 61.56805639583333,
            unit: "%"
          }
        },
        digest: [
          {
            label: "Fat",
            tag: "FAT",
            schemaOrgTag: "fatContent",
            total: 158.2069565210025,
            hasRDI: true,
            daily: 243.39531772461925,
            unit: "g",
            sub: [
              {
                label: "Saturated",
                tag: "FASAT",
                schemaOrgTag: "saturatedFatContent",
                total: 66.42695299028375,
                hasRDI: true,
                daily: 332.1347649514188,
                unit: "g"
              },
              {
                label: "Trans",
                tag: "FATRN",
                schemaOrgTag: "transFatContent",
                total: 0.46547599999999995,
                hasRDI: false,
                daily: 0,
                unit: "g"
              }
            ]
          },
          {
            label: "Carbs",
            tag: "CHOCDF",
            schemaOrgTag: "carbohydrateContent",
            total: 429.75931314932126,
            hasRDI: true,
            daily: 143.2531043831071,
            unit: "g",
            sub: [
              {
                label: "Carbs (net)",
                tag: "CHOCDF.net",
                schemaOrgTag: null,
                total: 409.96369123931817,
                hasRDI: false,
                daily: 0,
                unit: "g"
              }
            ]
          },
          {
            label: "Protein",
            tag: "PROCNT",
            schemaOrgTag: "proteinContent",
            total: 214.78313363492032,
            hasRDI: true,
            daily: 429.56626726984064,
            unit: "g"
          },
          {
            label: "Water",
            tag: "WATER",
            schemaOrgTag: null,
            total: 1335.0313322474522,
            hasRDI: false,
            daily: 0,
            unit: "g"
          }
        ]
      }
    }];

  // End of dummy API

      console.tron.log(typeof dummyAPI, dummyAPI, dummyAPI.length)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const mealResultsAPI = new Api()
  mealResultsAPI.setup()
  // const myResults = mealResultsAPI.getUsers()
  const navigation = useNavigation()
  const welcomeScreen = () => navigation.navigate("welcome")

  


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    fetch(mealResultsAPI.config.url)
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => alert(error))  // Displays errors
      .finally(() => setLoading(false)) // change loading state
  }, [])

  console.tron.log("Logging the data ", data, isLoading);

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text preset="header" style={TITLE} text="Meal Result Screen" />

        <DataTable.Header style={CONTINUE}>

          <DataTable.Title>Picture</DataTable.Title>
          <DataTable.Title>Recipe</DataTable.Title>
          <DataTable.Title>Calories</DataTable.Title>
          <DataTable.Title># of Ingr.</DataTable.Title>

        </DataTable.Header>
        <DataTable>
          {isLoading ? (<ActivityIndicator />) :
            (
              dummyAPI.map(datas => {
                return (
                  
                  <DataTable.Row
                    style={CONTINUE}
                    key={datas.recipe.shareAs} // you need a unique key per item
                    onPress={() => {
                      Linking.canOpenURL(datas.recipe.url).then(supported => {
                        if (supported) {
                          Linking.openURL(datas.recipe.url);
                        } else {
                          alert("Sorry! I don't know how to open URI: " + datas.recipe.url);
                        }
                      });
                    }}
                  >
                    <DataTable.Cell>
                      <Avatar.Image source={{
                        uri: `${datas.recipe.image}`
                      }} />
                    </DataTable.Cell>
                    <DataTable.Cell style={CONTINUE}>
                      {datas.recipe.label}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {Math.trunc(datas.recipe.calories)}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {datas.recipe.ingredientLines.length}
                    </DataTable.Cell>
                  </DataTable.Row>

                )
              }))
          }
        </DataTable>
        <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.goBack"
            onPress={welcomeScreen}
          />
        </View>
          
      </Screen>
      <MyAppBar />
    </View>
  )
})
