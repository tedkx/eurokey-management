import React            from 'react';

import DateHelper       from '../../lib/DateHelper'
import Card             from '../shared/Card'
import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'
import UnlockerTypeColumn from '../grid/columns/UnlockerTypeColumn'

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Τύπος', field: 'typeTitle' },
            { headerName: 'Περιγραφή', field: 'reason' },
            { headerName: 'Κατάστημα', field: 'branch' },
            UnlockerTypeColumn('entityType'), 
            { headerName: 'Δημιουργήθηκε', valueGetter: ({ data }) => DateHelper.toString(new Date(data.created)) },
            { headerName: '', valueGetter: ({ data }) => `από ${data.creatorLastName} ${data.creatorFirstName}` }
        ];

        if(this.props.role !== 'security')
            this.columnDefs.splice(2, 1);
    }

    componentDidMount() {
        this.props.fetchData()
    }

    componentWillUnmount() {
        this.props.clearData()
    }

    render() {
        let assigning = this.props.location.pathname.match(/\/unlockers\/(assign|define)/) != null,
            unlocker = (assigning ? (this.props.unlockers || []).find(ul => ul.id == this.props.params.id && ul.type == this.props.params.type) : {}) || {};
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card title="Συμβάντα" className="col-md-12" loading={ this.props.fetching }>
                        <DataGrid columnDefs={ this.columnDefs } rowData={ this.props.data } />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Events;