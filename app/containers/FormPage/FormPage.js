import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Checkout from '../Checkout/Checkout';
import { changeFormPage } from '../App/actions';

class FormPage extends React.Component {
  componentWillUnmount() {
    this.props.changeFormPage(0);
  }

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Form Page</title>
          <meta name="description" content="Form Page" />
        </Helmet>
        <Checkout />
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  changeFormPage: (message) => dispatch(changeFormPage(message)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPage);
