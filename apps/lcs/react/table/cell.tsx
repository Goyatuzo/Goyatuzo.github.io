import * as React from 'react';
import { LCSDPCell, LCSDirection } from '../../redux/classes/dp-cell';

interface LCSTableCellProps extends LCSDPCell { }

const LCSCell: React.StatelessComponent<LCSTableCellProps> = props => {
    let arrow: JSX.Element = null;

    switch (props.direction) {
        case LCSDirection.UP:
            arrow = <i className="arrow up icon"></i>;
            break;
        case LCSDirection.LEFT:
            arrow = <i className="arrow left icon"></i>;
            break;
        case LCSDirection.DIAG:
            arrow = <i className="arrow expand alternate flipped icon"></i>;
            break;
        default:
            break;
    }

    return (
        <td className={props.isSubsequence ? "green" : ""} >{props.length} {arrow}</td>
    )
}

export default LCSCell;