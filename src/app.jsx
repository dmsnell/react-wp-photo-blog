import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import config from 'config';
import { fetchPosts, setSite } from 'reducers';
import store from 'store';

import PostList from 'post-list';

require( 'app.scss' );

store.dispatch( fetchPosts );
store.dispatch( setSite( config.site ) );

const App = ({children}) => <div>{ children }</div>;
const wrapped = Type => props => <Provider { ...{ store } }><Type { ...props } /></Provider>;

const render = () => ReactDOM.render( (
	<Router>
		<Route path="/" component={ App }>
			<IndexRoute component={ wrapped( PostList ) } />
			<Route path="categories/:selectedCategory" component={ wrapped( PostList ) } />
			<Route path="tags/:selectedTag" component={ wrapped( PostList ) } />
		</Route>
	</Router>
), document.getElementById( 'root' ) );

const schedule = () => requestAnimationFrame( () => {
	if ( ! store.getState().posts.length ) {
		return schedule();
	}

	render();
} );