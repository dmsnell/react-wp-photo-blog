import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

require( 'post.scss' );

const Post = ( { site, posts, params: { postId } } ) => {
	const post = posts
		.filter( p => p.featured_image )
		.find( p => p.ID === parseInt( postId, 10 ) );

	if ( ! post ) { return <div /> }

	return (
		<div className="post">
			<h1>{ post.title }</h1>
			<div dangerouslySetInnerHTML={ { __html: post.content } } />
			<a href={ post.URL } target="_blank">{ `See it on ${ site }` }</a>
		</div>
	);
};

export default connect( state => state )( Post );
