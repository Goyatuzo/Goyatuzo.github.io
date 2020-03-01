import * as React from 'react';
import { LCSDPCell } from '../../redux/classes/dp-cell';

interface LCSTableRowProps {
    char: string;
    values: { [column: number]: LCSDPCell };
}

const LCSTableRow: React.StatelessComponent<LCSTableRowProps> = props => {
    return (
        <tr>
            <td>{props.char}</td>
            {
                props.values ? Object.keys(props.values).map(key => <td key={key}>{props.values[key].length}</td>) : <td></td>
            }
        </tr>
    )
}

export default LCSTableRow;