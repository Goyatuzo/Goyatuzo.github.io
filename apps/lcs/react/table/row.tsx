import * as React from 'react';
import { LCSDPCell } from '../../redux/classes/dp-cell';

interface LCSTableRowProps {
    values: { [column: number]: LCSDPCell };
}

const LCSTableRow: React.StatelessComponent<LCSTableRowProps> = props => {
    return (
        <tr>
            {
                props.values ? Object.keys(props.values).map(key => <td key={key}>{props.values[key].length}</td>) : <td></td>
            }
        </tr>
    )
}

export default LCSTableRow;