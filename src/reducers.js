import { combineReducers } from 'redux';
import { decode } from 'ent';

import config from 'config';

const ADD_POST = Symbol();
const SET_SITE = Symbol();

function posts( state = [], action ) {
	switch ( action.type ) {
		case ADD_POST:
			return state.concat( action.post );

		default:
			return state
	}
}

function site( state = '', action ) {
	switch ( action.type ) {
		case SET_SITE:
			return action.site;
		default:
			return state;
	}
}

export const addPost = post => ( {
	type: ADD_POST,
	post: { ...post, title: decode( post.title ) }
} );

export const fetchPosts = dispatch => {
	fetch( `https://public-api.wordpress.com/rest/v1.1/sites/${ config.site }/posts/?fields=ID,attachments,title,content` )
		.then( response => response.json() )
		.then( data => data.posts )
		.then( posts => posts.map( post => ( {
			...post,
			featured_image: post.attachments[ Object.keys( post.attachments ).slice(-1) ].URL
		} ) ) )
		.then( posts => posts.forEach( post => dispatch( addPost( post ) ) ) )
		.catch( console.log );
};

export const setSite = site => ( { type: SET_SITE, site } );

export default combineReducers( {
	posts,
	site
} );
