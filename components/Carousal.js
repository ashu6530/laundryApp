import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { resizeMode } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const Carousal = () => {
  const images = [
    'https://c8.alamy.com/comp/2RNHCDB/laundry-logo-black-washing-machine-with-bubble-symbol-2RNHCDB.jpg',
    'https://as1.ftcdn.net/v2/jpg/01/96/15/38/1000_F_196153822_0xZjVgOpZyBPMTI2LSN1BVbNDJZx1Ehs.jpg'
    
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        sliderBoxHeight={300}
        imageLoadingColor="black"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
          
        }}
      />
    </View>
  );
};

export default Carousal;

const styles = StyleSheet.create({});
