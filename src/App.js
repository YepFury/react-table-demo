import React, {Component} from 'react';
import Tables from './components/Table'
import './App.css'
import './less/app.less';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Tables></Tables>
            </div>
        );
    }
}

export default App;
