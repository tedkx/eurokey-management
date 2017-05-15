import React                from 'react'
import PropTypes            from 'prop-types'
//import { Link }             from 'react-router-dom'
import { Link }             from 'react-router'

import Helper               from '../../lib/Helper'

import avatarMale           from '../../static/img/avatar-male.jpg'
import avatarFemale         from '../../static/img/avatar-female.jpg'
import eurologo             from '../../static/img/euro.png'

const menuItemData = [
    { order: 1, title: 'Dashboard', icon: 'tachometer', route: '/' },
    { order: 100, title: 'Διαμόρφωση Καταστήματος', icon: 'cubes', route: '/branches', roles: ['security'] },
    { order: 150, title: 'Διαχείριση Θέσεων / Κλειδαριών', icon: 'lock', route: '/locks', roles: ['security', 'manager', 'assistant-manager', 'supervisor'] },
    //{ order: 200, title: 'Διαχείριση Κλειδιών', icon: 'key', route: '/keytypes', roles: ['security', 'supervisor', 'manager', 'assistant-manager'] },
    //{ order: 200, title: 'Διαχείριση Κλειδιών', icon: 'key', route: '/keytypes', roles: ['security', 'supervisor', 'manager', 'assistant-manager'] },
    { order: 300, title: 'Ανάθεση', icon: 'key', route: '/unlockers', roles: ['manager', 'assistant-manager'] },
    { order: 500, title: 'Συμβάντα', icon: 'list-alt', route: '/logs' }
]

class Sidebar extends React.Component {
    render() {
        return (
            <aside className="sidebar-container">
                <div className="sidebar-header">
                    <a href="" className="sidebar-header-logo">
                        <img src={ eurologo } />
                        <span className="sidebar-header-logo-text">EuroKeyMan</span>
                    </a>
                </div>
                <div className="sidebar-content ">
                    <div className="sidebar-toolbar text-center ">
                        <a href="javascript:;" style={ { display: 'none' } }><img src={ avatarMale } alt="Profile" className="img-circle thumb64" /></a>
                        {
                            this.props.user == null
                                ? false
                                : (
                                    <div className="mt">
                                        { `${this.props.user.firstName} ${this.props.user.lastName}` }
                                        <br />
                                        { this.props.user.role }
                                    </div>
                                )
                        }
                    </div>
                    <nav className="sidebar-nav ">
                        <ul>
                            {
                                this.props.user == null
                                    ? false
                                    : menuItemData.filter(m => !Helper.isArray(m.roles) || m.roles.indexOf(this.props.user.role) >= 0).map((item, idx) => (
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