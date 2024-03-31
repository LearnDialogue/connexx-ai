import { ImageSourcePropType } from "react-native";


export interface ImageStyle {
    id: number;
    name: string;
    image: ImageSourcePropType;
}

const imageStyles: ImageStyle[] = [
    {
        id: 0,
        name: "No Style",
        image: { uri: "https://pixlr.com/img/preset/photographic.webp" },
    },
    {
        id: 1,
        name: "3D Model",
        image: { uri: "https://pixlr.com/img/preset/3d-model.webp" }
    },
    {
        id: 2,
        name: "Anime",
        image: { uri: "https://pixlr.com/img/preset/anime.webp" }
    },
    {
        id: 3,
        name: "Digital Art",
        image: { uri: "https://pixlr.com/img/preset/digital-art.webp" }
    },
    {
        id: 4,
        name: "Black and White",
        image: { uri: "https://pixlr.com/img/preset/black-and-white.webp" }
    },
    {
        id: 5,
        name: "Comic Book",
        image: { uri: "https://pixlr.com/img/preset/comic-book.webp" }
    },
    {
        id: 6,
        name: "Craft Clay",
        image: { uri: "https://pixlr.com/img/preset/craft-clay.webp" }
    },
    {
        id: 7,
        name: "Isometric",
        image: { uri: "https://pixlr.com/img/preset/isometric.webp" }
    },
    {
        id: 8,
        name: "Low Poly",
        image: { uri: "https://pixlr.com/img/preset/low-poly.webp" }
    },

];

export default imageStyles;

