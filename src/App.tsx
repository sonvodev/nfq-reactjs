import * as React from 'react';
import NasaContainer from './containers/nasa/NasaContainer'
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NasaContainer></NasaContainer>
      </div>
    );
  }
}

export default App;
