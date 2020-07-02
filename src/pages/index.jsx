// import React from 'react';
// import { urls, services } from '../api';
// import { connect } from 'dva';
// import { CustomizeUpload } from '../components';
// import styles from './index.less';
// class Page extends React.Component {
//   // componentDidMount() {
//   //   this.props.dispatch({
//   //     type: 'pages/fetch',
//   //     payload: {},
//   //   });
//     // services.post(
//     //   urls.copyIntent,
//     //   {},
//     //   data => {
//     //     console.log('data', data);
//     //   },
//     //   error => {
//     //     console.log('data', error);
//     //   },
//     // );
//   // }
//   render() {
//     const propsConfig = {
//       critical: 300,
//       showNum: -1,
//     };
//     return (
//       <div style={{ width: '100%' }}>
//         <CustomizeUpload {...propsConfig} />
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { data } = state.pages;
//   return {
//     data,
//   };
// }

// export default connect(mapStateToProps)(Page);

import React from 'react';
import { urls, services } from '../api';
import { connect } from 'dva';
import { SelfColumn } from '../components';
import ChartsDemo from './container/chartsDemo';
import styles from './index.less';
class Page extends React.Component {
  render() {
    return <ChartsDemo />;
  }
}

function mapStateToProps(state) {
  const { data } = state.pages;
  return {
    data,
  };
}

export default connect(mapStateToProps)(Page);
