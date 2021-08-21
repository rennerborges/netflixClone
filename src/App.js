import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      const originals = list.find(i => i.slug === 'originals');
      const randomChosen = Math.floor(Math.random() * originals.items.results.length - 1);
      const chosen = originals.items.results[randomChosen];
      console.log('chosen', chosen)
      const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);


    }

    loadAll();
  }, [])

  return (
    <div className="page">

      <Header />

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

    </div>
  );
}

export default App;
