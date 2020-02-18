import React, { Component, Fragment } from 'react';
import CONFIG from '../config'

import './index.css'

const { TUNNEL_LENGTH, TRAIN_LENGTH } = CONFIG;

let interval;

const createTrain = (length) => {
    let train = new Array(length).fill(0);
    return train.map((t, i) => (
        { id: i + 1 }
    ));
}

const TRAIN = createTrain(TRAIN_LENGTH);

const initialState = {
    TRAIN, //5
    TUNNEL_LENGTH, //6
    TUNNEL_STATE: new Array(TUNNEL_LENGTH),
    currentIteration: 0,
    iteration: TRAIN_LENGTH + TUNNEL_LENGTH
}

class App extends Component {

    state = initialState;

    renderTunnel = () => {
        const tunnel = new Array(TUNNEL_LENGTH).fill(0);

        return tunnel.map((t, i) => (
            <div className='d-inline-flex tunnel' key={i}>
                {
                    this.state.TUNNEL_STATE[i] || null
                }
            </div>
        )
        )
    }

    updateStateFromPrevState = (prevState) => {
        const { currentIteration, iteration } = prevState;

        if (currentIteration === iteration) return this.resetState();

        const tempState = [...prevState.TUNNEL_STATE];

        if (currentIteration < TRAIN_LENGTH) tempState.unshift(prevState.TRAIN[currentIteration].id);
        else tempState.unshift(0);

        return { TUNNEL_STATE: tempState.slice(0, TUNNEL_LENGTH), currentIteration: prevState.currentIteration + 1 }

    }

    resetState = () => initialState;

    updateTunnelState = () => this.setState(this.updateStateFromPrevState)

    startTrain = () => {
        if (interval) clearInterval(interval)
        return interval = setInterval(this.updateTunnelState, 1000)
    };

    stopTrain = () => {
        clearInterval(interval);
        return interval = false;
    };

    setTunnelContainerStyle = () => ({ minWidth: `${30 * TUNNEL_LENGTH}px`, maxWidth: `${30 * TUNNEL_LENGTH}px` })

    reset = () => {
        clearInterval(interval);
        interval = false;
        return this.setState(this.resetState);
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className='tunnel-container' style={this.setTunnelContainerStyle()}>
                        {
                            this.renderTunnel()
                        }
                    </div>
                    <button className="btn btn-success" onClick={this.startTrain}> Start Train</button>
                    <button className="btn btn-danger" onClick={this.stopTrain}> Stop Train</button>
                    <button className="btn btn-danger" onClick={this.reset}> Reset</button>
                </div>
            </Fragment>
        )

    }
}

export default App;