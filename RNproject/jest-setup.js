import { Animated } from 'react-native';

Animated.timing = () => ({
    start: () => jest.fn(),
});
