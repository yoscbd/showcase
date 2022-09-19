import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import apiFetch from "@wordpress/api-fetch"
import { format, dateI18n, __experimentalGetSettings } from '@wordpress/date';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck, URLInputButton } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, QueryControls, RangeControl, Button, TextControl } from '@wordpress/components';

import { useEffect } from "@wordpress/element"
import { useSelect } from '@wordpress/data';
//import React, { useState } from "react";
import Select from "react-select";
import './editor.scss';



/* import { useMedia } from '@10up/block-components'; */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts, displayFeaturedImage, order, orderBy, main_title, imgID, imgURL, cta_text, cta_url } =
		attributes;


	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'note', {
				per_page: numberOfPosts,
				_embed: true, // ---- Important Note---- This key will allow us to include
				// the _embedded key with all image metadata such as sizes,
				// we must add it if we want to get the image metadata in the rest api
				order,
				orderby: orderBy,

			});
		},
		[numberOfPosts, order, orderBy] // any change in the attributes listed here will triger the useSelect function
	);



	useEffect(
		function () {
			if (imgID) {
				async function go() {
					const response = await apiFetch({
						path: `/wp/v2/media/${imgID}`,
						method: "GET"
					})
					setAttributes({ imgURL: response.media_details.sizes.full.source_url })
					console.log(response);
				}
				go()
			}
		},
		[imgID]
	)

	function onFileSelect(x) {
		setAttributes({ imgID: x.id })
	}

	// handle new note on the block editor:
	function addNew_note(newNoteTitle) {

		let ourNewPost = {
			"title": newNoteTitle,
			"status": "publish"
		}
		jQuery.ajax({
			beforeSend: xhr => {
				xhr.setRequestHeader("X-WP-Nonce", '5ed9aa4c6e')
			},
			url: "http://127.0.0.1/trullion/wp-json/wp/v2/note/",
			type: "POST",
			data: ourNewPost,
			success: response => {
				console.log("Congrats")
				console.log("response: ", response)
				console.log("new ID: ", response.id)
				console.log("new tittle: ", response.title.rendered)
				console.log("posts: ", posts)



			},
			error: response => {
				console.log("Sorry")
				console.log(response)
			}
		})


	}

	const { imageId } = 43; // set the default image here
	const onNumberOfItemsChange = (value) => {
		setAttributes({ numberOfPosts: value });

	};

	const onNumberOfColumnsChange = (value) => {
		setAttributes({ numberOfColumns: value });
	};



	const blockProps = useBlockProps({
		className: 'section-forth',
		style: { height: "auto" }
	});


	const ulBlockProps = useBlockProps({
		className: 'min-list link-list'
	});



	return (
		<>
			<InspectorControls>


				<PanelBody title="Main Block Image" initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={imgID}
								render={({ open }) => {
									return <Button onClick={open}>Choose Image</Button>
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>

				<PanelBody>

					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfItemsChange}
						maxItems={10}
						minItems={1}
						orderBy={orderBy}
						onOrderByChange={(value) =>
							setAttributes({ orderBy: value })
						}
						order={order}
						onOrderChange={(value) =>
							setAttributes({ order: value })
						}

					/>
				</PanelBody>






			</InspectorControls >

			<section {...blockProps}>
				<div className="create-note">
					<h2 className="headline headline--medium">Create New Note</h2>

					<TextControl
						onChange={(value) => set_new_note_title_value(value)}
						value={new_note_title_value}
						className="new-note-title"
						placeholder="note text"
						required=""
					></TextControl>

					<span className="submit-note">Add Note</span>
					<button
						onClick={() => { addNew_note(new_note_title_value) }}>Add New Note</button>
					<p className="note_users-message">you must enter some text for this note</p>
				</div>



				<div className="section-container">



					<div className="left">


						<RichText
							tagName="h4"
							value={main_title}
							onChange={(value) => setAttributes({ main_title: value })}
							placeholder={__('Main Title Here...', 'ybd-blocks')}
						/>




						<ul {...ulBlockProps}>
							{posts &&
								posts.map((post) => {
									//when we will access the API to fetch all posts we will also fetch the _embedded that holds media metadata.
									// wp.data.select('core').getEntityRecords("postType","post",{per_page: -1, _embed: true})

									return (
										<>
											<li data-id={post.id} key={post.id} aria-hidden="true" className={"fa fa-check-square "} >

												{post.title.rendered}


											</li>
										</>
									);
								})}
						</ul>


						<div className="cta-wrapper">
							<button href={cta_url} className="cta-button" type="button">{
								<RichText
									tagName="span"
									value={cta_text}
									onChange={(value) => setAttributes({ cta_text: value })}
									placeholder={__('CTA Text Here...', 'ybd-blocks')}
									allowedFormats={['core/bold', 'core/italic', 'core/text-color']}
									aria-label="Change Text"

								/>

							}

							</button>
							<URLInputButton

								url={cta_url}
								onChange={(val) => setAttributes({ cta_url: val })}
							/>

						</div>

						{/* 	<Button href={cat_url} className="cta-button" type="button">{cta_text}</Button> */}


					</div>
					<div className="right">

						{/* 	<img width="593" height="302" src="http://127.0.0.1/trullion/wp-content/uploads/2022/07/Group-2114.png" className="attachment-full size-full" alt="" loading="lazy" srcset="http://127.0.0.1/trullion/wp-content/uploads/2022/07/Group-2114.png 593w, http://127.0.0.1/trullion/wp-content/uploads/2022/07/Group-2114-300x153.png 300w" sizes="(max-width: 593px) 100vw, 593px" /> */}

						<img src={imgURL} className="attachment-full size-full" loading="lazy" alt="Bullets main iamge" />
					</div>

				</div>


			</section>





		</>


	);
}
