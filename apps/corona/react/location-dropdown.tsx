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

class LocationDropdownComp extends React.Component<LocationDropdownProps, any> {
    private dropdownRef: React.RefObject<HTMLSelectElement>;

    constructor(props: LocationDropdownProps) {
        super(props);

        this.dropdownRef = React.createRef<HTMLSelectElement>();
    }

    onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.selectLocation(evt.currentTarget.value ?? null)
    }

    componentDidMount() {
        ($(this.dropdownRef.current) as any).dropdown();
    }

    render() {
        return (
            <div className="ui fluid">
                <select ref={this.dropdownRef} className="ui search selection dropdown" onChange={this.onChange}>
                    <option value="">All</option>
                    {
                        this.props.options.map(loc => <option key={loc} value={loc}>{loc}</option>)
                    }
                </select>

                <Redirect to={`${window.location.pathname}?location=${this.props.chosenLocation ?? ""}`} />
            </div>
        )
    }
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