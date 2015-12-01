import React from 'react';
import { Link } from 'react-router';
import frac from 'frac';
import moment from 'moment';

require( 'post.scss' );

const renderCategory = site => ( { ID, name } ) => (
	<span className="category" key={ ID }>
		<Link to={ `/${ site }/categories/${ ID }` }>{ name }</Link>
	</span>
);

const renderTag = site => ( { ID, name } ) => (
	<span className="tag" key={ ID }>
		<Link to={ `/${ site }/tags/${ ID }` }>{ name }</Link>
	</span>
);

const wantedExifTags = {
	camera: 1,
	shutter_speed: 2,
	aperture: 3,
	iso: 4,
	focal_length: 5
};
const selectExifTags = ( [ k, _ ] ) => !! wantedExifTags[ k ];
const sortExifTags = ( [ a, ], [ b, ] ) => wantedExifTags[ a ] - wantedExifTags[ b ];

const mapExifData = ( [ k, v ] ) => {
	let r;

	switch ( k ) {
		case 'aperture':
			r = `f/${ v }`
			break;

		case 'created_timestamp':
			r = moment( parseInt( v, 10 ) * 1000 ).format( 'LL' );
			break;

		case 'shutter_speed':
			r = frac( parseFloat( v ), 8000 );
			r = `${ r[0] ? r[0] : `${ r[1] }/${ r[2] }` }s`;
			break;

		default:
			r = v;
	}

	return [ k, r ];
};

export default ( { site, post } ) => (
	<div className="post">
		<div className="meta-block">
			<h1 className="title">{ post.title }</h1>
			<span>{ moment( post.date ).format( 'LL') }</span>
		</div>
		<img className="featured-image" src={ post.featured_image.URL } />
		<div className="description" dangerouslySetInnerHTML={ { __html: post.content } } />
		<div className="exif-data">
			{ Object.keys( post.featured_image.exif )
				.map( k => [ k, post.featured_image.exif[ k ] ] )
				.filter( ( [ _, v ] ) => v && ( ! Array.isArray( v ) || v.length ) )
				.filter( selectExifTags )
				.map( mapExifData )
				.slice()
				.sort( sortExifTags )
				.map( ( [ k, v ], i ) => <div key={ i }><strong>{ k }</strong>: { v }</div> ) }
		</div>
		<div className="meta-block">
			<span>
				{ Object
					.keys( post.categories )
					.map( k => post.categories[ k ] )
					.map( renderCategory( site ) ) }
			</span>
			<span>
				{ Object
					.keys( post.tags )
					.slice( 0, 3 )
					.map( k => post.tags[ k ] )
					.map( renderTag( site ) ) }
			</span>
		</div>
	</div>
);
