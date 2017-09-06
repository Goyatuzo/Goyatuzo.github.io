import * as React from 'react';

interface IButtonProps {
    classes?: string;
    buttonText: string;
    onChange: Function;
};

const Button = (props: IButtonProps) => {
    return (
        <button className={props.classes} onClick={() => props.onChange.bind(this)}>{props.buttonText}</button>
    );
};

export default Button;