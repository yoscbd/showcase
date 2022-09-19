

import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from "@wordpress/block-editor"




export default function save(props) {

	const blockProps = useBlockProps.save({
		className: 'section-third',
		style: { height: "auto", background: props.attributes.trial_background_color }
	});

	return (
		<>


			<section   {...blockProps}>

				<div className="section-container">
					<div className="left">
						<img src={props.attributes.imgURL} alt="Trials main iamge" />
					</div>
					<div className="right">
						<RichText.Content
							style={{ color: props.attributes.first_title_color }}
							tagName="h4"
							value={props.attributes.first_title}
							placeholder={__('First Title...')}

						/>


						<RichText.Content
							style={{ color: props.attributes.main_title_color }}
							tagName="h3"
							value={props.attributes.main_title}
							placeholder={__('Main Title...')}
						/>
						<div className="toggle_tabs">

							<div>
								<RichText.Content
									style={{ color: props.attributes.item_title_color }}
									tagName="h4"
									data-toggle="#div1"
									value={props.attributes.first_item_title} // Any existing content, either from the database or an attribute default
									className="second"
									placeholder={__('First Item Title...')} // Display this text before any content has been added by the user
								/>
								<div id="div1" className="toggle">
									<hr />
									<RichText.Content
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.first_item_text} // Any existing content, either from the database or an attribute default

										placeholder={__('First Item Text...')} // Display this text before any content has been added by the user
									/>
									<hr />
								</div>

							</div>
							<div>

								<RichText.Content
									style={{ color: props.attributes.item_title_color }}
									tagName="h4"
									data-toggle="#div2"
									value={props.attributes.second_item_title}
									className="second"
									placeholder={__('Second Item Title...')}
								/>




								<div className="toggle" id="div2">
									<hr />
									<RichText.Content
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.second_item_text}

										placeholder={__('Seconde Item Text...')}
									/>
									<hr />
								</div>
							</div>
							<div>
								<RichText.Content
									style={{ color: props.attributes.item_title_color }}
									tagName="h4"
									data-toggle="#div3"
									value={props.attributes.third_item_title}
									className="second"
									placeholder={__('Third Item Title...')}
								/>
								<div className="toggle" id="div3">
									<hr />
									<RichText.Content
										style={{ color: props.attributes.item_text_color }}
										tagName="p"
										value={props.attributes.third_item_text}

										placeholder={__('Third Item Text...')}
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