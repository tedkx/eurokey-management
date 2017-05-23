import React    from 'react'

export const UnlockerTypeRenderer = (dataProperty = 'type') => (
    ({ data }) => <i className={ 'fa fa-' + (data.type == 'key' ? 'key' : 'calculator') } />
);

const UnlockerTypeColumn = (dataProperty = 'type', headerName = '') => (
    { headerName, width: 27, minWidth: 27, cellClass: 'text-center blue', cellRendererFramework: UnlockerTypeRenderer(dataProperty) }
)

export default UnlockerTypeColumn