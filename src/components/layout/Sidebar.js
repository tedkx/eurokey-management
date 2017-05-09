import React                from 'react'
import PropTypes            from 'prop-types'
import { Link }             from 'react-router-dom';

import avatarMale           from '../../static/img/avatar-male.jpg'
import avatarFemale         from '../../static/img/avatar-female.jpg'
import eurologo             from '../../static/img/euro.png'

const menuItemData = [
    { order: 1, title: 'Dashboard', icon: 'tachometer', route: '/' },
    { order: 2, title: 'Διαχείριση Κλειδιών', icon: 'key', route: '/keys-management' },
    { order: 3, title: 'Διαχείριση Συνδιασμών', icon: 'unlock-alt', route: '/combination-management' },
    { order: 4, title: 'Logs', icon: 'list-alt', route: '/logs' }
]

class Sidebar extends React.Component {
    render() {
        
        return (
            <aside className="sidebar-container">
                <div className="sidebar-header">
                    <a href="" className="sidebar-header-logo">
                        <img src={ eurologo } />
                        <span className="sidebar-header-logo-text">Euro KeyMan</span>
                    </a>
                </div>
                <div className="sidebar-content ">
                    <div className="sidebar-toolbar text-center ">
                        <a href="javascript:;" style={ { display: 'none' } }><img src={ avatarMale } alt="Profile" className="img-circle thumb64" /></a>
                        <div className="mt">
                            { `${this.props.user.firstName} ${this.props.user.lastName}` }
                            <br />
                            { this.props.user.role }
                        </div>
                    </div>
                    <nav className="sidebar-nav ">
                        <ul>
                            {
                                menuItemData.map((item, idx) => (
                                    <li key={ 'menu-item-' + idx } className={ false ? 'active' : '' }>
                                        <Link to={ item.route }>
                                            <i className={ 'fa fa-' + item.icon } aria-hidden="true" />
                                            <span>{ item.title }</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

Sidebar.propTypes = {
    user: PropTypes.object
}

export default Sidebar;