import { __ } from '@wordpress/i18n';
import apiFetch from "@wordpress/api-fetch"
import React, { useState } from 'react'
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck, URLInputButton } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, QueryControls, RangeControl, Button, TextControl } from '@wordpress/components';
import { useEffect } from "@wordpress/element"
import { useSelect } from '@wordpress/data';
import './editor.scss';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts, displayFeaturedImage, order, orderBy, main_title, imgID, imgURL, cta_text, cta_url } =
		attributes;

	const [new_note_title_value, set_new_note_title_value] = useState('')
	// fetch note post
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


	const onDisplayFeaturedImageChange = (value) => {
		setAttributes({ displayFeaturedImage: value });
	};

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

	const imgButtonText = imgID ? "Change Image" : "Chose Image"

	// handle main image:

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
				xhr.setRequestHeader("X-WP-Nonce", globalData.nonce)
			},
			url: "http://127.0.0.1/trullion/wp-json/wp/v2/note/",
			type: "POST",
			data: ourNewPost,
			success: response => {
				console.log("Congrats")
				console.log("response: ", response)
				setAttributes({ numberOfPosts: numberOfPosts + 1 }); // update the number of post so we will have one more + render the posts array by changing numberOfPosts in posts useselect()
			},
			error: response => {
				console.log("Sorry")
				console.log(response)
			}
		})

	}

	return (
		<>
			<InspectorControls>


				<PanelBody title="Main Block Image" initialOpen={true}>
					<PanelRow>
						<ToggleControl
							label={__('Display Main Image ?', 'ybd-blocks')}
							checked={displayFeaturedImage}
							onChange={onDisplayFeaturedImageChange}
						/>
					</PanelRow>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={imgID}
								render={({ open }) => {
									return <Button onClick={open}>{imgButtonText}</Button>
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
					{imgURL &&
						<PanelRow>

							<img src={imgURL} alt="Main Block Image" />
						</PanelRow>
					}
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
					<h3 className="headline headline--medium"><FontAwesomeIcon icon={faUser} />{__('Create New Note (This Option Will Be Displayed To Admin Users Only.)', 'ybd-blocks')}</h3>

					<TextControl
						onChange={(value) => set_new_note_title_value(value)}
						value={new_note_title_value}
						className="new-note-title"
						placeholder="Note's Title Here"
						required=""
					></TextControl>


					<button
						onClick={() => { addNew_note(new_note_title_value) }}>{__('Add Note', 'ybd-blocks')}</button>
					<p className="note_users-message">{__('you must enter some text for this note', 'ybd-blocks')}</p>
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
												<i clclassName="fa fa-check-square" aria-hidden="true"></i>

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
								/>

							}

							</button>
							<URLInputButton

								url={cta_url}
								onChange={(val) => setAttributes({ cta_url: val })}
							/>

						</div>


					</div>
					<div className="right">
						{displayFeaturedImage && //check if we should show the main image
							<img src={imgURL} className="attachment-full size-full" loading="lazy" alt="Bullets main iamge" />
						}

					</div>
				</div>
			</section>
		</>

	);
}
