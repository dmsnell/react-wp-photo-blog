import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import config from 'config';
import { fetchPosts, setSite } from 'reducers';
import store from 'store';

import PostList from 'post-list';
import Post from 'post';

require( 'app.scss' );

store.dispatch( fetchPosts );
store.dispatch( setSite( config.site ) );

const App = ({children}) => <div>{ children }</div>;
const wrapped = Type => props => <Provider { ...{ store } }><Type { ...props } /></Provider>;

ReactDOM.render( (
	<Router>
		<Route path="/" component={ App }>
			<IndexRoute component={ wrapped( PostList ) } />
			<Route path="/posts/:postId" component={ wrapped( Post ) } />
		</Route>
	</Router>
), document.getElementById( 'root' ) );