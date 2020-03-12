import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';

interface StateToProps {
    options: string[];
}

type LocationDropdownProps = StateToProps;

interface LocationDropdownState {
    selected: string;
}

class LocationDropdownComp extends React.Component<LocationDropdownProps, LocationDropdownState> {

    onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            selected: evt.currentTarget.value ?? ""
        })
    }

    render() {
        if (this.state?.selected) 
            return <Redirect to={`/pages/corona.html?${this.state.selected}`} />
        }

        return (
            <select onChange={this.onChange} className="ui search dropdown">
                {
                    this.props.options.map(loc => <option key={loc} value={loc}>{loc}</option>)
                }
            </select>
        )
    }
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