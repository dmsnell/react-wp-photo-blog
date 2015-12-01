import { combineReducers } from 'redux';
import { decode } from 'ent';

import config from 'config';

const ADD_POST = Symbol();
const SET_SITE = Symbol();

function posts( state = [], action ) {
	switch ( action.type ) {
		case ADD_POST:
			return state.concat( action.post );

		case SET_SITE:
			return [];

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

export const fetchPosts = site => ( dispatch )=> {
	const fields = [
		'ID',
		'attachments',
		'title',
		'content',
		'tags',
		'date',
		'categories'
	].join( ',' );

	fetch( `https://public-api.wordpress.com/rest/v1.1/sites/${ site }/posts/?fields=${ fields }&order=DESC` )
		.then( response => response.json() )
		.then( data => data.posts )
		.then( posts => posts.map( post => ( { ...post, featured_image: post.attachments[ Object.keys( post.attachments ).slice( -1 ) ] } ) ) )
		.then( posts => posts.forEach( post => dispatch( addPost( post ) ) ) )
		.catch( console.log );
};

export const setSite = site => ( { type: SET_SITE, site } );

export default combineReducers( {
	posts,
	site
} );
