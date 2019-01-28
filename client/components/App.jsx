import React from 'react';
import Login from './Login.jsx';
import Map from './Map.jsx';
import Recommendations from './Recommendations.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default App;
