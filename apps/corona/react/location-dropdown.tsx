import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { selectLocation } from '../redux/actions';

interface StateToProps {
    options: string[];
    chosenLocation: string;
}

interface DispatchToProps {
    selectLocation: (location: string) => void;
}

type LocationDropdownProps = StateToProps & DispatchToProps;

const LocationDropdownComp: React.StatelessComponent<LocationDropdownProps> = props => {

    function onChange(evt: React.ChangeEvent<HTMLSelectElement>) {
        props.selectLocation(evt.currentTarget.value ?? null)
    }

    return (
        <>
            <select onChange={onChange} className="ui search dropdown">
                {
                    props.options.map(loc => <option key={loc} value={loc}>{loc}</option>)
                }
            </select>

            <Redirect to={`${window.location.pathname}?location=${props.chosenLocation ?? ""}`} />
        </>
    )
}

const LocationDropdown = connect<StateToProps, DispatchToProps, any, CrnTableState>(state => {
    const locations: { [name: string]: boolean } = {};

    // Store all countries and provinces in the dictionary to act as a set.
    state.locations.forEach(location => {
        locations[location.country] = true;
        locations[location.province] = true;
    });

    const sortedLocations = Object.keys(locations).filter(location => location).sort();

    return {
        options: sortedLocations,
        chosenLocation: state.chosenLocation
    }
}, (dispatch) => {
    return {
        selectLocation: (location: string) => dispatch(selectLocation(location))
    }
})(LocationDropdownComp);

export default LocationDropdown;