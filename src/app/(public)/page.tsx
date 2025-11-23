import HomeHero from '@/components/home/HomeHero';
import HomeStartHere from '@/components/home/HomeStartHere';
import HomeLatestPosts from '@/components/home/HomeLatestPosts';
import HomePillars from '@/components/home/HomePillars';

export default function HomePage() {
    return (
        <>
            <HomeHero />
            <HomeStartHere />
            <HomeLatestPosts />
            <HomePillars />
        </>
    );
}
