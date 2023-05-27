import { IGalleryItem } from "@/ui/Gallery/gallery.interface";
import { ISlide } from "@/ui/Slider/slider.interface";

export interface IHome {
    slides: ISlide[]
    trendingMovies: IGalleryItem[]
    actors: IGalleryItem[]
}