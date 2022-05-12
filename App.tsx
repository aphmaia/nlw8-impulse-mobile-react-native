import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from './src/theme';
import Widget from './src/components/Widget';

import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium 
} from '@expo-google-fonts/inter';

export default function App() {

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{
        flex: 1,
        backgroundColor: theme.colors.background
      }}>

        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent 
        />

        <Widget />
   
      </View> 
    </KeyboardAvoidingView>
  );
}
