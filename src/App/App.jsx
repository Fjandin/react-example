import * as React from "react";
import { Component } from 'react';
import * as classnames from 'classnames';
import * as styles from './App.css';
import * as logo from 'images/logo.svg';

class App extends Component {
    render() {
        return (
            <div className={styles["App"]}>
                <div className={styles["App-header"]}>
                    <img src={logo} className={classnames(styles["App-logo"], styles.Small)} alt="logo" />
                    <h2>Welcome to React!</h2>
                </div>
                <p className={styles["App-intro"]}>
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
