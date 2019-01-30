import React from 'react';

const Favorites = ({ favSpots, removeSpot }) => {
  console.log('fav spot state', favSpots);
  return (
    <div className="favoritesWrapper">
      <h3>Your Favorites:</h3>
      {favSpots.length !== 0 ? (
        favSpots.map(({ name, address, city, state, zipcode, url }, i) => {
          return (
            <div className="favoritesInfo">
              <b>{`${i + 1}. ${name}`}</b>
              <br />
              {address}
              <br />
              {`${city} ${state} ${zipcode}`}
              <br />
              <a target="_blank" href={url}>
                {url}
              </a>
              <br />
              <span>
                <button onClick={() => removeSpot(i)}>delete spot</button>
              </span>
              <span>{'             '}</span>
              <span>
                <button>add notes</button>
              </span>
            </div>
          );
        })
      ) : (
        <p>No favorite spots selected</p>
      )}
    </div>
  );
};

export default Favorites;
