
import './editor.scss';
import { __ } from '@wordpress/i18n';
import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow, ToggleControl } from "@wordpress/components"
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import { ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';




/* import { useMedia } from '@10up/block-components'; */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function Edit(props) {

	useEffect(
		function () {
			if (props.attributes.imgID) {
				async function go() {
					const response = await apiFetch({
						path: `/wp/v2/media/${props.attributes.imgID}`,
						method: "GET"
					})
					props.setAttributes({ imgURL: response.media_details.sizes.full.source_url })
					console.log(response);
				}
				go()
			}
		},
		[props.attributes.imgID]
	)

	function onFileSelect(x) {
		props.setAttributes({ imgID: x.id })
	}


	const { imageId } = 37; // set the default image here

	function handleImageSelect(image) {
		setAttributes({ imageId: image.id });
	}


	function onTabsToggleChange(v) {
		props.setAttributes({ tabs_toggle_status: v });
		v ? props.setAttributes({ toggle_class: "show-me" }) : props.setAttributes({ toggle_class: "hide-me" })
	}


	const imgButtonText = props.attributes.imgID ? "Change Image" : "Chose Image"
	const blockProps = useBlockProps({
		className: 'section-third',
		style: { height: "auto", background: props.attributes.trial_background_color }
	});


	return (

		<>
			<InspectorControls>
				<PanelBody title={__('Main Trial Section Image', 'ybd-blocks')} initialOpen={true}>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}
								render={({ open }) => {
									return <Button onClick={open}><strong>{imgButtonText}</strong></Button>
								}}
							/>
						</MediaUploadCheck>
					</PanelRow>
					{props.attributes.imgURL &&
						<PanelRow>

							<img src={props.attributes.imgURL} alt="Main Trial Section Image" />
						</PanelRow>
					}
				</PanelBody>


				<PanelBody title={__('Expand all tabs?', 'ybd-blocks')} initialOpen={true} open={true}>
					<ToggleControl
						label={__('Toggle Tabs Visibility', 'ybd-blocks')}
						checked={props.attributes.tabs_toggle_status}
						onChange={onTabsToggleChange}

					/>
				</PanelBody>

			</InspectorControls>

			<InspectorControls>
				<PanelBody title={__('Trials Colors Style', 'ybd-blocks')} initialOpen={true} >


					<PanelRow><strong>{__('First (Short) Title Color:', 'ybd-blocks')}</strong>	</PanelRow>
					<PanelRow>

						<ColorPalette
							//colors={textColors}
							value={props.attributes.first_title_color}
							onChange={(color) => props.setAttributes({ first_title_color: color })}

						/>
					</PanelRow>

					<PanelRow><strong>{__('Main Title Color:', 'ybd-blocks')}</strong>	</PanelRow>
					<PanelRow>

						<ColorPalette
							//colors={textColors}
							value={props.attributes.main_title_color}
							onChange={(color) => props.setAttributes({ main_title_color: color })}

						/>
					</PanelRow>
					<PanelRow><strong>{__('Items Title Color:', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							//colors={textColors}
							value={props.attributes.item_title_color}
							onChange={(color) => props.setAttributes({ item_title_color: color })}


						/>
					</PanelRow>
					<PanelRow><strong>{__('Items Text Color:', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							//colors={textColors}
							value={props.attributes.item_text_color}
							onChange={(color) => props.setAttributes({ item_text_color: color })}

						/>
					</PanelRow>
					<PanelRow><strong>{__('Banner Background Color', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							//colors={textColors}
							value={props.attributes.trial_background_color}
							onChange={(color) => props.setAttributes({ trial_background_color: color })}

						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Text Sidebar Editor', 'ybd-blocks')} initialOpen={false}>
					<label><strong>{__('First Item Text:', 'ybd-blocks')}</strong></label>
					<PanelRow title="First Item" >

						<RichText
							tagName="p"
							value={props.attributes.first_item_text} // Any existing content, either from the database or an attribute default
							onChange={(value) => props.setAttributes({ first_item_text: value })}
							placeholder={__('First Item Text...', 'ybd-blocks')} // Display this text before any content has been added by the user
						/>


					</PanelRow>
					<label><strong>{__('Second Item Text:', 'ybd-blocks')}</strong></label>
					<PanelRow title="Second Item" >

						<RichText
							tagName="p"
							value={props.attributes.second_item_text} // Any existing content, either from the database or an attribute default
							onChange={(value) => props.setAttributes({ second_item_text: value })}
							placeholder={__('Second Item Text...', 'ybd-blocks')} // Display this text before any content has been added by the user
						/>

					</PanelRow>
					<label><strong>{__('Third Item Text:', 'ybd-blocks')}</strong></label>
					<PanelRow title="Third Item">

						<RichText
							tagName="p"
							value={props.attributes.third_item_text} // Any existing content, either from the database or an attribute default
							onChange={(value) => props.setAttributes({ third_item_text: value })}
							placeholder={__('Third Item Text...', 'ybd-blocks')} // Display this text before any content has been added by the user
						/>

					</PanelRow>
				</PanelBody>
			</InspectorControls>










			<section   {...blockProps}>

				<div className="section-container">
					<div className="left">
						<img src={props.attributes.imgURL} alt="Trials main iamge" />
					</div>
					<div className="right">
						<RichText
							style={{ color: props.attributes.first_title_color }}
							tagName="h4"
							value={props.attributes.first_title} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ first_title: value })}
							placeholder={__('First title...', 'ybd-blocks')} // Display this text before any content has been added by the user
						/>

						<RichText
							style={{ color: props.attributes.main_title_color }}
							tagName="h3"
							value={props.attributes.main_title} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ main_title: value })}
							placeholder={__('Main Title...')} // Display this text before any content has been added by the user
						/>

						<div className="toggle_tabs">

							<div>

								<RichText
									tagName="h4"
									style={{ color: props.attributes.item_title_color }}
									data-toggle="#div1"
									value={props.attributes.first_item_title} // Any existing content, either from the database or an attribute default
									className="second"
									onChange={(value) => props.setAttributes({ first_item_title: value })}
									placeholder={__('First Item Title...', 'ybd-blocks')} // Display this text before any content has been added by the user
								/>



								<div id="div1" className={`${props.attributes.toggle_class} toggle`}>
									<hr />
									<RichText
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.first_item_text} // Any existing content, either from the database or an attribute default
										onChange={(value) => props.setAttributes({ first_item_text: value })}
										placeholder={__('First Item Text...', 'ybd-blocks')} // Display this text before any content has been added by the user
									/>
									<hr />
								</div>

							</div>
							<div>

								<RichText
									style={{ color: props.attributes.item_title_color }}
									tagName="h4"
									data-toggle="#div3"
									value={props.attributes.second_item_title}
									className="second"
									onChange={(value) => props.setAttributes({ second_item_title: value })}
									placeholder={__('Second Item Title...', 'ybd-blocks')}
								/>

								<div className={`${props.attributes.toggle_class} toggle`} id="div2">
									<hr />
									<RichText
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.second_item_text}
										onChange={(value) => props.setAttributes({ second_item_text: value })}
										placeholder={__('Seconde Item Text...', 'ybd-blocks')}
									/>
									<hr />
								</div>
							</div>
							<div>

								<RichText
									style={{ color: props.attributes.item_title_color }}
									tagName="h4"
									data-toggle="#div3"
									value={props.attributes.third_item_title}
									className="second"
									onChange={(value) => props.setAttributes({ third_item_title: value })}
									placeholder={__('Third Item Title...', 'ybd-blocks')}
								/>

								<div className={`${props.attributes.toggle_class} toggle`} id="div3">
									<hr />
									<RichText
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.third_item_text}
										onChange={(value) => props.setAttributes({ third_item_text: value })}
										placeholder={__('Third Item Text...', 'ybd-blocks')}
									/>
									<hr />
								</div>
							</div>
						</div>

					</div>

				</div>



			</section>
		</>
	)
}



/* document.addEventListener('DOMContentLoaded', function () {

	jQuery(".section-third h4.second").on("click", function (e) {
		alert("clicked!");
		e.preventDefault();  // prevent navigating
		var selector = $(this).data("toggle");  // get corresponding element
		jQuery("div.toggle").hide("slow");
		jQuery(selector).show("slow");
	});
}, false); */

/* 
(function ($) {
	$(document).ready(function () {
		//toggling section 3 tabs:
		$(".section-third h4.second").on("click", function (e) {
			e.preventDefault();  // prevent navigating
			var selector = $(this).data("toggle");  // get corresponding element
			$("div.toggle").hide("slow");
			$(selector).show("slow");
		});

	});


})(jQuery); */