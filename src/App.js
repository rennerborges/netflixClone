import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

function App() {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, [])

  return (
    <div className="page">

      <section className="lists">
        {movieList.map((item, key) => (
          <div key={key}>
            {item.title}
          </div>
        ))}
      </section>

    </div>
  );
}

export default App;
