import * as React from 'react';
import Splash from './screens/splash';
import Home from './screens/home';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { runApp } from './redux/slices/appSlice';
import { NavigationContainer } from '@react-navigation/native';
import Header from './navigator/Header';
import CameraScreen from './screens/camera';

const Stack = createNativeStackNavigator();

function App() {

    React.useEffect(() => {
        dispatch(runApp());
    }, [])

    const dispatch = useDispatch();
    const appProps = useSelector(state => state.appProps);

    if (appProps.loading) {
        return <Splash />;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        header: (props) => <Header {...props} />,
                    }}
                />
                <Stack.Screen
                    name="CameraScreen"
                    component={CameraScreen}
                    options={{
                        header: (props) => <Header {...props} />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function AppRoot() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default AppRoot;