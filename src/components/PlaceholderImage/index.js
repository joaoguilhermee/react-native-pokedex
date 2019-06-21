/* Core */
import React, { Component } from "react";

/* Presentational */
import { View, Image, Animated } from "react-native";

export default class PlaceholderImage extends Component {
  state = {
    opacity: new Animated.Value(0)
  };

  onLoad = event => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300
    }).start();
  };

  render() {
    return (
      <View
        style={{
          width: this.props.style.width || "100%",
          height: this.props.style.height || "100%"
        }}
      >
        {/* <Image
          {...this.props}
          source={require("../../../assets/images/bg-pokeball.png")}
        /> */}
        <Animated.Image
          {...this.props}
          style={[
            this.props.style,
            { position: "absolute", opacity: this.state.opacity }
          ]}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}
