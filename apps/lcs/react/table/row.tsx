import * as React from 'react';
import { LCSDPCell } from '../../redux/classes/dp-cell';

import LCSTableCell from './cell';

interface LCSTableRowProps {
    char: string;
    values: { [column: number]: LCSDPCell };
}

const LCSTableRow: React.StatelessComponent<LCSTableRowProps> = props => {
    return (
        <tr>
            <td>{props.char}</td>
            {
                Object.keys(props.values).map(key => <LCSTableCell key={key} {...props.values[key]} />)
            }
        </tr>
    )
}

export default LCSTableRow;