import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [preloader, setPreloader] = useState(true);

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
      setPreloader(false);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      setBlackHeader(window.scrollY > 30);
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  if (preloader) {
    return (
      <section className="loading">
        <img src="https://i.pinimg.com/originals/9a/02/aa/9a02aac51ed499e01518ac73dd954eb1.gif" alt="Carregando" />
      </section>
    );
  }

  return (
    <div className="page">

      <Header black={blackHeader} />

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

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Renner Borges <br />
        Direitos de imagem para Netflix <br />
        Dados pegos pelo site Themoviedb.org
      </footer>

    </div>
  );
}

export default App;
