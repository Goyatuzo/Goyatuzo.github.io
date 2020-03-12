import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';

interface StateToProps {
    options: string[];
}

type LocationDropdownProps = StateToProps;

const LocationDropdownComp: React.StatelessComponent<LocationDropdownProps> = props => {
    return (
        <select className="ui search dropdown">
            {
                props.options.map(loc => <option key={loc} value={loc}>{loc}</option>)
            }
        </select>
    )
}

const LocationDropdown = connect<StateToProps, any, any, CrnTableState>(state => {
    const locations: { [name: string]: boolean } = {};

    // Store all countries and provinces in the dictionary to act as a set.
    state.locations.forEach(location => {
        locations[location.country] = true;
        locations[location.province] = true;
    });

    const sortedLocations = Object.keys(locations).filter(location => location).sort();

    return {
        options: sortedLocations
    }
})(LocationDropdownComp);

export default LocationDropdown;