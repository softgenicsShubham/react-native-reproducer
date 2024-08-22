import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import axios, { AxiosResponse } from 'axios';
import { FakeUser, GetUserResponse, GetVideoResponse, Video, getUsers } from '../../apis/videoApi';
import VideoItem from '../../components/VideoItem';

const { height } = Dimensions.get('screen');

const HomeScreen: React.FC = () => {
  const bottomHeight = useBottomTabBarHeight();
  const [videoData, setVideoData] = useState<FakeUser[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const flatlistRef = useRef<FlatList<FakeUser>>(null);
  const [videoHeight, setVideoHeight] = useState<number>(height - bottomHeight);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllVideo = useCallback(async () => {
    if (isLoading) return; 
    setIsLoading(true);
    try {
      const response: AxiosResponse<GetUserResponse> = await getUsers(pageSize);
      const result: GetUserResponse = response.data;
      setVideoData((prevData) => [...prevData, ...result.data]);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllVideo();
  }, [getAllVideo]);

  const renderItem = useCallback(({ item, index }: { item: FakeUser; index: number }) => (
    <VideoItem
      item={item}
      index={index}
      flatListRef={flatlistRef}
      videoHeight={videoHeight}
    />
  ), [videoHeight]);



  return (
    <View style={styles.container}>
      {videoData.length > 0 && (
        <FlatList
          ref={flatlistRef}
          data={videoData}
          pagingEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => (
            { length: videoHeight, offset: videoHeight * index, index }
          )}
        />
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // height: height
  },
});
