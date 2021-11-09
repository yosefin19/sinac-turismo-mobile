import React, { useState } from "react";
import ParsedText from "react-native-parsed-text";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";

// Componentes
import ConstantMenu from "../components/ConstantMenu";

// Imagenes
import Exit from "../images/exit.png";
import NoImage from "../images/no_image.png";
const Banner = require("../images/banner.gif");

// Configuración
import {
  ABOUT_US_FIRST_PERCENTAGE,
  ABOUT_US_SECOND_PERCENTAGE,
  ABOUT_US_THIRD_PERCENTAGE,
} from "../config";

// Estilos globales
const appStyles = require("../appStyle");

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const About = ({ navigation }) => {
  const [state, setState] = useState(0);

  const historyText =
    "El SINAC posee personalidad jurídica instrumental, y ejerce sus funciones como un sistema \
de gestión y coordinación institucional, desconcentrado y participativo, que integra las \
competencias en materia forestal, vida silvestre, áreas protegidas y la protección y conservación \
del uso de cuencas hidrográficas y sistemas hídricos con el fin de dictar políticas, planificar y \
ejecutar procesos dirigidos a lograr la sostenibilidad en el manejo de los recursos naturales del \
país.\n\n\
El SINAC es un concepto de conservación integral, que ofrece la posibilidad de desarrollar una \
gestión pública responsable, con la participación del Estado, la Sociedad Civil, la empresa privada, \
y de cada individuo del país interesado y comprometido con la construcción de un ambiente sano y \
ecológicamente equilibrado.\n\n\
Territorialmente, el SINAC esta dividido en once áreas de conservación, en donde se interrelacionan \
actividades tanto públicas como estatales y se buscan soluciones conjuntas, orientadas por \
estrategias de conservación y desarrollo sostenible de los recursos naturales.";
  const missionText =
    "El Sistema Nacional de Áreas de Conservación (SINAC) de Costa Rica gestiona integralmente la \
conservación y manejo sostenible de la vida silvestre, los recursos forestales, las áreas silvestres \
protegidas, cuencas hidrográficas y sistemas hídricos, en coordinación con otras instituciones y \
actores de la sociedad, para el bienestar de las actuales y futuras generaciones.";
  const visionText =
    "Un Sistema Nacional de Áreas de Conservación (SINAC) que lidera la conservación y uso sostenible \
de la biodiversidad y los recursos naturales, con gestión participativa y equitativa para mejorar y \
mantener los servicios ecosistémicos, que contribuya al desarrollo sostenible de Costa Rica.";
  const valuesText = [
    "Solidaridad: Es el compromiso manifiesto de los funcionarios con las necesidades de los grupos de \
interés, los usuarios y sociedad en general.",
    "Proactividad: Es la actitud en la que la persona asume el pleno control de su conducta vital de modo \
activo, lo que implica la toma de iniciativa en el desarrollo de acciones creativas y audaces para \
generar mejoras, haciendo prevalecer la libertad de elección sobre las circunstancias de la vida.",
    "Compromiso: Es la actitud que identifica la lealtad y la dedicación personal, organizacional y \
ambiental de los colaboradores y cuerpos directivos; es sentir y vivir como propios los objetivos y \
metas organizacionales, responsabilizándose por el logro de los mismos.",
    "Actitud de servicio: Es la conducta para ayudar a otras personas espontáneamente, manteniendo una \
actitud permanente de colaboración hacia los demás.",
  ];

  const changeToHistory = () => {
    if (state !== 0) setState(0);
  };
  const changeToMission = () => {
    if (state !== 1) setState(1);
  };
  const changeToVision = () => {
    if (state !== 2) setState(2);
  };
  const changeToValues = () => {
    if (state !== 3) setState(3);
  };
  return (
    <SafeAreaView
      style={[styles.safeContainer, appStyles.default.appBackgroundColor]}
    >
      <View
        style={[
          {
            flex: ABOUT_US_FIRST_PERCENTAGE,
          },
        ]}
      >
        <Image
          source={Banner}
          style={{
            width: Dimensions.get("window").width,
            height: "100%",
            backgroundColor: "#000",
          }}
        />
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[appStyles.default.exitView, { elevation: 31 }]}
      >
        <Image style={appStyles.default.exitImage} source={Exit} />
      </Pressable>

      <View style={styles.container}>
        <Text
          style={[
            appStyles.default.name,
            appStyles.default.defaultFont,
            { marginVertical: 25 },
          ]}
        >
          Conózcanos
        </Text>
        <View style={styles.optionsContainer}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToHistory}
            >
              historia
            </Text>
            {state === 0 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? appStyles.default.androidShadowBox
                    : appStyles.default.iosShadowBox,
                ]}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToMission}
            >
              misión
            </Text>
            {state === 1 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? appStyles.default.androidShadowBox
                    : appStyles.default.iosShadowBox,
                ]}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToVision}
            >
              visión
            </Text>
            {state === 2 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? appStyles.default.androidShadowBox
                    : appStyles.default.iosShadowBox,
                ]}
              />
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.optionsText, appStyles.default.defaultFont]}
              onPress={changeToValues}
            >
              valores
            </Text>
            {state === 3 && (
              <View
                style={[
                  styles.selectedLine,
                  Platform.OS === "android"
                    ? appStyles.default.androidShadowBox
                    : appStyles.default.iosShadowBox,
                ]}
              />
            )}
          </View>
        </View>
        <View
          style={[
            styles.horizontalLine,
            Platform.OS === "android"
              ? appStyles.default.androidShadowBox
              : appStyles.default.iosShadowBox,
            { zIndex: 999 },
            { elevation: -10 },
          ]}
        />
        {state === 0 ? (
          <ScrollView style={styles.textContainer}>
            <ParsedText
              style={[styles.aboutText, appStyles.default.defaultFont]}
              parse={[
                {
                  pattern: /SINAC/,
                  style: { fontWeight: "bold" },
                },
                {
                  pattern:
                    /materia forestal|vida silvestre|áreas protegidas|cuencas hidrográficas|sistemas hídricos|gestión pública responsable|ambiente sano|ecológicamente equilibrado|once áreas de conservación|estrategias de conservación|desarrollo sostenible/,
                  style: { fontWeight: "bold" },
                },
              ]}
              childrenProps={{ allowFontScaling: false }}
            >
              {historyText}
            </ParsedText>
          </ScrollView>
        ) : null}
        {state === 1 ? (
          <ScrollView style={styles.textContainer}>
            <ParsedText
              style={[styles.aboutText, appStyles.default.defaultFont]}
              parse={[
                {
                  pattern: /SINAC/,
                  style: { fontWeight: "bold" },
                },
                {
                  pattern:
                    /vida silvestre|recursos forestales|áreas silvestres protegidas|cuencas hidrográficas|sistemas hídricos|bienestar/,
                  style: { fontWeight: "bold" },
                },
              ]}
              childrenProps={{ allowFontScaling: false }}
            >
              {missionText}
            </ParsedText>
          </ScrollView>
        ) : null}
        {state === 2 ? (
          <ScrollView style={styles.textContainer}>
            <ParsedText
              style={[styles.aboutText, appStyles.default.defaultFont]}
              parse={[
                {
                  pattern: /SINAC/,
                  style: { fontWeight: "bold" },
                },
                {
                  pattern:
                    /lidera la conservación y uso sostenible|mejorar y mantener|contribuya al desarrollo sostenible/,
                  style: { fontWeight: "bold" },
                },
              ]}
              childrenProps={{ allowFontScaling: false }}
            >
              {visionText}
            </ParsedText>
          </ScrollView>
        ) : null}
        {state === 3 ? (
          <ScrollView style={styles.textContainer}>
            <ParsedText
              style={[styles.aboutText, appStyles.default.defaultFont]}
              parse={[
                {
                  pattern: /SINAC/,
                  style: { fontWeight: "bold" },
                },
                {
                  pattern:
                    /Solidaridad\:|Proactividad\:|Compromiso|Actitud de servicio/,
                  style: { fontWeight: "bold" },
                },
                {
                  pattern:
                    /compromiso|necesidades|toma de iniciativa|lealtad|dedicación personal|sentir y vivir como propios|colaboración/,
                  style: { fontWeight: "bold" },
                },
              ]}
              childrenProps={{ allowFontScaling: false }}
            >
              {valuesText.join("\n\n")}
            </ParsedText>
          </ScrollView>
        ) : null}
        <View
          style={{
            alignItems: "center",
            flex: ABOUT_US_THIRD_PERCENTAGE,
            top: 0,
          }}
        >
          <ConstantMenu navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: ABOUT_US_SECOND_PERCENTAGE,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginHorizontal: 10,
  },
  textContainer: {
    flex: 0.9,
    margin: 10,
    paddingRight: 10,
  },
  selectedLine: {
    borderWidth: 1,
    borderColor: "#DD9B5E",
    margin: 10,
    width: "100%",
    position: "absolute",
    top: 10,
  },
  optionsText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 17,

    color: "#7f7f7f",
  },
  aboutText: {
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 17,
    fontSize: 13,

    color: "#676767",
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",

    marginTop: 3.5,
  },
});

export default About;
