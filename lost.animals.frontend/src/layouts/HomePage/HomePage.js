import { Carousel } from "./components/Carousel";
import { ExploreAnimals } from "./components/ExploreAnimals";
import { Heros } from "./components/Heros";

export const HomePage = () => {
    return (
        <div>
            <ExploreAnimals/>
            <Carousel/>
            <Heros/>
        </div>
    );
};