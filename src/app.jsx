import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import config from 'config';
import { fetchPosts, setSite } from 'reducers';
import store from 'store';

import PostList from 'post-list';

require( 'app.scss' );

const App = React.createClass( {
	componentDidMount() {
		this.refreshStore();
	},

	componentDidUpdate( oldProps ) {
		if ( oldProps.params.site !== this.props.params.site ) {
			this.refreshStore();
		}
	},

	refreshStore() {
		const { site = config.site } = this.props.params;

		store.dispatch( setSite( site ) );
		store.dispatch( fetchPosts( site ) );
	},

	render() {
		return <div>{ this.props.children }</div>;
	}
} );

const wrapped = Type => props => <Provider { ...{ store } }><Type { ...props } /></Provider>;

ReactDOM.render( (
	<Router>
		<Route path="/(:site)" component={ App }>
			<IndexRoute component={ wrapped( PostList ) } />
			<Route path="categories/:selectedCategory" component={ wrapped( PostList ) } />
			<Route path="tags/:selectedTag" component={ wrapped( PostList ) } />
		</Route>
	</Router>
), document.getElementById( 'root' ) );