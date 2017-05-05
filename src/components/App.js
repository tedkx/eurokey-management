import React        from 'react';

import Routing      from './Routing';
import Header       from '../containers/HeaderContainer';
import Sidebar      from '../containers/SidebarContainer';
import Main         from './layout/Main';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let layoutContainerClass = 'layout-container' + (true ? '' : ' sidebar-offcanvas');

        return (
            <div id="app">
                <div className="loader app-loader loader-hidden"></div>
                <div className={ layoutContainerClass }>
                    <Header />
                    <Sidebar />
                    <Main>
                        <Routing />
                    </Main>
                </div>
            </div>
        );
    }
}

export default App;