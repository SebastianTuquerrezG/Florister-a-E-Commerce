import HomeSlider from '../../components/homeSlider';
import CatHomeSlider from '../../components/catHomeSlider';
import HomeServices from '../../components/homeServices';
import OccasionsSection from '../../components/occasionsSection';

const Home = () => {
    return (
        <>
            <HomeSlider></HomeSlider>
            <CatHomeSlider></CatHomeSlider>
            <HomeServices></HomeServices>
            <OccasionsSection></OccasionsSection>
        </>
    );
};

export default Home;