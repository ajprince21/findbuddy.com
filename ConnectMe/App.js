import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { store, persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect } from "react";

export default function App() {
  const client = useDevToolsPluginClient("my-devtools-plugin");
  useEffect(() => {
    // receive messages
    client?.addMessageListener("ping", (data) => {
      alert(`Received ping from ${data.from}`);
    });
    // send messages
    client?.sendMessage("ping", { from: "app" });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
