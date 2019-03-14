import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { SECONDARY } from "../config/colors";
import { FONT_XXS, FONT_L } from '../config/fontSize';
import { FONT_WEIGHT_XXBOLD } from '../config/fontWeight';

const styles = StyleSheet.create({
    tokenStyle: {
        flexDirection: "column",
        borderWidth: 2,
        marginLeft: 8,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60
      },
      tokenTitleStyle: {
        padding: 8,
        paddingBottom: 4,
        fontSize: FONT_XXS
      },
      tokenValueStyle: {
        fontSize: FONT_L,
        fontWeight: FONT_WEIGHT_XXBOLD,
        padding: 8,
        paddingTop: 0
      },
      currentColorStyle: {
        color: SECONDARY,
        borderColor: SECONDARY
      },
      previousColorStyle: {
        color: "grey",
        borderColor: "grey"
      }
});
class Token extends React.Component{

    render(){
        const colorStyle = this.props.isCurrent ? styles.currentColorStyle : styles.previousColorStyle;
        return (
            <View style={[styles.tokenStyle, colorStyle]}>
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.tokenTitleStyle, colorStyle]}
            >
                Token
            </Text>
            <Text style={[styles.tokenValueStyle, colorStyle]}>{this.props.number}</Text>
            </View>
        );
    }
}
export default Token;