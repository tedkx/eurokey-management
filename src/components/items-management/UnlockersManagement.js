import React            from 'react';

import { Link }         from 'react-router'

import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'

class ItemsManagement extends React.Component {
    constructor(props) {
        super(props);

        console.log('itemsmanagement props', this.props);

        this.columnDefs = [
            { headerName: '', cellRendererFramework: ({ data }) => (
                <span className={ 'label label-' + (data.type == 'key' ? 'info' : 'warning') }>
                    { data.type == 'key' ? 'Κλειδι' : 'Συνδιασμός' }
                </span>
            )},
            //{ headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Θέση', field: 'lockTitle' },
            { headerName: 'Κατηγορία', valueGetter: (params) => params.data.typeId == 'main' ? 'Κύριο' : params.data.typeId == 'secondary' ? 'Δευτερεύον' : 'Κανονικό' },
            { headerName: 'Ιδιαιτερότητες', valueGetter: (params) => (params.data.features || []).join(', ') },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 80,
                cellRendererFramework: (params) => (
                    <div>
                        <Link to={ `/unlockers/assign/${params.data.type}/${params.data.id}` } className="btn btn-primary btn-raised btn-sm">
                            <i className="fa fa-share" />
                        </Link>
                        <button type="button" className="btn btn-danger btn-raised btn-sm ml-sm">
                            <i className="fa fa-remove" />
                        </button>
                    </div>
                )
            }
        ]
    }

    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        let assigning = this.props.location.pathname.match(/\/unlockers\/assign/) != null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">
                        Ανάθεση Κλειδιών
                    </h4>
                </div>
                <div className="row">
                    <DataGrid columnDefs={ this.columnDefs }
                        rowData={ this.props.unlockers }
                        loading={ this.props.fetching }
                        className={ 'locks-grid' + (assigning ? ' col-md-4' : 'col-md-12') }>
                        <CenteredOverlay visible={ assigning } />
                    </DataGrid>
                    
                    <div className="col-md-8">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemsManagement;