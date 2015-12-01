import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Post from 'post';

require( 'post-list.scss' );

const PostList = ( { posts, params: { selectedTag = 0, selectedCategory = 0 }, site } ) => (
	<div className="post-list">
		{ posts
			.filter( post => ! selectedCategory || Object
				.keys( post.categories )
				.map( k => post.categories[ k ] )
				.find( c => c.ID === parseInt( selectedCategory, 10 ) ) !== undefined
			)
			.filter( post => ! selectedTag || Object
				.keys( post.tags )
				.map( k => post.tags[ k ] )
				.find( t => t.ID === parseInt( selectedTag, 10 ) ) !== undefined
			)
			.filter( post => post.featured_image )
			.map( ( post, index ) => <Post key={ index } { ...{ post, site } } /> ) }
	</div>
);

export default connect( state => state )( PostList );
