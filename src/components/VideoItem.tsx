import { Dimensions, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { FakeUser, Video } from '../apis/videoApi'

const { height, width } = Dimensions.get('screen')



interface VideoItemProps {
    item: FakeUser,
    index: number,
    flatListRef: React.RefObject<FlatList<FakeUser>>,
    videoHeight: number
}

const isEven = (index: number): boolean => {
    return index % 2 === 0;
}


const VideoItem: React.FC<VideoItemProps> = ({
    item,
    index,
    flatListRef,
    videoHeight
}) => {
    return (
        <View style={[styles.main_container, {
            backgroundColor: isEven(index) ? 'green' : 'red',
            height: videoHeight
        }]}>
            <Text>VideoItem: {index}</Text>
        </View>
    )
}

export default VideoItem

const styles = StyleSheet.create({
    main_container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
})