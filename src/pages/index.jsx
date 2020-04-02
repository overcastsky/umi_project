import React from 'react';
import { urls, services } from '../api';
import { connect } from 'dva';
import styles from './index.less';
class Page extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'pages/fetch',
      payload: {},
    });
    // services.post(
    //   urls.copyIntent,
    //   {},
    //   data => {
    //     console.log('data', data);
    //   },
    //   error => {
    //     console.log('data', error);
    //   },
    // );
  }
  render() {
    return (
      <div>
        <h1 className={styles.title}>Page index</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data } = state.pages;
  return {
    data,
  };
}

export default connect(mapStateToProps)(Page);
