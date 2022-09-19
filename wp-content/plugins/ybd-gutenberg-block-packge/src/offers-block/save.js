import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from "@wordpress/block-editor"
export default function save(props) {


	const blockProps = useBlockProps.save({
		className: 'section-second',
		style: { height: "auto", background: props.attributes.offers_background_color }
	});


	return (

		<>

			<section {...blockProps}>
				<div className="grid-container">
					<div className="item item1">
						<RichText.Content
							style={{ color: props.attributes.main_title_color }}

							tagName="h3"
							value={props.attributes.main_text}
							placeholder={__('Main Title...')}
						/>
					</div>

					<div className="item item2">
						<RichText.Content
							style={{ color: props.attributes.item_title_color }}
							tagName="h4"
							value={props.attributes.item_1_title}
							placeholder={__('First Item Title...')}
						/>

						<RichText.Content
							style={{ color: props.attributes.item_text_color }}
							tagName="p"
							value={props.attributes.item_1_text}
							placeholder={__('First Item Title...')}
						/>

					</div>
					<div className="item item3">
						<RichText.Content
							style={{ color: props.attributes.item_title_color }}

							tagName="h4"
							value={props.attributes.item_2_title}
							placeholder={__('Second Item Title...')}
						/>
						<RichText.Content
							style={{ color: props.attributes.item_text_color }}
							tagName="p"
							value={props.attributes.item_2_text}
							placeholder={__('Second Item Title...')}
						/>
					</div>
					<div className="item item4">
						<RichText.Content
							style={{ color: props.attributes.item_title_color }}
							tagName="h4"
							value={props.attributes.item_3_title}
							placeholder={__('Third Item Title...')}
						/>
						<RichText.Content
							style={{ color: props.attributes.item_text_color }}
							tagName="p"
							value={props.attributes.item_3_text}
							placeholder={__('Third Item Title...')}
						/>
					</div>

				</div>
			</section>
		</>






	);
}
