
import './editor.scss';
import { __ } from '@wordpress/i18n';
import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import { ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import React from 'react';



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

	function handleImageSelect(image) {
		setAttributes({ imageId: image.id });
	}


	const imgButtonText = props.attributes.imgID ? "Change Image" : "Chose Image"


	const blockProps = useBlockProps({
		className: 'section-first',
		style: { height: "auto", background: props.attributes.banner_background_color }
	});

	const [ybdtest, setybdtest] = useState(false);
	//Custom colors support:

	const textColors = [
		{ name: 'Theme Brown', color: '#D3854C' },
		{ name: 'Theme white', color: '#fff' },
		{ name: 'Theme Blue', color: '#2a7de1' },
		{ name: 'Theme Black', color: '#000' },
	];

	return (

		<>



			<InspectorControls>
				<PanelBody title={__('Main Banner Image', 'ybd-blocks')} initialOpen={true} >
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}

								render={({ open }) => {
									return <Button onClick={open}>{imgButtonText}</Button>
								}}
							/>
						</MediaUploadCheck>

					</PanelRow>
					{props.attributes.imgURL &&
						<PanelRow>

							<img src={props.attributes.imgURL} alt="Main Banner Image" />
						</PanelRow>
					}
				</PanelBody>
				<PanelBody title="Text Color" initialOpen={ybdtest} open={ybdtest}>
					<PanelRow><strong>{__('Small Title Color:', 'ybd-blocks')}</strong>	</PanelRow>
					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_small_title_color}
							onChange={(color) => props.setAttributes({ banner_small_title_color: color })}

						/>
					</PanelRow>
					<PanelRow><strong>{__('Large title Color:', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_large_title_color}
							onChange={(color) => props.setAttributes({ banner_large_title_color: color })}


						/>
					</PanelRow>
					<PanelRow><strong>{__('Text Color:', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_text_color}
							onChange={(color) => props.setAttributes({ banner_text_color: color })}

						/>
					</PanelRow>
				</PanelBody>

				<PanelBody title={__('CTA Colors', 'ybd-blocks')} initialOpen={false}>
					<PanelRow><strong>{__('CTA Text Color:', 'ybd-blocks')}</strong>	</PanelRow>
					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_cta_text_color}
							onChange={(color) => props.setAttributes({ banner_cta_text_color: color })}


						/>
					</PanelRow>
					<PanelRow><strong>{__('CTA Background Color:', 'ybd-blocks')}</strong></PanelRow>
					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_cta_bg_color}
							onChange={(color) => props.setAttributes({ banner_cta_bg_color: color })}


						/>
					</PanelRow>

				</PanelBody>
				<PanelBody title={__('Banner Background Color', 'ybd-blocks')} initialOpen={false}>

					<PanelRow>

						<ColorPalette
							colors={textColors}
							value={props.attributes.banner_background_color}
							onChange={(color) => props.setAttributes({ banner_background_color: color })}

						/>
					</PanelRow>


				</PanelBody>
			</InspectorControls>
			<section   {...blockProps}>





				<div>
					<div className="banner-title">

						<RichText
							//className={`banner-main-title-color ${props.attributes.banner_small_title_color}`}
							style={{ color: props.attributes.banner_small_title_color }}
							tagName="h4"
							value={props.attributes.first_title} // Any existing content, either from the database or an attribute default
							allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							//onChange={(value) => props.setAttributes({ first_title: value })}
							//onChange={ybdtestfunction}
							onChange={value => { setybdtest(true); props.setAttributes({ first_title: value }) }}
							placeholder={__('first heading...')} // Display this text before any content has been added by the user
						/>


					</div>
				</div>
				<div>
					<div className="banner-main-section">
						<div className="left">

							<RichText
								style={{ color: props.attributes.banner_large_title_color }}
								tagName="h3"
								value={props.attributes.main_title} // Any existing content, either from the database or an attribute default
								allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options

								onChange={value => { setybdtest(true); props.setAttributes({ main_title: value }) }}
								placeholder={__('main title...')} // Display this text before any content has been added by the user
							/>

							<RichText
								style={{ color: props.attributes.banner_text_color }}
								tagName="p"
								value={props.attributes.main_text} // Any existing content, either from the database or an attribute default
								allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={value => { setybdtest(true); props.setAttributes({ main_text: value }) }}
								placeholder={__('main text...')} // Display this text before any content has been added by the user
							/>
						</div>
						<div className="right">

							<img src={props.attributes.imgURL} alt="Main Banner Image" />

						</div>
					</div>
				</div>
				<div>
					<div className="banner-cta">

						<RichText
							style={{ color: props.attributes.banner_cta_text_color, background: props.attributes.banner_cta_bg_color }}
							tagName="button"
							value={props.attributes.btn_text} // Any existing content, either from the database or an attribute default
							allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ btn_text: value })}
							placeholder={__('btn text...')} // Display this text before any content has been added by the user
						/>

					</div>
				</div>
			</section>
		</>
	)
}
