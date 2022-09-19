
import { useState } from 'react';
import "./index.scss"
//import "./weather.scss"

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from "@wordpress/block-editor"
import { __ } from '@wordpress/i18n'; // add localozation support


registerBlockType("ourplugin/weather-api-block", {

  edit: function (props) {

    const blockProps = useBlockProps({
      className: "weather-block-api",
      style: {
        position: "relative", backgroundColor: props.attributes.backgroundColor, background: props.attributes.backgroundColor, color: props.attributes.textColor
      }
    })



    function updateSkyColor(event) {
      props.setAttributes({ skyColor: event.target.value })
    }

    function updateGrassColor(event) {
      props.setAttributes({ grassColor: event.target.value })
    }

    function countrySelect() {
      alert("countrySelect()");
    }

    const country_options = [
      { value: 'none', text: '--Choose an option--' },
      { value: 'tel-aviv,il', text: 'Tel Aviv 🌵' },
      { value: 'london,uk', text: 'London 🌉' },
      { value: 'paris,fr', text: __('Paris 🥐') }, //note we are should use __() localization function for the text value in paris.
    ];


    // Initioalize the value for our "selected" variable state.
    // we simply assign an initial value for the "selected" variable so when our app loads and render this will be its value.
    const [selected, setSelected] = useState(country_options[0].value);



    const handleChange = event => {
      // " const handleChange = event =>" is the same as: "const handleChange = function(event){}"

      setSelected(event.target.value); // update our state /variable nammed "selected" with the new selected value
      props.setAttributes({ selectedCountry: event.target.value }) // update the selected value for the selectedCountry

      //see this leture regarding useState:
      // https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/17039436#overview
    };



    function getCurrentReport() {
      let ourRequestData = {
        action: "weather_api",
        selectedlocation: props.attributes.selectedCountry,
        nonce: weather_script_vars.nonce
      }
      jQuery.ajax({
        /*
        /* if it was a jason datatype request we whould have use ' beforeSend: xhr'
          beforeSend: xhr => {
             xhr.setRequestHeader("X-WP-Nonce", weather_script_vars.nonce)
         }, */
        url: weather_script_vars.ajax_url,
        type: "POST",
        // dataType: 'json',
        data: ourRequestData,
        success: response => {
          console.log(response);
          jQuery(".weather").hide('slow', function () {
            jQuery(".weather").html('');
            jQuery(".weather").show('slow');
            jQuery(".weather").html(response);
          });

        },
        error: response => {
          console.log("Sorry")
          console.log(response)
        }
      })


    }

    () => {
      getCurrentReport()
    }


    return (
      <div  {...blockProps} >
        {/* // we will ,map all select options for countries array  */}
        {/* selected={props.attributes.selectedCountry == option.value} if return true, the option will be selected  */}
        <div>
          <h5 style={{ textAlign: "center" }}> {__("Select Forcast Country:")}</h5>
          <div class="weather-control">

            <select onChange={handleChange}>
              {country_options.map(option => (
                <option key={option.value} value={option.value} selected={props.attributes.selectedCountry == option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <button onClick={() => { getCurrentReport() }} id="weather-cta">Update Forcast</button>
          </div>
        </div>

        <div>

        </div>


        <hr
          style={{
            color: "#222",
            backgroundColor: "#222",
            height: "2px",
            width: "100%"
          }}
        />
        <div class="weather"></div>

      </div>
    )
  },
  save: function (props) {
    return null
  },
  getEditWrapperProps() {
    return {
      'data-align': 'full',
    };
  }
})
