import * as React from 'react';

interface ITextAreaProps {
    rows: number;
    columns: number;
};

const TextArea = (props: ITextAreaProps) => {
    return (
        <textarea rows={props.rows} cols={props.columns}></textarea>
    );
};

export default TextArea;