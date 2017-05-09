import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TicTacToe from './tic-tac-toe';

ReactDOM.render(
    <TicTacToe boardSize={3} />,
    document.getElementById("root")
);