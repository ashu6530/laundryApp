import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import StackNavigator from "./StackNavigator";
export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <StackNavigator/>
    </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
