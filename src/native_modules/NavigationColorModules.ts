import { NativeModules } from 'react-native';

const { NavigationColor } = NativeModules as {
    NavigationColor?: {
        setNavigationBarColor: (color: string) => void;
        setHidden: (hidden: boolean) => void;
    };
};

// Type guard to check if the module is loaded correctly
const isNavigationColorModule = (module: any): module is {
    setNavigationBarColor: (color: string) => void;
    setHidden: (hidden: boolean) => void;
} => {
    return (
        module &&
        typeof module.setNavigationBarColor === 'function' &&
        typeof module.setHidden === 'function'
    );
};

// Define and export the `setNavigationBarColor` function
const setNavigationBarColor = (color: string): void => {
    if (isNavigationColorModule(NavigationColor)) {
        NavigationColor.setNavigationBarColor(color);
    } else {
        console.error('NavigationColor module or setNavigationBarColor method is not available');
    }
};

// Define and export the `setHidden` function
const setHidden = (hidden: boolean): void => {
    if (isNavigationColorModule(NavigationColor)) {
        NavigationColor.setHidden(hidden);
    } else {
        console.error('NavigationColor module or setHidden method is not available');
    }
};

export { setNavigationBarColor, setHidden };
