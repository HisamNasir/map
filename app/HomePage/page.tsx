import Head from 'next/head';
import MapComponent from '../ui/Map';
const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>World Map</title>
        <meta name="description" content="World Map using OpenStreetMap API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MapComponent />
      </main>

      <footer>
      </footer>
    </div>
  );
};

export default HomePage;
