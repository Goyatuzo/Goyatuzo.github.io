import * as React from 'react';

import TextArea from '../views/textarea';
import Button from '../views/button';

interface IJsonGuidContainerProps {

};

interface IJsonGuidContainerState {

};

export default class JsonGuidContainer extends React.Component<IJsonGuidContainerProps, IJsonGuidContainerState> {
    render() {
        return (
            <div>
                <TextArea rows={4} columns={50} />
                <Button onChange={() => { }} buttonText="Convert" />
            </div>
        );
    }
}