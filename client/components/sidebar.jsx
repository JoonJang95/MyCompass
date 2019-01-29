import React from 'react';

const Sidebar = ({ searchFunc, currUser }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebarHeader">MyCompass</h2>
      <div className="sidebarText">
        Hello, <span className="sidebarUsername">{currUser}</span>
      </div>
      <br />
      <div className="sidebarText">What are you looking for today?</div>
      <br />
      <div className="sidebarButtons">
        <button onClick={searchFunc} value="food">
          food
        </button>
        <button onClick={searchFunc} value="coffee">
          coffee
        </button>
        <button onClick={searchFunc} value="dessert">
          dessert
        </button>
        <button onClick={searchFunc} value="shopping">
          shopping
        </button>
        <button onClick={searchFunc} value="drinks">
          drinks
        </button>
        <button onClick={searchFunc} value="fun">
          fun
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
