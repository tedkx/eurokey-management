import React from 'react';

class NoRouteMatch extends React.Component {
    render() {
        return (
            <div>
                <h2>Error 403</h2>
                <h4>Δεν έχετε δικαιώματα να δείτε αυτή τη σελίδα</h4>
            </div>
        );
    }
}

export default NoRouteMatch;