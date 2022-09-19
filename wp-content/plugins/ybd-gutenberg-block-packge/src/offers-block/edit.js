import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
const textColors = [
	{ name: 'Theme Brown', color: '#D3854C' },
	{ name: 'Theme white', color: '#fff' },
	{ name: 'Theme Blue', color: '#2a7de1' },
	{ name: 'Theme Black', color: '#000' },
];
import { ColorPalette, Button, PanelBody, PanelRow } from '@wordpress/components';
import './editor.scss';


export default function Edit(props) {


	const blockProps = useBlockProps({
		className: 'section-second',
		style: { height: "auto", background: props.attributes.offers_background_color }
	});



	return (
		<>



			<InspectorControls>

				<PanelBody title={__('Offers Colors Style', 'ybd-blocks')} initialOpen={true} >
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
							value={props.attributes.offers_background_color}
							onChange={(color) => props.setAttributes({ offers_background_color: color })}

						/>
					</PanelRow>
				</PanelBody>





			</InspectorControls>


			<section {...blockProps}>




				<div className="grid-container">
					<div className="item item1">

						{/* 
main_title_color
item_title_color
item_text_color */}

						<RichText
							style={{ color: props.attributes.main_title_color }}
							tagName="h3"
							value={props.attributes.main_text} // Any existing content, either from the database or an attribute default
							//allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={(value) => props.setAttributes({ main_text: value })}
							placeholder={__('Main Title...')} // Display this text before any content has been added by the user
						/>



					</div>
					<div className="item item2">


						<RichText
							style={{ color: props.attributes.item_title_color }}
							tagName="h4"
							value={props.attributes.item_1_title}
							//allowedFormats={['core/bold', 'core/italic']} 
							onChange={(value) => props.setAttributes({ item_1_title: value })}
							placeholder={__('First Item Title...')}
						/>


						<RichText
							style={{ color: props.attributes.item_text_color }}
							tagName="p"
							value={props.attributes.item_1_text}
							//allowedFormats={['core/bold', 'core/italic']} 
							onChange={(value) => props.setAttributes({ item_1_text: value })}
							placeholder={__('First Item Text...')}
						/>

					</div>
					<div className="item item3">

						<RichText
							style={{ color: props.attributes.item_title_color }}
							tagName="h4"
							value={props.attributes.item_2_title}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_2_title: value })}
							placeholder={__('Second Item Title...')}
						/>



						<RichText
							style={{ color: props.attributes.item_text_color }}
							tagName="p"
							value={props.attributes.item_2_text}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_2_text: value })}
							placeholder={__('Second Item Text...')}
						/>
					</div>
					<div className="item item4">
						<RichText
							style={{ color: props.attributes.item_title_color }}
							tagName="h4"
							value={props.attributes.item_3_title}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_3_title: value })}
							placeholder={__('Third Item Title...')}
						/>


						<RichText
							tagName="p"
							style={{ color: props.attributes.item_text_color }}
							value={props.attributes.item_3_text}
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => props.setAttributes({ item_3_text: value })}
							placeholder={__('Third Item Text...')}
						/>

					</div>


				</div>
			</section>
		</>

	);
}
