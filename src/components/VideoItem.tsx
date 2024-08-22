import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import {
    FakeUser,

} from '../apis/videoApi';

const { width } = Dimensions.get('screen');



interface VideoItemProps {
    item: FakeUser,
    index: number,
    flatListRef: React.RefObject<FlatList<FakeUser>>,
    videoHeight: number
}

const isEven = (index: number): boolean => {
    return index % 2 === 0;
};


const VideoItem: React.FC<VideoItemProps> = ({
    index,
    videoHeight,
}) => {
    return (
        <View style={[styles.main_container, {
            backgroundColor: isEven(index) ? 'green' : 'red',
            height: videoHeight,
        }]}>
            <Text>VideoItem: {index}</Text>
        </View>
    );
};

export default VideoItem;

const styles = StyleSheet.create({
    main_container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
