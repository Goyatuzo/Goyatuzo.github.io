import * as React from 'react';
import { LCSState } from '../../redux/reducers';
import { updateFirstString, updateSecondString, calculate, calculateSubsequence } from '../../redux/actions';
import { connect } from 'react-redux';

interface ExternalProps {
    dataName: "first" | "second";
}

interface StateToProps {
    storedValue: string;
}

interface DispatchToProps {
    updateField: (updatedString: string) => void;
}

type InputProps = ExternalProps & StateToProps & DispatchToProps;

const stringInput: React.StatelessComponent<InputProps> = props => {
    function updateString(changeEvt: React.ChangeEvent<HTMLInputElement>) {
        props.updateField(changeEvt.target.value);
    }

    return (
        <div className="ui left labeled left icon input">
            <i className="tags icon"></i>
            <input value={props.storedValue} onChange={updateString}></input>
            <a className="ui tag label">
                {
                    props.dataName === "first" ? "String 1" : "String 2"
                }
            </a>
        </div>
    )
}

function mapStateToProps(state: LCSState, ownProps: ExternalProps): StateToProps {
    if (ownProps.dataName === "first") {
        return {
            storedValue: state.stringOne
        }
    }

    return {
        storedValue: state.stringTwo
    }
}

function mapDispatchToProps(dispatch, ownProps: ExternalProps): DispatchToProps {
    return {
        updateField: (updatedString: string) => {
            if (ownProps.dataName === "first") {
                dispatch(updateFirstString(updatedString));
            } else {
                dispatch(updateSecondString(updatedString));
            }

            dispatch(calculate());
            dispatch(calculateSubsequence());
        }
    }
}

const StringInput = connect(mapStateToProps, mapDispatchToProps)(stringInput);

export default StringInput;