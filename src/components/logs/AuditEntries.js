import React            from 'react';

import DateHelper       from '../../lib/DateHelper'
import Card             from '../shared/Card'
import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'
import UnlockerTypeColumn from '../grid/columns/UnlockerTypeColumn'

class AuditEntries extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Περιγραφή', field: 'description' },
            { headerName: 'Κατάστημα', field: 'branch' },
            UnlockerTypeColumn('entityType'), 
            { headerName: 'Αφορά', field: 'entityTitle' },
            { headerName: '', valueGetter: ({ data }) => `${data.relatedLastName} ${data.relatedFirstName}` },
            { headerName: 'Συμβάν', field: 'eventTypeTitle' },
            { headerName: 'Δημιουργήθηκε', cellRendererFramework: ({ data }) => (
                <div>
                    { DateHelper.toString(new Date(data.created)) } από<br />
                    { `${data.creatorLastName} ${data.creatorFirstName}` }
                </div>
            )}
        ];
    }

    componentDidMount() {
        this.props.fetchData()
    }

    componentWillUnmount() {
        this.props.clearData()
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card title="Ανάθεση Κλειδιών" className="col-md-12" loading={ this.props.fetching }>
                        <DataGrid columnDefs={ this.columnDefs } rowData={ this.props.data } />
                    </Card>
                </div>
            </div>
        );
    }
}

export default AuditEntries;