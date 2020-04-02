import React from 'react';
import { urls, services } from '../api';
import styles from './index.less';
export default class Page extends React.Component {
  componentDidMount() {
    services.post(
      urls.copyIntent,
      {},
      data => {
        console.log('data', data);
      },
      error => {
        console.log('data', error);
      },
    );
  }
  render() {
    return (
      <div>
        <h1 className={styles.title}>Page index</h1>
      </div>
    );
  }
}
