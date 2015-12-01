import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

require( 'post-list.scss' );

const PostList = ( { posts } ) => (
	<div className="post-list">
		<ul>
		{ posts
			.filter( post => post.featured_image )
			.map( ( post, index ) => (
				<li key={ index }>
					<Link to={ `/posts/${ post.ID }` }>
						<img src={ post.featured_image } />
						<h1>{ post.title }</h1>
					</Link>
				</li>
			) ) }
		</ul>
	</div>
);

export default connect( state => state )( PostList );
