import LottieView from "lottie-react-native";

export const BaseAnimation = ({source, width, height}) => {
    return (
        <LottieView
        autoPlay
        style={{
          width: width,
          height: height,
        }}
        source={source}
        />
    );
}