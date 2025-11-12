import { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { MediaItem } from "@/types/nutrition";
import { Ionicons } from "@expo/vector-icons";

interface MediaGalleryProps {
  gallery: MediaItem[];
  category?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GALLERY_HEIGHT = 300;

/**
 * Formats meal type for display
 */
const formatMealType = (type: string): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function MediaGallery({ gallery, category }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<{ [key: string]: Video | null }>({});

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);

    if (index !== activeIndex) {
      // Pause all videos when switching
      Object.values(videoRefs.current).forEach((video) => {
        video?.pauseAsync();
      });
      setIsPlaying(false);
      setActiveIndex(index);
    }
  };

  const toggleVideoPlayback = async (mediaId: string) => {
    const video = videoRefs.current[mediaId];
    if (!video) return;

    if (isPlaying) {
      await video.pauseAsync();
      setIsPlaying(false);
    } else {
      await video.playAsync();
      setIsPlaying(true);
    }
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus, mediaId: string) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
      // Reset to beginning
      videoRefs.current[mediaId]?.setPositionAsync(0);
    }
  };

  return (
    <View className="relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-gray-100 dark:bg-gray-800"
      >
        {gallery.map((item) => (
          <View
            key={item.id}
            style={{ width: SCREEN_WIDTH, height: GALLERY_HEIGHT }}
            className="relative"
          >
            {item.type === "image" ? (
              <Image
                source={{ uri: item.url }}
                style={{ width: SCREEN_WIDTH, height: GALLERY_HEIGHT }}
                resizeMode="cover"
              />
            ) : (
              <Pressable
                onPress={() => toggleVideoPlayback(item.id)}
                className="relative"
              >
                <Video
                  ref={(ref) => {
                    videoRefs.current[item.id] = ref;
                  }}
                  source={{ uri: item.url }}
                  style={{ width: SCREEN_WIDTH, height: GALLERY_HEIGHT }}
                  resizeMode={ResizeMode.COVER}
                  useNativeControls={false}
                  onPlaybackStatusUpdate={(status) =>
                    handlePlaybackStatusUpdate(status, item.id)
                  }
                />
                {/* Video play/pause overlay */}
                <View className="absolute inset-0 items-center justify-center bg-black/20">
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-black/50">
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={32}
                      color="white"
                    />
                  </View>
                </View>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Category Badge */}
      {category && (
        <View className="absolute left-4 top-4">
          <View className="rounded-full bg-blue-500 px-4 py-2 shadow-md dark:bg-blue-600">
            <Text className="text-sm font-semibold text-white">
              {formatMealType(category)}
            </Text>
          </View>
        </View>
      )}

      {/* Pagination Dots */}
      {gallery.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
          {gallery.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${
                index === activeIndex
                  ? "bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
