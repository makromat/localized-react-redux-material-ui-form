import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FormPage from 'containers/FormPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import globalTranslations from './translations/global.json';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.props.initialize({
      languages: [{
        name: "English",
        code: "en"
      }, {
        name: "French",
        code: "fr"
      }],
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <Helmet titleTemplate="%s - Redux Form" defaultTitle="Loteo">
          <meta name="description" content="Material UI Form with Redux" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/form" component={FormPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withLocalize(Main);
