import React from 'react'
import { Link } from 'react-router'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { DEFAULT_TOOLTIP_PLACEMENT as ttplace }
                                from '../../lib/UiHelper'
import Helper                   from '../../lib/Helper'
import DateHelper               from '../../lib/DateHelper'
import AuthHelper               from '../../lib/AuthHelper'
import Card                     from '../shared/Card'
import DataGrid                 from '../grid/DataGrid'
import UnlockerTypeColumn       from '../grid/columns/UnlockerTypeColumn'
import NumericSummary           from './NumericSummary'
import NumericProgressSummary   from './NumericProgressSummary'

class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.pendingAcceptancesColumnDefs = [
            UnlockerTypeColumn(),
            { headerName: 'Ονοματεπώνυμο', valueGetter: ({ data }) => `${data.assigneeLastName} ${data.assigneeFirstName}` },
            { headerName: 'Ημ/νία Ανάθεσης', cellClass: 'text-center', valueGetter: ({ data }) => DateHelper.toString(data.assignDate) },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 40,
                minWidth: 40,
                cellRendererFramework: ({ data }) => (
                        <div>
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `unlocker-${data.id}-tooltip` }>Ανάθεση</Tooltip> }>
                                <Link to={ `/unlockers/assign/${data.type}/${data.id}` } className="btn btn-primary btn-raised btn-sm">
                                    <i className="fa fa-share" />
                                </Link>
                            </OverlayTrigger>
                        </div>
                    )
            }
        ];

        this.eventsColumnDefs = [
            { headerName: 'Τύπος', field: 'typeTitle' },
            { headerName: 'Περιγραφή', field: 'reason' },
            //{ headerName: 'Κατάστημα', field: 'branch' },
            UnlockerTypeColumn('entityType'), 
            { headerName: 'Δημιουργήθηκε', valueGetter: ({ data }) => DateHelper.toString(new Date(data.created)) }
            //{ headerName: '', valueGetter: ({ data }) => `από ${data.creatorLastName} ${data.creatorFirstName}` }
        ];
    }

    componentDidMount() { this.props.fetchData(); }

    componentWillUnmount() { this.props.clearData() }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NumericProgressSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-indigo-500" title="Ανατεθειμένα Κλειδιά"
                        url="/keys-management" value={ this.props.totalKeyCount - this.props.unassignedKeyCount } 
                        totalValue={ this.props.totalKeyCount } delay={ 300 } />
                    <NumericProgressSummary containerClassName="col-xs-6 col-md-4" colorClassname="bg-purple-400" title="Ανατεθειμένοι Συνδιασμοί" 
                        url="/combinations-management" delay={ 600 } value={ this.props.totalCombinationCount - this.props.unassignedCombinationCount } 
                        totalValue={ this.props.totalCombinationCount } theme="purple" />
                    <NumericSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-indigo-500" title="Εκκρεμείς Αποδοχές"
                        url="/keys-management" value={ (this.props.pendingAcceptances || []).length } />
                </div>

                <div className="row">
                    <Card className="col-md-6" title="Εκκρεμείς Αποδοχές" loading={ this.props.fetching }
                            headingTemplate={ <Link to="/logs" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.pendingAcceptancesColumnDefs }
                            rowData={ this.props.pendingAcceptances }>
                        </DataGrid>
                    </Card>

                    <Card className="col-md-6" title="Τελευταία Συμβάντα" loading={ this.props.eventsFetching }
                            headingTemplate={ <Link to="/logs" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.eventsColumnDefs }
                            rowData={ this.props.events }>
                        </DataGrid>
                    </Card>
                </div>
            </div>
        );
    }
}

export default ManagerDashboard;