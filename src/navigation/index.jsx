import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import { Home, Lectures, Stats, Profile, NotFound } from './screens';
import { Home as HomeIcon, Lectures as LecturesIcon, Stats as StatsIcon } from '../assets';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={HomeIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Lectures: {
        screen: Lectures,
        options: {
            tabBarIcon: ({ color, size }) => (
                <Image
                source={LecturesIcon}
                tintColor={color}
                style={{
                    width: size,
                    height: size,
                }}
                />
            ),
        },
    },
    Stats: {
        screen: Stats,
        options: {
            tabBarIcon: ({ color, size }) => (
                <Image
                source={StatsIcon}
                tintColor={color}
                style={{
                    width: size,
                    height: size,
                }}
                />
            ),
        },
    },
    // Profile: {
    //   screen: Profile,
    //   options: {
    //     tabBarIcon: ({ color, size }) => (
    //       <Image
    //         source={bell}
    //         tintColor={color}
    //         style={{
    //           width: size,
    //           height: size,
    //         }}
    //       />
    //     ),
    //   },
    // },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
