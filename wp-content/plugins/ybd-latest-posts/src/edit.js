import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { format, dateI18n, __experimentalGetSettings } from '@wordpress/date';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, QueryControls, RangeControl, ColorPalette } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import React, { useState } from "react";
import Select from "react-select";
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

    const { numberOfPosts, numberOfColumns, displayFeaturedImage, order, orderBy, categories, itemsColor } =
        attributes;

    const catIDs =
        categories && categories.length > 0
            ? categories.map((cat) => cat.id)
            : [];
    const posts = useSelect(
        (select) => {
            return select('core').getEntityRecords('postType', 'post', {
                per_page: numberOfPosts,
                _embed: true, // ---- Important Note---- This key will allow us to include
                // the _embedded key with all image metadata such as sizes,
                // we must add it if we want to get the image metadata in the rest api
                order,
                orderby: orderBy,
                categories: catIDs,
            });
        },
        [numberOfPosts, order, orderBy, categories] // any change in the attributes listed here will triger the useSelect function
    );

    const allCats = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'category', {
            per_page: -1,
        });
    }, []); // when leaving this array empty we run the useSelect function only once when app is loading

    const catSuggestions = {};
    if (allCats) {
        for (let i = 0; i < allCats.length; i++) {
            const cat = allCats[i];
            catSuggestions[cat.name] = cat;
        }
    }

    const onDisplayFeaturedImageChange = (value) => {
        setAttributes({ displayFeaturedImage: value });
    };
    const onNumberOfItemsChange = (value) => {
        setAttributes({ numberOfPosts: value });
    };

    const onNumberOfColumnsChange = (value) => {
        setAttributes({ numberOfColumns: value });

        numberOfColumns > numberOfPosts ?
            wp.data.dispatch('core/notices').createNotice(
                'warning', // Can be one of: success, info, warning, error.
                'Number of items dosnt match numer of culomns, please increase number of item or decrease number of columns', // Text string to display.
                {
                    isDismissible: true, // Whether the user can dismiss the notice.


                }
            )
            : ''

    };

    const blockProps = useBlockProps({
        className: "columns-" + numberOfColumns,
        style: { height: "auto" }
    });

    const onCategoryChange = (values) => {
        const hasNoSuggestions = values.some(
            (value) => typeof value === 'string' && !catSuggestions[value]
        );
        if (hasNoSuggestions) return;

        const updatedCats = values.map((token) => {
            return typeof token === 'string' ? catSuggestions[token] : token;
        });

        setAttributes({ categories: updatedCats });
        //console.log("categories: ", updatedCats)



    };






    return (
        <>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        label={__('Display Featured Image OR Default Image', 'latest-posts')}
                        checked={displayFeaturedImage}
                        onChange={onDisplayFeaturedImageChange}
                    />
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
                        categorySuggestions={catSuggestions}
                        selectedCategories={categories}
                        onCategoryChange={onCategoryChange}
                    />

                    <RangeControl
                        label="Columns Number"
                        value={numberOfColumns}
                        onChange={onNumberOfColumnsChange}
                        min={1}
                        max={4}
                    />


                </PanelBody>
                <PanelBody title={__('Items Color', 'ybd-blocks')} initialOpen={true}>

                    <PanelRow>

                        <ColorPalette

                            value={itemsColor}
                            onChange={(color) => setAttributes({ itemsColor: color })}

                        />
                    </PanelRow>


                </PanelBody>
            </InspectorControls>
            <ul {...blockProps}>
                {posts &&
                    posts.map((post) => {
                        //when we will access the API to fetch all posts we will also fetch the _embedded that holds media metadata.
                        // wp.data.select('core').getEntityRecords("postType","post",{per_page: -1, _embed: true})
                        // here we assign the _embedded key to "featuredImage" variable so we can access it later:
                        const featuredImage =
                            post._embedded && //1.if this is true
                            post._embedded['wp:featuredmedia'] && //2.and if this is true
                            post._embedded['wp:featuredmedia'].length > 0 &&//3.and if this is true
                            post._embedded['wp:featuredmedia'][0];//4.Do this
                        return (
                            <>
                                <li style={{ color: itemsColor }} key={post.id} className={"columns-" + numberOfColumns} >


                                    {displayFeaturedImage && featuredImage ? (
                                        <img
                                            src={
                                                featuredImage.media_details.sizes.medium.source_url
                                            }
                                            alt={featuredImage.alt_text}
                                        />
                                    ) : (
                                        <img
                                            src="/wp-content/uploads/2022/09/default-post-feature-image.jpg"

                                            alt="default image"
                                        />
                                    )}

                                    {/* 
                                    {displayFeaturedImage && featuredImage && (
                                        <img
                                            src={
                                                featuredImage.media_details.sizes.full.source_url
                                            }
                                            alt={featuredImage.alt_text}
                                        />
                                    )} */}
                                    <h5>
                                        <a style={{ color: itemsColor }} href={post.link}>
                                            {post.title.rendered ? (

                                                post.title.rendered

                                            ) : (
                                                __('(No title)', 'latest-posts')
                                            )}
                                        </a>
                                    </h5>
                                    {post.date_gmt && (
                                        <time dateTime={format('c', post.date_gmt)}>
                                            {dateI18n(
                                                __experimentalGetSettings().formats
                                                    .date,
                                                post.date_gmt
                                            )}
                                        </time>
                                    )}
                                    {post.excerpt.rendered && ( // If post.excerpt.rendered exist do this:
                                        <div className="editor-ybd-li"><RawHTML style={{ color: itemsColor }}>{post.excerpt.rendered}</RawHTML></div>
                                    )}
                                </li>
                            </>
                        );
                    })}
            </ul>
        </>
    );
}
