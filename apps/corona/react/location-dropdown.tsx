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
                props.options.map(loc => <option value={loc}>{loc}</option>)
            }
        </select>
    )
}

const LocationDropdown = connect<StateToProps, any, any, CrnTableState>(state => {
    const locations: { [name: string]: boolean } = {};

    state.locations.forEach(location => {
        locations[location.country] = true;
        locations[location.province] = true;
    });

    return {
        options: Object.keys(locations).filter(location => location)
    }
})(LocationDropdownComp);

export default LocationDropdown;