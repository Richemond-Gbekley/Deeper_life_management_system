import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

type CarouselProps = {
  data: React.ReactNode[];
};

export function Carousel({ data }: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* Carousel Content */}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => <View style={styles.item}>{item}</View>}
      />

      {/* Previous Button */}
      <TouchableOpacity
        style={[styles.navButton, { left: 10 }]}
        disabled={currentIndex === 0}
        onPress={() => scrollToIndex(currentIndex - 1)}
      >
        <ArrowLeft color={currentIndex === 0 ? "#94a3b8" : "#1e293b"} />
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.navButton, { right: 10 }]}
        disabled={currentIndex === data.length - 1}
        onPress={() => scrollToIndex(currentIndex + 1)}
      >
        <ArrowRight
          color={currentIndex === data.length - 1 ? "#94a3b8" : "#1e293b"}
        />
      </TouchableOpacity>

      {/* Dots Indicator */}
      <View style={styles.dots}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
  },
  item: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  navButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#1e3a8a",
    width: 10,
    height: 10,
  },
});
