import React from 'react';

class EmployeeDashboard extends React.Component {
    render() {
        return (
            <div>
                <Box>
                    <table>
                    {
                        Helper.isArray(this.props.myItems)
                            ? this.props.myItems.map(pa => (
                                <tr>
                                    <td>{ a.type }</td>
                                    <td>{ a.code }</td>
                                </tr>
                            ))
                            : false
                    }
                    </table>
                </Box>
                <Box>
                    <table>
                    {
                        Helper.isArray(this.props.pendingAcceptances)
                            ? this.props.pendingAcceptances.map(pa => (
                                <tr>
                                    <td>{ a.type }</td>
                                    <td>{ a.code }</td>
                                </tr>
                            ))
                            : false
                    }
                    </table>
                </Box>
            </div>
        )
    }
}

export default EmployeeDashboard;