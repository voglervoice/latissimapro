<?php
/**
 * \file geoloc.class.php
 * \brief Nespresso Geoloc Tools
 * \author Alexandre De Dommelin <alexandre.dedommelin@nespresso.com>
 * \version 1.0
 * \date 28/10/2010
 */


/**
* \class NesGeoLoc
* \brief Provides function to access visitor's geoloc infos
*/
class NesGeoLoc {
  private $allowGeolocOverride = true;
  private $_geoloc = array( 'country_code' => 'CH',
    'city' => 'LAUSANNE',
    'lat' => '46.53',
    'long' => '6.67',
    'continent' => 'EU',
    'timezone' => 'GMT+1'
  );

  /*!
  *  \brief Constructor
  *  Parses geographical informations provided by Akamai in HTTP Headers
  *  In case of detection failure falls back to 'CH-default' country code
  */
  public function __construct() {
    if ( array_key_exists('HTTP_X_AKAMAI_EDGESCAPE',$_SERVER) ) {
      $headers = explode(',',$_SERVER['HTTP_X_AKAMAI_EDGESCAPE']);

      foreach ( $headers as $v ) {
        list($key,$value) = explode( '=', $v );
        $this->_geoloc[ $key ] = $value;
      }
    }
  }



  /*!
  *  \brief Function used to retrieve visitor's country code
  *  \return Visitor's Country Code
  */
  public function getCountryCode() {
    return $this->_geoloc['country_code'];
  }

  /*!
  *  \brief Function used to retrieve visitor's city
  *  \return Visitor's City
  */
  public function getCity() {
    return $this->_geoloc['city'];
  }

  /*!
  *  \brief Function used to retrieve visitor's latitude
  *  \return Visitor's Latitude
  */
  public function getLatitude() {
    return $this->_geoloc['lat'];
  }

  /*!
  *  \brief Function used to retrieve visitor's longitude
  *  \return Visitor's Longitude
  */
  public function getLongitude() {
    return $this->_geoloc['long'];
  }

  /*!
  *  \brief Function used to retrieve visitor's continent
  *  \return Visitor's Continent
  */
  public function getContinent() {
    return $this->_geoloc['continent'];
  }

  /*!
  *  \brief Function used to retrieve visitor's timezone
  *  \return Visitor's Timezone
  */
  public function getTimezone() {
    return $this->_geoloc['timezone'];
  }

  /*!
  *  \brief Function used to force country code (!!! works only on staging environment !!!)
  *  \param $code The country code you want to force
  */
  public function setCountryCode($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['country_code'] = "$code";
  }

  /*!
  *  \brief Function used to force city (!!! works only on staging environment !!!)
  *  \param $code The city you want to force
  */
  public function setCity($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['city'] = "$code";
  }

  /*!
  *  \brief Function used to force latitude (!!! works only on staging environment !!!)
  *  \param $code The latitude you want to force
  */
  public function setLatitude($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['lat'] = "$code";
  }

  /*!
  *  \brief Function used to force longitude (!!! works only on staging environment !!!)
  *  \param $code The longitude you want to force
  */
  public function setLongitude($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['long'] = "$code";
  }

  /*!
  *  \brief Function used to force continent (!!! works only on staging environment !!!)
  *  \param $code The continent you want to force
  */
  public function setContinent($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['continent'] = "$code";
  }

  /*!
  *  \brief Function used to force timezone (!!! works only on staging environment !!!)
  *  \param $code The timezone you want to force
  */
  public function setTimezone($code) {
    if ( $this->allowGeolocOverride )
      $this->_geoloc['timezone'] = "$code";
  }
}




/**
* \class NesGeoBlocking
* \brief Extends NesGeoLoc to provide GeoBlocking features
*/
class NesGeoBlocking extends NesGeoLoc {
  private $_allowed_countries = array();
  private $_auto_redirect = false;
  private $_target_redirect = 'http://www.nespresso.com/';


  /*!
  *  \brief Function used to specify countries allowed to access the website
  *  \param $allowed Array containing allowed countries
  */
  public function setAllowedCountries($allowed) {
    if ( !is_array($allowed) )
      $allowed = array();

    foreach ( $allowed as $v ) {
      $this->_allowed_countries[] = strtoupper($v);
    }
  }

  /*!
  *  \brief Function to activate auto-redirect to another location if the visitor
  *  does not come from an allowed country (redirects to http://www.nespresso.com by default)
  *  \param $auto Boolean to enable/disable autoRedirect
  *  \param $target Redirect URL
  */
  public function autoRedirect($auto,$target="") {
    if ( $auto )
      $this->_auto_redirect = true;

    if ( $target != "" )
      $this->_target_redirect = $target;

    if ( $this->_auto_redirect && !$this->isAllowedVisitor() )
      header('Location: '.$this->_target_redirect);
  }

  /*!
  *  \brief Function to detect if visitor is coming from an allowed country.
  *  \return Boolean true if allowed, false otherwise
  */
  public function isAllowedVisitor() {
    if ( in_array( parent::getCountryCode(), $this->_allowed_countries ) ) {
      return true;
    } else {
      return false;
    }
  }
}
?>
