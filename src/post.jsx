import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

require( 'post.scss' );

const renderCategory = ( { ID, name } ) => (
	<span className="category" key={ ID }>
		<Link to={ `/categories/${ ID }` }>{ name }</Link>
	</span>
);

const renderTag = ( { ID, name } ) => (
	<span className="tag" key={ ID }>
		<Link to={ `/tags/${ ID }` }>{ name }</Link>
	</span>
);

export default ( { site, post } ) => (
	<div className="post">
		<div className="meta-block">
			<h1 className="title">{ post.title }</h1>
			<span>{ moment( post.date ).format( 'LL') }</span>
		</div>
		<img className="featured-image" src={ post.featured_image.URL } />
		<div className="description" dangerouslySetInnerHTML={ { __html: post.content } } />
		<div className="meta-block">
			<span>
				{ Object
					.keys( post.categories )
					.map( k => post.categories[ k ] )
					.map( renderCategory ) }
			</span>
			<span>
				{ Object
					.keys( post.tags )
					.slice( 0, 3 )
					.map( k => post.tags[ k ] )
					.map( renderTag ) }
			</span>
		</div>
	</div>
);
