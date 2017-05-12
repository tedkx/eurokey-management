import React        from 'react';

import Header       from '../containers/HeaderContainer';
import Sidebar      from '../containers/SidebarContainer';
import Main         from './layout/Main';

class App extends React.Component {
    render() {
        let layoutContainerClass = 'layout-container' + (this.props.user == null ? ' sidebar-offcanvas unauthenticated' : ' ');

        return (
            <div id="app">
                <div className="loader app-loader loader-hidden"></div>
                <div className={ layoutContainerClass }>
                    <Header />
                    <Sidebar location={ this.props.location } />
                    <Main location={ this.props.location }>
                        { this.props.children }
                    </Main>
                </div>
            </div>
        );
    }
}

export default App;