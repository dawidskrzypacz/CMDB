import GeoJSON from 'geojson';
import {
    BackgroundLayout,
    BackgroundPaint,
    CircleLayout,
    CirclePaint,
    FillExtrusionLayout,
    FillExtrusionPaint,
    FillLayout,
    FillPaint,
    HeatmapLayout,
    HeatmapPaint,
    HillshadeLayout,
    HillshadePaint,
    LineLayout,
    LinePaint,
    RasterLayout,
    RasterPaint,
    SymbolLayout,
    SymbolPaint,
    Layout as LayoutType
} from "mapbox-gl";

export = tt;
export as namespace tt;

declare namespace tt {
    /**
     * Map (and some other classes) emit events in response to user interactions or changes in state.
     * Evented is the interface used to bind and unbind listeners for these events.
     */
    class Evented {
        constructor();
        /**
         * Removes a previously registered event listener.
         * @param type The event type to remove listeners.
         * @param listener The listener function to remove.
         * @returns this
         */
        off(type: string, listener: Listener): this;
        /**
         * Adds a listener to a specified event type.
         * @param type The event type to add a listen for.
         * @param listener The function to be called when the event is fired. The listener function is called
         * with the data object passed to fire, extended with the target and type properties.
         * @returns this
         */
        on(type: string, listener: Listener): this;
        /**
         * Adds a listener that will be called only once to a specified event type.
         * The listener will be called the first time the event fires after the listener is registered.
         * @param type The event type to listen for.
         * @param listener The function to be called when the event is fired the first time.
         * @returns this
         */
        once(type: string, listener: Listener): this;
    }
    /**
     * A FullscreenControl control contains a button for toggling the map in and out of fullscreen mode.
     * @param options Object with options
     * @param options.container container is the compatible DOM element which should be made full screen.
     * By default, the map container element will be made full screen.
     */
    class FullscreenControl  {
        constructor(options?: {container? : HTMLElement|null});
    }

    /**
     * @extends tt.Evented
     * A GeolocateControl control provides a button that uses the browser's geolocation API
     * to locate the user on the map.
     *
     * Not all browsers support geolocation, and some users may disable the feature. Geolocation support
     * for modern browsers including Chrome requires sites to be served over HTTPS. If geolocation support is
     * not available, the GeolocateControl will not be visible.
     *
     * The zoom level applied will depend on the accuracy of the geolocation provided by the device.
     *
     * The GeolocateControl has two modes. If trackUserLocation is false (default) the control acts
     * as a button, which when pressed will set the map's camera to target the user location. If the user
     * moves, the map won't update. This is most suited for the desktop. If trackUserLocation is true, the control acts
     * as a toggle button that when active the user's location is actively monitored for changes. In this
     *  mode the GeolocateControl has three states:
     * * active - the map's camera automatically updates as the user's location changes, keeping the location
     * dot in the center.
     * * passive - the user's location dot automatically updates, but the map's camera does not.
     * * disabled
     * @param options Object with options
     * @param options.positionOptions A Geolocation API PositionOptions
     * object.
     * @param options.fitBoundsOptions A fitBounds options object to use when the map is
     * panned and zoomed to the user's location. The default is to use a  maxZoom of 15 to limit how far the map will
     * zoom in for very accurate locations.
     * @param options.trackUserLocation If true the Geolocate Control becomes a toggle button
     * and when active the map will receive updates to the user's location as it changes.
     * @param options.showAccuracyCircle By default, if showUserLocation is true, a transparent circle
     * will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set
     * to false to disable. Always disabled when showUserLocation is false.
     * @param options.showUserLocation By default a dot will be shown on the map at the user's
     * location. Set to false to disable.
     */
    class GeolocateControl extends Evented {
        constructor(options?: {
            positionOptions?: {
                enableHighAccuracy?: boolean,
                timeout?: number,
                maximumAge?: number
            },
            fitBoundsOptions?: FitBoundsOptions | AnimationOptions | CameraOptions,
            trackUserLocation?: boolean,
            showAccuracyCircle?: boolean,
            showUserLocation?: boolean
        });
        /**
         * Trigger a geolocation
         * @returns Returns false if called before control was added to a map, otherwise returns true.
         */
        trigger(): boolean;
    }
    type LngLatLike = tt.LngLat | [number, number] | { lng: number, lat: number };
    /**
     * A LngLat object represents a given longitude and latitude coordinate, measured in degrees.
     * This SDK uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
     * Note that any SDK method that accepts a LngLat object as an argument or option can also accept an
     * array of two numbers and will perform an implicit conversion. This flexible type can be used like this:
     * * `var v1 = new tt.LngLat(-122.420679, 37.772537);`
     * * `var v2 = [-122.420679, 37.772537];`
     * * `var v3 = {lon: -122.420679, lat: 37.772537};`
     * @param lng Longitude, measured in degrees.
     * @param lat Latitude, measured in degrees.
     */
    class LngLat {
        constructor(lng: number, lat: number);

        lng: number;
        lat: number;
        /**
         * Returns the coordinates represented as an array of two numbers.
         * @returns The coordinates represeted as an array of longitude and latitude.
         */
        toArray(): number[];
        /**
         * Returns a LngLatBounds from the coordinates extended by a given radius.
         * @param radius Distance in meters from the coordinates to extend the bounds.
         * @returns A new LngLatBounds object representing the coordinates
         * extended by the  radius.
         */
        toBounds(radius: number): tt.LngLatBounds;
        /**
         * Returns the coordinates represent as a string.
         * @returns The coordinates represented as a string of the format 'LngLat(lng, lat)'.
         */
        toString(): string;
        /**
         * Returns a new LngLat object whose longitude is wrapped to the range (-180, 180).
         * @returns The wrapped LngLat object.
         */
        wrap(): tt.LngLat;
        /**
         * Returns the approximate distance between a pair of coordinates in meters by using the Haversine Formula.
         * @param {Maps.LngLat} lngLat Coordinates to compute the distance to
         * @returns {Number} Approximate distance between a pair of coordinates in meters
         */
        distanceTo(lngLat: tt.LngLat): number;
        /**
         * Converts an array of two numbers or an object with lng and lat or lon and lat properties to a LngLat object.
         * If a LngLat object is passed in, the function returns it unchanged.
         * @static
         * @param input An array of two numbers or object to convert, or a  LngLat object to return.
         * @returns A new LngLat object, if a conversion occurred, or the original LngLat object.
         */
        static convert(input: tt.LngLatLike): tt.LngLat;
    }
    type LngLatBoundsLike = tt.LngLatBounds | [tt.LngLatLike, tt.LngLatLike] | [number, number, number, number];
    /**
     * A LngLatBounds object represents a geographical bounding box, defined by its southwest and
     * northeast points in longitude and latitude.
     * If no arguments are provided to the constructor, a null bounding box is created.
     * Note that any SDK method that accepts a LngLatBounds object as an argument or option can also accept an
     * Array of two LngLatLike constructs and will perform an implicit conversion. This flexible type can be used like this:
     * * `var v1 = new tt.LngLatBounds(
     *  new tt.LngLat(-73.9876, 40.7661),
     *  new tt.LngLat(-73.9397, 40.8002)
     * );`
     * * `var v2 = new tt.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002])`
     * * `var v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];`
     * @param sw The southwest corner of the bounding box.
     * @param ne The northeast corner of the bounding box.
     */
    class LngLatBounds {
        constructor(sw?: tt.LngLatLike, ne?: tt.LngLatLike);
        /**
         * Check if the point is within the bounding box.
         * @param lngLat Geographic point to check against.
         * @returns True if the point is within the bounding box.
         */
        contains(lngLat: tt.LngLatLike): boolean;
        /**
         * Extend the bounds to include a given LngLat or LngLatBounds.
         * @param obj object to extend to
         * @returns This
         */
        extend(obj: tt.LngLatLike|tt.LngLatBoundsLike): this;
        /**
         * Returns the geographical coordinate equidistant from the bounding box's corners.
         * @returns The bounding box's center.
         */
        getCenter(): tt.LngLat;
        /**
         * Returns the east edge of the bounding box.
         * @returns The east edge of the bounding box.
         */
        getEast(): number;
        /**
         * Returns the north edge of the bounding box.
         * @returns The north edge of the bounding box.
         */
        getNorth(): number;
        /**
         * Returns the northeast corner of the bounding box.
         * @returns The northeast corner of the bounding box.
         */
        getNorthEast(): tt.LngLat;
        /**
         * Returns the northwest corner of the bounding box.
         * @returns The northwest corner of the bounding box.
         */
        getNorthWest(): tt.LngLat;
        /**
         * Returns the south edge of the bounding box.
         * @returns The south edge of the bounding box.
         */
        getSouth(): number;
        /**
         * Returns the southeast corner of the bounding box.
         * @returns The southeast corner of the bounding box.
         */
        getSouthEast(): tt.LngLat;
        /**
         * Returns the southwest corner of the bounding box.
         * @returns The southwest corner of the bounding box.
         */
        getSouthWest(): tt.LngLat;
        /**
         * Returns the west edge of the bounding box.
         * @returns The west edge of the bounding box.
         */
        getWest(): number;
        /**
         * Check if the bounding box is an empty/null-type box.
         * @returns True if bounds have been defined, otherwise false.
         */
        isEmpty(): boolean;
        /**
         * Set the northeast corner of the bounding box
         * @param ne
         * @returns this
         */
        setNorthEast(ne: tt.LngLatLike): this;
        /**
         * Set the southwest corner of the bounding box
         * @param sw
         * @returns this
         */
        setSouthWest(sw: tt.LngLatLike): this;
        /**
         * Returns the bounding box represented as an array.
         * @returns The bounding box represented as an array, consisting of the southwest and
         * northeast coordinates of the bounding represented as arrays of numbers.
         */
        toArray(): number[][];
        /**
         * Return the bounding box represented as a string.
         * @returns The bounding box represents as a string of the format
         * 'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'.
         */
        toString(): string;
        /**
         * Converts an array to a LngLatBounds object.
         * If a LngLatBounds object is passed in, the function returns it unchanged.
         * Internally, the function calls LngLat.convert to convert arrays to LngLat values.
         * @static
         * @param input An array of two coordinates to convert, or a  LngLatBounds object to return.
         * @returns A new LngLatBounds object, if a conversion occurred, or the original
         * LngLatBounds object.
         */
        static convert(input: tt.LngLatBoundsLike): tt.LngLatBounds;
    }
    /**
     * Creates a marker component
     * @extends Evented
     * @param options Object with options or HTMLElement
     * @param options.element DOM element to use as a marker.
     * @param options.anchor A string indicating the part of the Marker that should be positioned
     * closest to the coordinate set via Marker.setLngLat . Options are 'center', 'top', 'bottom', 'left',
     * 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right' .
     * @param options.offset The offset in pixels as a Point object to apply relative to the
     * element's center. Negatives indicate left and up.
     * @param options.rotation The rotation angle of the marker in degrees, relative to its respective
     * `rotationAlignment` setting. A positive value will rotate the marker clockwise.
     * @param options.pitchAlignment `map` aligns the Marker to the plane of the map. `viewport` aligns
     * the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`.
     * @param options.rotationAlignment `map` aligns the Marker's rotation relative to the map,
     * maintaining a bearing as the map rotates. `viewport` aligns the Marker's rotation relative to the viewport,
     * agnostic to map rotations. `auto` is equivalent to `viewport`.
     * @param options.color The color to use for the default marker if options.element is not
     * provided.
     * @param options.width The width of the default marker if options.element is not
     * provided.
     * @param options.height The height of the default marker if options.element is not
     * provided.
     * @param options.draggable A boolean indicating whether or not a marker is able to be dragged to a
     * new position on the map.
     * @param options.clickTolerance The max number of pixels a user can shift the mouse pointer during
     * a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to
     * inherit map's clickTolerance.
     */
    class Marker extends tt.Evented {
        constructor(options?: {
            element?: HTMLElement,
            anchor?: string,
            offset?: tt.PointLike,
            rotation?: number,
            pitchAlignment?: string,
            rotationAlignment?: string,
            color?: string,
            width?: string,
            height?: string,
            draggable?: boolean,
            clickTolerance?: number
        }|HTMLElement);
        /**
         * Attaches the marker to a map
         * @param map Instance of a map
         * @returns this
         */
        addTo(map: tt.Map): this;
        /**
         * Removes the marker from a map
         * @returns this
         */
        remove(): this;
        /**
         * Get the marker's geographical location.
         * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously set by
         * setLngLat because Marker wraps the anchor longitude across copies of the world to keep the marker on screen.
         * @returns marker's geographical location
         */
        getLngLat(): tt.LngLat;
        /**
         * Set the marker's geographical position and move it.
         * @param lnglat
         * @returns this
         */
        setLngLat(lnglat: tt.LngLatLike): this;
        /**
         * Returns the Marker's HTML element.
         * @returns element
         */
        getElement(): HTMLElement
        /**
         * Binds a Popup to the Marker
         * @param popup an instance of the  Popup class. If undefined or null,
         * any popup set on this  Marker instance is unset
         * @returns this
         */
        setPopup(popup: tt.Popup): this;
        /**
         * Returns the Popup instance that is bound to the Marker
         * @returns popup
         */
        getPopup(): tt.Popup;
        /**
         * Opens or closes the bound popup, depending on the current state
         * @returns this
         */
        togglePopup(): this;
        /**
         * Get the marker's offset.
         * @returns marker's offset
         */
        getOffset(): tt.Point;
        /**
         * Sets the offset of the marker
         * @param offset The offset in pixels as a Point object to apply relative
         * to the element's center. Negatives indicate left and up.
         * @returns this
         */
        setOffset(offset: tt.PointLike): this;
        /**
         * Sets the draggable property and functionality of the marker
         * @param shouldBeDraggableTurns drag functionality on/off
         * @returns this
         */
        setDraggable(shouldBeDraggable: boolean): this;
        /**
         * Returns true if the marker can be dragged
         */
        isDraggable(): boolean;
    }
    /**
     * A MercatorCoordinate object represents a projected three dimensional position.
     * MercatorCoordinate uses the web mercator projection
     * (EPSG:3857) with slightly different units:
     * the size of 1 unit is the width of the projected world instead of the "mercator meter"
     * the origin of the coordinate space is at the north-west corner instead of the middle
     * For example, MercatorCoordinate(0, 0, 0) is the north-west corner of the mercator world and
     * MercatorCoordinate(1, 1, 0) is the south-east corner. If you are familiar with vector tiles it may be
     * helpful to think of the coordinate space as the 0/0/0 tile with an extent of 1.
     * The z dimension of MercatorCoordinate is conformal. A cube in the mercator coordinate space would be
     * rendered as a cube.
     * @param x The x component of the position.
     * @param y The y component of the position.
     * @param z The z component of the position.
     */
    class MercatorCoordinate {
        constructor(x: number, y: number, z: number);
        /**
         * Returns the altitude in meters of the coordinate.
         * @returns The altitude in meters.
         */
        toAltitude(): number;
        /**
         * Returns the LngLat for the coordinate.
         * @returns The LngLat object
         */
        toLngLat(): tt.LngLat;
        /**
         * Project a LngLat to a MercatorCoordinate.
         * @static
         * @param lngLat The location to project.
         * @param altitude The altitude in meters of the position.
         * @returns The projected mercator coordinate.
         */
        static fromLngLat(lngLat: tt.LngLat, altitude: number): tt.MercatorCoordinate;
    }
    /**
     * A NavigationControl control contains zoom buttons and a compass.
     * @param options Object with options
     * @param options.showZoom If true the zoom-in and zoom-out buttons are included.
     * @param options.showCompass If true the compass button is included.
     * @param options.showExtendedRotationControls If true the rotation buttons are included.
     * @param options.rotationStep The number of degrees the map rotates per click
     * @param options.showPitch If true the pitch button is included.
     * @param options.showExtendedPitchControls If true the rotation buttons are included.
     * @param options.pitchStep The number of degrees the map tilts per click
     */
    class NavigationControl {
        constructor(options?: {
            showZoom?: boolean,
            showCompass?: boolean,
            showExtendedRotationControls?: boolean,
            rotationStep?: number,
            showPitch?: boolean,
            showExtendedPitchControls?: boolean,
            pitchStep?: number
        });
    }
    type PointLike = Point | [number, number]
    /**
     * An object, which has x and y properties representing screen coordinates in pixels. Alternatively,
     * you define a point using an array of two numbers representing x and y screen coordinates in pixels.
     */
    type Point = {
        x: number,
        y: number
    }
    /**
     * Creates a popup component
     * @extends Evented
     * @param options Object with options
     * @param options.closeButton If true, a close button will appear in the top right corner
     * of the popup.
     * @param options.closeOnClick If  true, the popup will closed when the map is clicked.
     * of the popup.
     * @param options.closeOnMove If true, the popup will closed when the map moves.
     * @param options.anchor A string indicating the part of the Popup that should be positioned
     * closest to the coordinate set via Popup#setLngLat . Options are 'center', 'top', 'bottom','left',
     * 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. If unset the anchor will be dynamically
     * set to ensure the popup falls within the map container with a preference for 'bottom' .
     * of the popup.
     * @param options.offset A pixel offset applied to the popup's location specified as:
     * * a single number specifying a distance from the popup's location
     * * a Point specifying a constant offset
     * * an object of Points specifing an offset for each anchor position Negative offsets indicate left and up.
     * @param options.className Space-separated CSS class names to add to popup container
     * @param options.maxWidth A string that sets the CSS property of the popup's maximum width, eg '300px'.
     * To ensure the popup resizes to fit its content, set this property to 'none'. Available values can be found here:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/max-width.
     */
    class Popup extends tt.Evented {
        constructor(options?: {
            closeButton?: boolean,
            closeOnClick?: boolean,
            closeOnMove?: boolean,
            anchor?: string,
            offset?: number|tt.PointLike|{ [key: string]: tt.PointLike },
            className?: string,
            maxWidth?: string
        });
        /**
         * Adds a CSS class to the popup container element. In order to use this method, the popup must be
         * added first to the map or marker, and have coordinates set. If used before, it will have no effect.
         * @param className Non-empty string with CSS class name to add to popup container.
         */
        addClassName(className: string): void;
        /**
         * Attaches the popup to a map
         * @param map Instance of a map
         * @returns this
         */
        addTo(map: tt.Map): this;
        /**
         * Returns the geographical location of the popup's anchor.*
         * The longitude of the result may differ by a multiple of 360 degrees from the longitude
         * previously set by setLngLat because Popup wraps the anchor longitude across copies of the
         * world to keep the popup on screen.
         * @returns The geographical location of the popup's anchor.
         */
        getLngLat(): tt.LngLat;
        /**
         * @returns true if the popup is open, false if it is closed.
         */
        isOpen(): boolean;
        /**
         * Removes the popup from a map
         * @returns this
         */
        remove(): this;
        /**
         * Removes a CSS class from the popup container element. In order to use this method, the popup must be
         * added first to the map or marker, and have coordinates set. If used before, it will have no effect.
         * @param className Non-empty string with CSS class name to remove from popup container.
         */
        removeClassName(className: string): void;
        /**
         * Sets the popup's content to the element provided as a DOM node.
         * @param htmlNode A DOM node to be used as content for the popup.
         * @returns this
         */
        setDOMContent(htmlNode: Node): this;
        /**
         * Sets the popup's maximum width. This is setting the CSS property `max-width`.
         * @param maxWidth A string representing the value for the maximum width.
         * @returns this
         */
        setMaxWidth(maxWidth: string): this;
        /**
         * Sets the popup's offset.
         * @param offset Sets the popup's offset.
         * @returns this
         */
        setOffset(offset: number|tt.PointLike|{ [key: string]: tt.PointLike }): this;
        /**
         * Sets the popup's content to the HTML provided as a string. This method does not perform HTML filtering or
         * sanitization, and must be used only with trusted content. Consider Popup.setText if the content is an
         * untrusted text string.
         * @param html A string representing HTML content for the popup.
         * @returns this
         */
        setHTML(html: string): this;
        /**
         * Sets the geographical location of the popup's anchor, and moves the popup to it.
         * @param lnglat The geographical location to set as the popup's anchor.
         * @returns this
         */
        setLngLat(lnglat: tt.LngLat): this;
        /**
         * Sets the popup's content to a string of text.This function creates a Text node in the DOM, so it cannot
         * insert raw HTML. Use this method for security against XSS if the popup content is user-provided.
         * @param text Textual content for the popup.
         * @returns this
         */
        setText(text: string): this;
        /**
         * Add or remove the given CSS class on the popup container, depending on whether the container
         * currently has that class. In order to use this method, the popup must be added first to the map
         * or marker, and have coordinates set. If used before, it will have no effect.
         * @param className Non-empty string with CSS class name to add/remove.
         * @returns if the class was removed return false, if class was added, then return true.
         */
        toggleClassName(className: string): boolean;
    }

    /**
     * An AttributionControl control presents the map's attribution information.
     * @param options Object with options
     * @param options.compact If true, force a compact attribution that shows the full attribution on mouse hover.
     * If false, force the full attribution control. The default is a responsive attribution that collapses when
     * the map is less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit
     * on the map. compact should only be used to modify default attribution when map size makes it impossible to
     * fit default attribution and when the automatic compact resizing for default settings are not sufficient.
     * @param options.customAttribution String or strings to show in addition to any other attributions.
     */
    class AttributionControl {
        constructor(options?: { compact?: boolean; customAttribution?: string | string[] });
    }

    /**
     * A ScaleControl control displays the ratio of a distance on the map to the
     * corresponding distance on the ground.
     * @param options Object with options
     * @param options.maxWidth The maximum length of the scale control in pixels.
     * @param options.unit Unit of the distance ( 'imperial' , 'metric' or  'nautical' ).
     */
    class ScaleControl {
        constructor(options?: {
            maxWidth?: number,
            unit?: string
        });
        /**
         * Set the scale's unit of the distance
         * @param unit Unit of the distance ( 'imperial' ,  'metric' or 'nautical' ).
         */
        setUnit(unit: string): void;
    }
    const sdkInfo: {
        version: string;
    };
    /**
     * The Map object represents the map on your page.
     * It exposes methods and properties that enable you to programmatically change the map
     * and fires events as users interact with it.
     * You create a Map by specifying a container and other options.
     * @extends tt.Evented
     * @param options Object with options.
     * @param options.key Maps key.
     * @param options.container The HTML element representig map container or id of that element.
     * @param options.language Map language.
     * @param options.geopoliticalView Map geopolitical view.
     * @param options.minZoom The minimum zoom level of the map (0-24).
     * @param options.maxZoom The maximum zoom level of the map (0-24).
     * @param options.minPitch The minimum pitch of the map (0-60).
     * @param options.maxPitch The maximum pitch of the map (0-60).
     * @param options.style The map style.
     * Default value: https://api.tomtom.com/style/1/style/20.3.2-*? map=basic_main&traffic_incidents=incidents_day&traffic_flow=flow_relative0
     * It can be one of following types:
     * - URL to the JSON object conforming to the schema described in the Map Style Specification.
     *   Provided URL should follow this pattern:
     *   https://api.tomtom.com/style/1/style/<STYLES_VERSION>&map=<MAP_STYLE>&traffic_incidents=<INCIDENTS_STYLE>&traffic_flow=<FLOW_STYLE>
     *   where:
     *   * STYLES_VERSION - version number of the Map Styles
     *   * MAP_STYLE - name of the Map Style
     *   * INCIDENTS_STYLE - name of the Traffic Incidents Style
     *   * FLOW_STYLE - name of the Traffic Flow Style
     * - JSON object conforming to the mentioned specification.
     * - Configuration object e.g.:
     * style: {
     *    map: 'basic_main',
     *    poi: 'poi_main',
     *    trafficIncidents: 'incidents_day',
     *    trafficFlow: 'flow_relative'
     * }
     *
     * List of styles supported provided by TomTom can be found in Map styles service (Merged style method section).
     *
     * Please notice that visibility of certain layers of the style is altered by options.stylesVisibility
     * Note: methods responsible for showing/hiding traffic flow and traffic incidents will work only if sources conform
     * given sourceName (e.g. showTrafficFlow() will only work if sourceName for trafficFlow is vectorTilesFlow and
     * hideTrafficIncidents() will only work if sourceName for trafficIncidents is vectorTilesIncidents).
     * @param options.stylesVisibility The dictionary of options representing visibility of style parts.
     * Determining which layers belongs to which style is based on the layer source name.
     * We use following style name to source name mapping:
     * - map: 'vectorTiles',
     * - trafficFlow: 'vectorTilesFlow',
     * - trafficIncidents: 'vectorTilesIncidents'
     * - poi: 'poiTiles'
     * Styles downloaded from Map styles service follow this naming convention. By default layers belonging to
     * "trafficFlow" and trafficIncidents" styles are hidden.
     * In case you provide your custom style, be aware that if the style does not have layers with sources
     * named as in the mentioned mapping, this option will have no effect on visibility of layers.
     * @param options.stylesVisibility.map The visibility of base map layers.
     * @param options.stylesVisibility.trafficFlow The visibility of traffic flow layers.
     * @param options.stylesVisibility.trafficIncidents The visibility of traffic incidents layers.
     * @param options.stylesVisibility.poi The visibility of POI layers.
     * @param options.hash If  true, the map's position (zoom, center latitude, center
     * longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
     * For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60 .
     * @param options.interactive If  false, no mouse, touch,
     *  or keyboard listeners will be attached to the map, so it will not respond to interaction.
     * @param options.bearingSnap The threshold, measured in degrees, that determines
     * when the map's bearing will snap to north. For example, with a  bearingSnap of 7,
     * if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north.
     * @param options.pitchWithRotate If  false, the map's pitch (tilt) control with
     * "drag to rotate" interaction will be disabled.
     * @param options.clickTolerance The max number of pixels a user can shift the mouse pointer
     * during a click for it to be considered a valid click (as opposed to a mouse drag).
     * @param options.failIfMajorPerformanceCaveat If true, map creation will fail if
     * the performance of Map would be dramatically worse than expected (i.e., a software renderer would be used).
     * @param options.preserveDrawingBuffer If true, the map's canvas can be exported to a PNG
     * using tt.map.getCanvas().toDataURL(). This is false by default as a performance optimization.
     * @param options.refreshExpiredTiles If false, the map won't attempt to re-request tiles
     * once they expire per their HTTP cacheControl / expires headers.
     * @param options.maxBounds If set, the map will be constrained to the given bounds.
     * @param options.scrollZoom If true, the "scroll to zoom" interaction is enabled.
     * @param options.boxZoom If true, the "box zoom" interaction is enabled.
     * @param options.dragRotate If true, the "drag to rotate" interaction is enabled.
     * @param options.dragPan If true, the "drag to pan" interaction is enabled.
     * @param options.keyboard If true, keyboard shortcuts are enabled.
     * @param options.doubleClickZoom If true, the "double click to zoom" interaction is enabled.
     * @param options.touchZoomRotate If true, the "pinch to rotate and zoom"
     * interaction is enabled.
     * @param options.touchPitch If true, the "drag to pitch" interaction is enabled.
     * An Object value is passed as options to TouchPitchHandler.
     * @param options.trackResize If true, the map will automatically resize when
     * the browser window resizes.
     * @param options.center The inital geographical center point of the map.
     * If center is not specified in the constructor options, the Maps SDK will look for it in the map's style object.
     * If it is not specified in the style it will default to (0, 0).
     * Note: The Maps SDK uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
     * @param options.zoom The initial zoom level of the map. If zoom is not specified in the constructor
     * options, the Maps SDK will look for it in the map's style object. If it is not specified in the style
     * it will default to 0.
     * @param options.bearing The initial bearing (rotation) of the map, measured in degrees counter-clockwise
     * from north. If bearing is not specified in the constructor options, the Maps SDK will look for it in
     * the map's style object. If it is not specified in the style it will default to 0.
     * @param options.pitch The initial pitch (tilt) of the map, measured in degrees away from
     * the plane of the screen (0-60). If pitch is not specified in the constructor options,
     * the Maps SDK will look for it in the map's style object. If it is not specified in the style,
     * it will default to 0.
     * @param options.bounds The initial bounds of the map.
     * If bounds is specified, it overrides center and zoom constructor options.
     * @param options.fitBoundsOptions A fitBounds options object to use only when fitting the initial
     * bounds provided above.
     * @param options.renderWorldCopies If true, multiple copies of the world
     * will be rendered when zoomed out.
     * @param options.maxTileCacheSize The maximum number of tiles stored in
     * the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport.
     * @param options.localIdeographFontFamily If specified, defines a CSS font-family for locally
     * overriding the generation of glyphs in the 'CJK Unified Ideographs' and 'Hangul Syllables' ranges.
     * In these ranges, font settings from the map's style will be ignored except for font-weight keywords
     * (light/regular/medium/bold). The purpose of this option is to avoid bandwidth-intensive glyph server requests.
     * @param options.collectResourceTiming If true, Resource Timing API information will be collected
     * for requests made by GeoJSON and Vector Tile Web Workers (this information is normally inaccessible from the main
     * JavaScript thread). Information will be returned in a resourceTiming property of relevant data events.
     * @param options.fadeDuration Controls the duration of the fade-in/fade-out animation for label
     * collisions in milliseconds. This setting affects all symbol layers. This setting does not affect the duration
     * of runtime styling transitions or raster tile cross-fading.
     * @param options.crossSourceCollisions Controls the duration of the fade-in/fade-out animation
     * for label.
     * @param options.attributionControlPosition Sets position of attribution control.
     *
     * @param options.transformRequest A callback function that runs before the map makes a request for an external URL.
     * This callback can be used to modify the url, set headers or credentials. It takes url and resourceType as input
     * parameters. It's expected to return an object with properties like url, headers, credentials.
     */

    function map(options: MapOptions): tt.Map;

    interface Map extends tt.Evented {
        /**
         * Returns true if the map is panning, zooming, rotating,
         * or pitching due to a camera animation or user gesture.
         */
        isMoving(): boolean;

        /**
         * Returns true if the map is zooming due to a camera animation or user gesture.
         */
        isZooming(): boolean;

        /**
         * Returns true if the map is rotating due to a camera animation or user gesture.
         */
        isRotating(): boolean;

        /**
         * The map's geographical centerpoint.
         */
        getCenter(): tt.LngLat;

        /**
         * Sets the map's geographical centerpoint. Equivalent to `jumpTo({center: center})`.
         * @param lnglat The centerpoint to set.
         * @param eventData Additional properties to be added to event objects
         * of events triggered by this method.
         * @return this
         */
        setCenter(lnglat: tt.LngLatLike, eventData?: EventData): this;

        /**
         * Pans the map to the specified location with an animated transition.
         * @param lnglat The location to pan the map to.
         * @param options Animation options.
         * @param eventData Additional properties to be added to event objects
         * of events triggered by this method.
         * @return this
         */
        panTo(lnglat: tt.LngLatLike, options: AnimationOptions, eventData?: EventData): this;

        /**
         * Returns the map's current zoom level.
         * @return The map's current zoom level.
         */
        getZoom(): number;

        /**
         * Sets the map's zoom level. Equivalent to `jumpTo({zoom: zoom})`.
         * @param zoom The zoom level to set (0-20).
         * @param eventData Additional properties to be added to event objects of events
         * triggered by this method.
         * @return this
         */
        setZoom(zoom: number, eventData?: EventData): this;

        /**
         * Zooms the map to the specified zoom level with an animated transition.
         * @param zoom The zoom level to transition to.
         * @param options Animation options.
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        zoomTo(zoom: number, options?: AnimationOptions): this;

        /**
         * Displays traffic flow on the map. To see how to set a traffic style different to the
         * default one, please have a look at the options.style parameter description.
         * Note: For custom traffic styles, this method will work only if sources conform
         * to given sourceName (showTrafficFlow() will only work if sourceName property
         * for trafficFlow will be vectorTilesFlow).
         * @returns {void}
         * @throws {Error} Throws if style does not have layers recognized as traffic flow layers.
         */
        showTrafficFlow(): void;

        /**
         * Hides a traffic flow layer on the map.
         * Note: For custom traffic styles, this method will work only if sources conform to given
         * sourceName (hideTrafficFlow() will only work if sourceName for trafficFlow will be vectorTilesFlow).
         * @returns {void}
         * @throws {Error} Throws if style does not have layers recognized as traffic flow layers.
         */
        hideTrafficFlow(): void;

        /**
         * Displays a traffic incidents layer on the map. To see how to set a traffic style different
         * to the default one, please have a look at the options.style parameter description.
         * Note: For custom traffic styles, this method will work only if sources conform to given sourceName
         * (showTrafficIncidents() will only work if sourceName property for trafficIncidents will be vectorTilesIncidents).
         * @returns {void}
         * @throws {Error} Throws if style does not have layers recognized as traffic incidents layers.
         */
        showTrafficIncidents(): void;

        /**
         * Hides traffic incidents layer on the map.
         * Note: For custom traffic styles, this method will work only if sources conform to given sourceName
         * (hideTrafficIncidents() will only work if sourceName property for trafficIncidents will be vectorTilesIncidents).
         * @returns {void}
         * @throws {Error} Throws if style does not have layers recognized as traffic incidents layers.
         */
        hideTrafficIncidents(): void;

        /**
         * Displays the POI layer on the map.
         * Note: For custom POI styles, this method will work only if sources conform
         * to given `sourceName` (`showPOI()` will only work if `sourceName` property
         * for trafficFlow will be `poiTiles`).
         * @returns {void}
         */
        showPOI(): void;

        /**
         * Hides the POI layer on the map.
         * Note: For custom traffic styles, this method will work only if sources conform
         * to given `sourceName` (`hidePOI()` will only work if `sourceName` for trafficFlow
         * will be `poiTiles`).
         * @returns {void}
         */
        hidePOI(): void;

        /**
         * Returns a TomTomAttributionControl instance.
         * @return TomTomAttributionControl.
         */
        getAttributionControl(): TomTomAttributionControl;
        /**
         * Returns the map's current bearing.
         * The bearing is the compass direction that is "up"; for example,
         * a bearing of 90° orients the map so that east is up.
         * @return The map's current bearing.
         */
        getBearing(): number;

        /**
         * Sets the map's bearing (rotation). The bearing is the compass direction that is "up";
         * for example, a bearing of 90° orients the map so that East is up.
         * Equivalent to `jumpTo({bearing: bearing})`.
         * @param bearing The desired bearing.
         * @param eventData Additional properties to be added to event objects
         * of events triggered by this method.
         * @return this
         */
        setBearing(bearing: number, eventData?: EventData): this;

        /**
         * Rotates the map to the specified bearing with an animated transition.
         * The bearing is the compass direction that is "up"; for example,
         * a bearing of 90° orients the map so that East is up.
         * @param bearing The desired bearing.
         * @param options Animation options.
         * @param options.duration The animation's duration measured in milliseconds.
         * @param options.easing A function taking a time in the range 0..1 and returning
         * a number where 0 is the initial state and 1 is the final state.
         * @param options.offset Offset of the target center relative to the real map container
         * center at the end of animation.
         * @param options.animate If `false`, no animation will occur.
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        rotateTo(bearing: number, options?: AnimationOptions, eventData?: EventData): this;

        /**
         * Returns the map's current pitch (tilt).
         * @return The map's current pitch measured in degrees away from the plane of the screen.
         */
        getPitch(): number;

        /**
         * Sets the map's pitch (tilt). Equivalent to `jumpTo({pitch: pitch})`.
         * @param pitch The pitch to set, measured in degrees away from the plane of the screen (0-60).
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        setPitch(pitch: number, eventData?: EventData): this;

        /**
         * Pans and zooms the map to contain its visible area within the specified geographical bounds.
         * This function will also reset the map's bearing to 0 if the bearing is nonzero.
         * @param bounds Center these bounds in the viewport and use the highest zoom level up to
         * and including getMaxZoom method that fits them in the viewport.
         * @param options Options supports all properties from AnimationOptions and CameraOptions
         * in addition to the fields below.
         * @param options.padding The amount of padding in pixels to add to the given bounds.
         * @param options.linear If  true, the map transitions using Map#easeTo.
         * If `false`, the map transitions using Map#flyTo.
         * See those functions and AnimationOptions for information about the options available.
         * @param options.easing An easing function for the animated transition.
         * @param options.offset The center of the given bounds relative to the map's center
         * measured in pixels.
         * @param options.maxZoom The maximum zoom level to allow when the map view transitions
         * to the specified bounds and fields listed in the example.
         * @return this
         */
        fitBounds(bounds: tt.LngLatBoundsLike, options?: FitBoundsOptions | AnimationOptions | CameraOptions): this;

        /**
         * Changes any combination of center, zoom, bearing, and pitch, without an animated transition.
         * The map will retain its current values for any details not specified in `options`.
         * @param options Options supports all properties from CameraOptions
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        jumpTo(options?: CameraOptions, eventData?: EventData): this;

        /**
         * Changes any combination of center, zoom, bearing, and pitch,
         * with an animated transition between old and new values.
         * The map will retain its current values for any details not specified in `options`.
         * @param options Camera and animation options.
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        easeTo(options: CameraOptions|AnimationOptions, eventData?: EventData): this;

        /**
         * Changes any combination of center, zoom, bearing, and pitch,
         * animating the transition along a curve that evokes flight. The animation seamlessly
         * incorporates zooming and panning to help users maintain their bearings even after traversing a great distance.
         * @param options Options supports all properties from AnimationOptions and CameraOptions
         * in addition to the fields below.
         * @param options.curve The zooming "curve" that will occur along the flight path.
         * A high value maximizes zooming for an exaggerated animation, while a low value minimizes zooming for an effect
         * closer to Map#easeTo. 1.42 is the average value selected by participants in the user study
         * discussed in van Wijk (2003). A value of Math.pow(6, 0.25) would be equivalent to the root mean squared average
         * velocity. A value of 1 would produce a circular motion.
         * @param options.minZoom The zero-based zoom level at the peak of the flight path. If options.curve
         * is specified, this option is ignored.
         * @param options.speed The average speed of the animation defined in relation to options.curve.
         *  A speed of 1.2 means that the map appears to move along the flight path by 1.2 times options.curve screenfuls
         *  every second. A screenful is the map's visible span. It does not correspond to a fixed physical distance,
         * but varies by zoom level.
         * @param options.screenSpeed The average speed of the animation measured in screenfuls per second
         * assuming a linear timing curve. If options.speed is specified, this option is ignored.
         * @param options.maxDuration The animation's maximum duration measured in milliseconds.
         * If duration exceeds maximum duration it resets to 0.
         * @param eventData Additional properties to be added
         * to event objects of events triggered by this method.
         * @return this
         */
        flyTo(options?: {
            curve?: number,
            minZoom?: number,
            speed?: number,
            screenSpeed?: number,
            maxDuration?: number
        }, eventData?: EventData): this;

        /**
         * Stops any animated transition underway.
         * @return this
         */
        stop(): this;

        /**
         * Resizes the map according to the dimensions of its container element.
         * This method must be called after the map's container is resized by another script
         * or when the map is shown after being initially hidden with CSS.
         * @param eventData Additional properties
         * to be added to event objects of events triggered by this method.
         * @return this
         */
        resize(eventData?: EventData): this;

        /**
         * Returns the map's geographical bounds. When the bearing or pitch is non-zero,
         * the visible region is not an axis-aligned rectangle, and the result is the smallest bounds
         * that encompasses the visible region.
         */
        getBounds(): tt.LngLatBounds;

        /**
         * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
         */
        getMaxBounds(): tt.LngLatBounds|null;

        /**
         * Sets or clears the map's geographical bounds.
         * Pan and zoom operations are constrained within these bounds. If a pan or zoom is performed that would display
         * regions outside of these bounds, the map will instead display a position and zoom level as close as possible
         * to the operation's request while still remaining within the bounds.
         * @param bounds The maximum bounds to set.
         * If `null` or `undefined` is provided, the function removes the map's maximum bounds.
         * @return this
         */
        setMaxBounds(bounds: tt.LngLatBoundsLike|null|undefined): this;

        /**
         * Sets or clears the map's minimum zoom level.
         * If the map's current zoom level is lower than the new minimum, the map will zoom to the new minimum.
         * @param  minZoom The minimum zoom level to set (0-24).
         * If `null` or `undefined` is provided, the function removes the current minimum zoom (i.e., sets it to 0).
         * @return this
         */
        setMinZoom(minZoom: number|null|undefined): this;

        /**
         * Returns the map's minimum allowable zoom level.
         * @return minZoom.
         */
        getMinZoom(): number;

        /**
         * Sets or clears the map's maximum zoom level.
         * If the map's current zoom level is higher than the new maximum, the map will zoom to the new maximum.
         * @param maxZoom The maximum zoom level to set.
         * If `null` or `undefined` is provided, the function removes the current maximum zoom (sets it to 22).
         * @return this
         */
        setMaxZoom(maxZoom: number): this;

        /**
         * Returns the map's maximum allowable zoom level.
         * @return maxZoom.
         */
        getMaxZoom(): number;

        /**
         * Adds a listener for events of a specified type occurring on features in a specified style layer.
         * @param type The event type to listen for; one of 'mousedown' , 'mouseup' , 'click' , 'dblclick' ,
         * 'mousemove' , 'mouseenter' , 'mouseleave' , 'mouseover' , 'mouseout' , 'contextmenu' , 'touchstart' ,
         * 'touchend' , or 'touchcancel' . mouseenter and mouseover events are triggered when the cursor enters
         * a visible portion of the specified layer from outside that layer or outside the map canvas.
         * mouseleave and mouseout events are triggered when the cursor leaves a visible portion of the specified layer,
         * or leaves the map canvas.
         * @param layerId The ID of a style layer. Only events whose location is within a visible feature
         * in this layer will trigger the listener. The event will have a features property containing an array
         * of the matching features.
         * @param listener The function to be called when the event is fired.
         * @return this
         */
        on<T extends keyof MapEvent>(type: T, listener: Listener<MapEvent[T]>): this;
        on<T extends keyof MapLayerEventType>(type: T, layer: string, listener: Listener<MapLayerEventType[T]>): this;

        /**
         * Removes an event listener previously added with Map.on.
         * @param type The event type previously used to install the listener.
         * @param layerId The layer ID previously used to install the listener.
         * @param listener The function previously installed as a listener.
         * @return this
         */
        off<T extends keyof MapEvent>(type: T, listener: Listener<MapEvent[T]>): this;
        off<T extends keyof MapLayerEventType>(type: T, layer: string, listener: Listener<MapLayerEventType[T]>): this;

        /**
         * Adds a listener that will be called only once to a specified event type.
         * The listener will be called the first time the event fires after the listener is registered.
         * @param type The event type to listen for; one of 'mousedown', 'mouseup', 'click', 'dblclick',
         * 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'contextmenu', 'touchstart',
         * 'touchend', or 'touchcancel'. mouseenter and mouseover events are triggered when the cursor enters
         * a visible portion of the specified layer from outside that layer or outside the map canvas. mouseleave
         * and mouseout events are triggered when the cursor leaves a visible portion of the specified layer,
         * or leaves the map canvas.
         * @param layerId The ID of a style layer. Only events whose location is within a visible feature
         * in this layer will trigger the listener. The event will have a features property containing an array
         * of the matching features.
         * @param listener The function to be called when the event is fired the first time.
         * @return this
         */
        once<T extends keyof MapEvent>(type: T, listener: Listener<MapEvent[T]>): this;
        once<T extends keyof MapLayerEventType>(type: T, layer: string, listener: Listener<MapLayerEventType[T]>): this;

        /**
         * Add plugin to the map.
         * @param plugin The plugin to add.
         * @param position The position on the map to which the control will be added. Valid values are
         * 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
         * @return this
         */
        addControl(plugin: TTControl, position?: string): this;

        /**
         * Removes the plugin from the map.
         * @param plugin The plugin to remove.
         * @return this
         */
        removeControl(plugin: TTControl): this;

        /**
         * @method hasControl
         * @description Checks if a control is on the map.
         * @param plugin The plugin to check.
         * @return True if map contains control.
         */
        hasControl(plugin: TTControl): boolean;

        /**
         * Adds a style layer to the map's style.
         * A layer defines styling for data from a specified source.
         * @param layer The style layer to add.
         * @param before The ID of an existing layer to insert before the new layer. If this argument is omitted,
         * the layer will be appended to the end of the layers array.
         * @returns this
         */
        addLayer(layer: AnyLayer, before?: string): this;

        /**
         * Returns a boolean indicating whether the map's style is fully loaded.
         * @returns A boolean indicating whether the style is fully loaded.
         */
        isStyleLoaded(): boolean;

        /**
         * Adds a source to the map's style.
         * @param id The ID of the source to add. Must not conflict with existing sources.
         * @param source The source object, conforming to the style specification.
         * @returns this
         */
        addSource(id: string, source: AnySourceData): this;

        /**
         * Returns a boolean indicating whether the source is loaded.
         * @param id The ID of the source to be checked.
         * @returns A boolean indicating whether the source is loaded.
         */
        isSourceLoaded(id: string): boolean;

        /**
         * Returns a boolean indicating whether all tiles in the viewport from all sources on the style are loaded.
         * @returns A boolean indicating whether all tiles are loaded.
         */
        areTilesLoaded(): boolean;

        /**
         * Removes a source from the map's style.
         * @param id The ID of the source to remove.
         * @returns this
         */
        removeSource(id: string): this;

        /**
         * Returns the source with the specified ID in the map's style.
         * @param id The ID of the source to get.
         * @returns The style source with the specified ID, or  undefined if the ID corresponds
         *  to no existing sources.
         */
        getSource(id: string): AnySourceImpl;

        /**
         * Moves a layer to a different z-position.
         * @param id The ID of the layer to move.
         * @param beforeId The ID of an existing layer to insert before the new layer.
         * If this argument is omitted, the layer will be appended to the end of the layers array.
         * @returns this
         */
        moveLayer(id: string, beforeId?: string): this;

        /**
         * Removes the layer with the given id from the map's style.
         * If no such layer exists, an error event is fired.
         * @param id The ID of the layer to remove.
         */
        removeLayer(id: string): void;

        /**
         * Returns the layer with the specified ID in the map's style.
         * @param id The ID of the layer to get.
         * @returns The layer with the specified ID, or undefined if the ID corresponds to no existing layers.
         */
        getLayer(id: string): AnyLayer;

        /**
         * The ID of the layer to which the zoom extent will be applied.
         * @param layerId The ID of the layer to which the zoom extent will be applied.
         * @param minzoom The minimum zoom to set (0-24).
         * @param maxzoom The maximum zoom to set (0-24).
         * @returns this
         */
        setLayerZoomRange(layerId: string, minZoom: number, maxZoom: number): this;

        /**
         * Sets the filter for the specified style layer.
         * @param layer The ID of the layer to which the filter will be applied.
         * @param filter The filter, conforming to the style specification's filter definition.
         * If null or undefined is provided, the function removes any existing filter from the layer.
         * @param options
         * @param options.validate Whether to check if the filter conforms to the style
         * specification. Disabling validation is a performance optimization that should only be used if you
         * have previously validated the values you will be passing to this function.
         * @returns this
         */
        setFilter(layer: string, filter: string[]|null|undefined, options?: {
            validate?: boolean
        }): this;

        /**
         * Returns the filter applied to the specified style layer.
         * @param layer The ID of the style layer whose filter to get.
         * @returns The layer's filter.
         */
        getFilter(layer: string): [];

        /**
         * This method sets a geopolitical view for a given map. This setting will only affect map
         * tiles and not other services, e.g., search. Providing an empty string ('') as an input value will unset this option.
         * Supported geopolitical views can be obtained from
         * https://developer.tomtom.com/map-display-api/documentation/vector/tile-v2#default-view-mapping
         */
        setGeopoliticalView(geopoliticalView: string): void;

        /**
         * This method returns a geopolitical view set.
         * @returns string.
         */
        getGeopoliticalView(): string;

        /**
         * This method returns a language set.
         * @returns string.
         */
        getLanguage(): string;

        /**
         * This method sets a language for a given map. This setting will affect only map tiles and not other services,
         * e.g., search. Providing an empty string ('') as an input value will unset this option. Supported languages
         * can be obtained from the list of: {@link https://developer.tomtom.com/map-display-api/documentation/vector/content-v2#list-of-supported-languages|Supported Languages} page.
         */
        setLanguage(language: string): void;

        /**
         * Sets the value of a paint property in the specified style layer.
         * @param layer The ID of the layer to set the paint property in.
         * @param name The name of the paint property to set.
         * @param value The value of the paint propery to set. Must be of a type appropriate for the property.
         * @param options
         * @param options.validate Whether to check if the filter conforms to the style
         * specification. Disabling validation is a performance optimization that should only be used if you
         * have previously validated the values you will be passing to this function.
         * @returns this
         */
        setPaintProperty(layer: string, name: string, value: any, options?: {
            validate?: boolean
        }): this;

        /**
         * Sets the state of a feature. The `state` object is merged in with the existing state of the feature.
         * Features are identified by their id attribute, which must be an integer
         * or a string that can be cast to an integer.
         * @param feature Feature identifier. Feature objects returned from map.queryRenderedFeatures()
         * or event handlers can be used as feature identifiers.
         * @param state A set of key-value pairs. The values should be valid JSON types.
         * This method requires the `feature.id` attribute on data sets. For GeoJSON sources without feature ids,
         * set the `generateId` option in the GeoJSON source specification to auto-assign them.
         * This option assigns ids based on a feature's index in the source data. If you change feature data
         * using `map.getSource('some id').setData(..)`,
         * you may need to re-apply state taking into account updated id values.
         * @param feature.id Unique id of the feature. If string is being passed, it has to be
         * castable to integer.
         * @param feature.source The Id of the vector source or GeoJSON source for the feature.
         * @param feature.sourceLayer For vector tile sources, the sourceLayer is required.
         * @returns this
         */
        setFeatureState(feature: {id: string|number, source: string, sourceLayer?: string}, state: { [key: string]: any }): this;

        /**
         * Removes feature state, setting it back to the default behavior.
         * If only source is specified, removes all states of that source. If `target.id` is also specified,
         * removes all keys for that feature's state. If key is also specified, removes that key from that feature's state.
         * Features are identified by their `id` attribute,
         * which must be an integer or a string that can be cast to an integer.
         * @param target Identifier of where to set state: can be a source,
         * a feature, or a specific key of feature. Feature objects returned from
         * map.queryRenderedFeatures() or event handlers can be used as feature identifiers.
         * @param target.id Unique id of the feature. Optional if key is not specified.
         * If string is being passed, it has to be castable to integer.
         * @param target.source The Id of the vector source or GeoJSON source for the feature.
         * @param target.sourceLayer For vector tile sources, the sourceLayer is required.
         * @returns this
         */
        removeFeatureState(target: {id?: string|number, source: string, sourceLayer?: string}): this;

        /**
         * Gets the state of a feature. Features are identified by their `id` attribute,
         * which must be an integer or a string that can be cast to an integer.
         * @param feature Feature identifier. Feature objects returned from map.queryRenderedFeatures().
         * or event handlers can be used as feature identifiers.
         * @param key The key in the feature state to reset.
         * @param feature.id Unique id of the feature. If string is being passed,
         * it has to be castable to integer.
         * @param feature.source The Id of the vector source or GeoJSON source for the feature.
         * @param feature.sourceLayer For vector tile sources, the sourceLayer is required.
         * @returns The state of the feature.
         */
        getFeatureState(feature: {id?: string|number, source: string, sourceLayer?: string}, key: string): { [key: string]: any };

        /**
         * Returns the value of a paint property in the specified style layer.
         * @param layer The ID of the layer to get the paint property from.
         * @param name The name of a paint property to get.
         * @returns The value of the specified paint property.
         */
        getPaintProperty(layer: string, name: string): any;

        /**
         * Sets the value of a layout property in the specified style layer.
         * @param layer The ID of the layer to set the layout property in.
         * @param name The name of the layout property to set.
         * @param value The value of the layout propery. Must be of a type appropriate for the property.
         * @param options
         * @param options.validate Whether to check if the filter conforms to the style
         * specification. Disabling validation is a performance optimization that should only be used if you
         * have previously validated the values you will be passing to this function.
         * @returns this
         */
        setLayoutProperty(layer: string, name: string, value: any, options?: {validate?: boolean}): this;

        /**
         * Returns the value of a layout property in the specified style layer.
         * @param layer The ID of the layer to get the layout property from.
         * @param name The name of the layout property to get.
         * @returns The value of the specified layout property.
         */
        getLayoutProperty(layer: string, name: string): any;

        /**
         * Sets map style. Visibility of certain layers of the style is altered by options.stylesVisibility.
         * If you modified the style in any way (e.g. by adding new layers), the changes you made won't be preserved
         * after calling map.setStyle().
         * @param style Map style It can be one of following types:
         * * URL to the JSON object conforming to the schema described in the Map Style Specification.
         *      Provided URL should follow this pattern:
         *      https://api.tomtom.com/style/1/style/<STYLES_VERSION>&map=<MAP_STYLE>&traffic_incidents=<INCIDENTS_STYLE>&traffic_flow=<FLOW_STYLE>
         *      where:
         *      * STYLES_VERSION - version number of the Map Styles
         *      * MAP_STYLE - name of the Map Style
         *      * INCIDENTS_STYLE - name of the Traffic Incidents Style
         *      * FLOW_STYLE - name of the Traffic Flow Style
         *      * POI_STYLE - name of the POI Style
         * * JSON object conforming to the mentioned specification.
         * * Configuration object e.g.:
         *      style: {
         *          map: 'basic_main',
         *          poi: 'poi_main',
         *          trafficIncidents: 'incidents_day',
         *          trafficFlow: 'flow_relative'
         *      }
         *
         * List of styles supported provided by TomTom can be found in Map styles service (Merged style method section).
         * @returns this
         */
        setStyle(style: Style|string|MapStyleConfig): this;

        /**
         * Returns the map's style object which can be used to recreate the map's style.
         * @returns The map's style object.
         */
        getStyle(): Style;

        /**
         * Returns the map's containing HTML element.
         * @returns The map's container.
         */
        getContainer(): HTMLElement;

        /**
         * Returns the HTML element containing the map's `<canvas>` element.
         * If you want to add non-GL overlays to the map, you should append them to this element.
         * This is the element to which event bindings for map interactivity (such as panning and zooming) are attached.
         * It will receive bubbled events from child elements such as the `<canvas>`, but not from map controls.
         * @returns {HTMLElement} The container of the map's canvas.
         */
        getCanvasContainer(): HTMLElement;

        /**
         * Returns the map's `<canvas>` element.
         * @returns The map's canvas element.
         */
        getCanvas(): HTMLCanvasElement;

        /**
         * Returns a boolean indicating whether the map is fully loaded.
         * Returns false if the style is not yet fully loaded, or if there has been a change to the
         * sources or style that has not yet fully loaded.
         * @returns A boolean indicating whether the map is fully loaded.
         */
        loaded(): boolean;

        /**
         * Clean up and release all internal resources associated with this map.
         * This includes DOM elements, event bindings, Web Workers, and WebGL resources.
         * Use this method when you are done using the map and wish to ensure that it no longer
         * consumes browser resources. Afterwards, you must not call any other methods on the map.
         */
        remove(): void;

        /**
         * Trigger the rendering of a single frame. Use this method with custom layers to repaint the
         * map when the layer changes. Calling this multiple times before the next frame is rendered will
         * still result in only a single frame being rendered.
         */
        triggerRepaint(): void;

        /**
         * Returns a Point representing pixel coordinates, relative to the map's container
         * that correspond to the specified geographical location.
         *
         * When the map is pitched and `lnglat` is completely behind the camera, there are no pixel
         * coordinates corresponding to that location. In that case, the `x` and `y` components
         * of the returned Point are set to `Number.MAX_VALUE`.
         * @param lnglat The geographical location to project.
         * @returns The Point corresponding to lnglat relative to the map's container.
         */
        project(lnglat: tt.LngLat): tt.Point;

        /**
         * Returns a LngLat representing geographical coordinates that correspond to
         * the specified pixel coordinates.
         * @param point The pixel coordinates to unproject.
         * @returns The LngLat corresponding to point.
         */
        unproject(point: tt.Point): tt.LngLat;

        /**
         * @param id The ID of the image.
         * @param image The image as an HTMLImageElement, ImageData, or object with width, height, and data properties with the same format as ImageData.
         */
        updateImage(id: string, image:
            HTMLImageElement
            |ImageBitmap
            |ImageData
            |{ width: number; height: number; data: Uint8Array | Uint8ClampedArray }): void;

        /**
         * Load an image from an external URL for use with `map.addImage`. External
         * domains must support CORS.
         * @param url The URL of the image file. Image file must be in png, webp, or jpg format.
         * @param callback Expecting `callback(error, data)`. Called when the image has loaded or with an error
         * argument if there is an error.
         */
        loadImage(url: string, callback: (error: Error, data: HTMLImageElement|ImageBitmap|ImageData|Object) => void): void;

        /**
         * @description Returns an Array of strings containing the IDs of all images currently available in the map.
         * This includes both images from the style's original sprite and any images that have been added at runtime
         * using {{#crossLink "Maps.Map/addImage:method"}}map.addImage(){{/crossLink}}.
         * @returns {Array} An Array of strings containing the names of all sprites/images currently available in the map.
         */
        listImages(): string[],

        /**
         * Add an image to the style. This image can be used in `icon-image`,
         * `background-pattern`, `fill-pattern`, and `line-pattern`. An
         * `error` event will be fired if there is not enough space in the
         * sprite to add this image.
         * @param id The ID of the image.
         * @param image The image as an `HTMLImageElement`, `ImageData`, or object with `width`, `height`, and `data`
         * properties with the same format as `ImageData`.
         * @param options
         * @param options.pixelRatio The ratio of pixels in the image to physical pixels on the screen
         * @param options.sdf Whether the image should be interpreted as an SDF image
         */
        addImage(id: string, image:
            HTMLImageElement
            |ImageBitmap
            |ImageData
            |{ width: number; height: number; data: Uint8Array | Uint8ClampedArray },
                 options?: {pixelRatio?: number, sdf?: boolean}): void;

        /**
         * Returns the source with the specified ID in the map's style.
         * @param id The ID of the image.
         * @returns A boolean indicating whether the image exists.
         */
        hasImage(id: string): boolean;

        /**
         * @method removeImage
         * @description
         * Remove an image from a style. This can be an image from the style's original sprite or any
         * images that have been added at runtime using {{#crossLink "Maps.Map/addImage:method"}}map.addImage()
         * {{/crossLink}}.
         * @param {String} id The ID of the image.
         */
        removeImage(id: string): void,


        /**
         * Rotates and pitches the map so that north is up (0° bearing)
         * and pitch is 0°, with an animated transition.
         */
        resetNorthPitch(): void;

        /**
         * Returns an array of GeoJSON Feature objects representing visible features that
         * satisfy the query parameters.
         * The properties value of each returned feature object contains the properties of its source feature.
         * For GeoJSON sources, only string and numeric property values are supported (i.e. null, Array, and Object
         * values are not supported).
         * Each feature includes top-level layer, source, and sourceLayer properties. The layer property is an
         * object representing the style
         * layer to which the feature belongs. Layout and paint properties in this object contain values which are
         * fully evaluated for the given zoom level and feature.
         *
         * Only features that are currently rendered are included. Some features will not be included, like:
         * * Features from layers whose visibility property is none;
         * * Features from layers whose zoom range excludes the current zoom level;
         * * Symbol features that have been hidden due to text or icon collision.
         *
         * Features from all other layers are included, including features that may have no visible contribution to the
         * rendered result; for example, because the layer's opacity or color alpha component is set to 0.
         * The topmost rendered feature appears first in the returned array, and subsequent features are sorted by
         * descending z-order. Features that are rendered multiple times (due to wrapping across the antimeridian at
         * low zoom levels) are returned only once (though subject to the following caveat).
         *
         * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
         * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple times
         * in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
         * The results of the query will be those parts of the highway that lie within the map tiles covering the
         * bounding rectangle, even if the highway extends into other tiles, and the portion of the highway within
         * each map tile will be returned as a separate feature. Similarly, a point feature near a tile boundary may
         * appear in multiple tiles due to tile buffering.
         * @param geometry The geometry of the query region: either a single point or southwest and northeast points
         * describing a bounding box. Omitting this parameter (i.e. calling Map.queryRenderedFeatures with zero arguments,
         * or with only a options argument) is equivalent to passing a bounding box encompassing the entire map viewport.
         * @param options
         * @param options.layers An array of style layer IDs for the query to inspect.
         * Only features within these layers will be returned.
         * If this parameter is undefined, all layers will be checked.
         * @param options.filter A filter to limit query results.
         * @param options.validate Whether to check if the options.filter conforms to the
         * Style Specification.
         * @returns An array of GeoJSON feature objects.
         */
        queryRenderedFeatures(
            geometry?: tt.PointLike | [tt.PointLike, tt.PointLike],
            options?: {layers?: string[], filter?: any[], validate?: boolean}
        ): GeoJSONFeature[];

        /**
         * Returns an array of GeoJSON Feature objects. In contrast to map.queryRenderedFeatures(),
         * this function returns all features matching the query parameters,
         * whether or not they are rendered by the current style (i.e. visible). The domain of the query includes all
         * currently-loaded vector tiles and GeoJSON source tiles: this function does not check tiles outside the
         * currently visible viewport.
         * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally,
         * feature geometries may be split or duplicated across tile boundaries and, as a result, features may
         * appear multiple times in query results. For example, suppose there is a highway running through the bounding
         * rectangle of a query. The results of the query will be those parts of the highway that lie within the map tiles
         * covering the bounding rectangle, even if the highway extends into other tiles, and the portion of the highway
         * within each map tile will be returned as a separate feature. Similarly, a point feature near a tile boundary
         * may appear in multiple tiles due to tile buffering.
         * @param sourceId The ID of the vector tile or GeoJSON source to query.
         * @param options
         * @param options.sourceLayer The name of the source layer to query. For vector tile sources, this
         * parameter is required. For GeoJSON sources, it is ignored.
         * @param options.filter A filter to limit query results.
         * @param options.validate Whether to check if the options.filter conforms to the
         * Style Specification.
         * @returns Returns an array of GeoJSON Feature objects representing features within the
         * specified vector tile or GeoJSON source that satisfy the query parameters.
         */
        querySourceFeatures(sourceId: string, options?: {sourceLayer?: string, filter?: any[], validate?: boolean}): GeoJSONFeature[];

        /**
         * @param bounds Calculate the center for these bounds in the viewport and use the highest zoom
         * level up to and including map.getMaxZoom()
         * that fits in the viewport. LatLngBounds represent a box that is always axis-aligned with bearing 0.
         * @param options Camera options.
         * @param options.padding The amount of padding in pixels to add to the given bounds.
         * @param options.offset The center of the given bounds relative to the map's center
         * measured in pixels.
         * @param options.maxZoom The maximum zoom level to allow when the map view transitions
         * @return If map is able to fit to provided bounds, returns camera options
         * with center, zoom, and bearing. If map is unable to fit, method will warn and return undefined.
         */
        cameraForBounds(bounds: tt.LngLatBoundsLike, options?: {
            padding?: {
                top: number,
                right: number,
                bottom: number,
                left: number
            }, offset?: tt.PointLike, maxZoom?: number}): CameraOptions|undefined;

        /**
         * The BoxZoomHandler allows the user to zoom the map to fit within a bounding box.
         * The bounding box is defined by clicking and holding shift while dragging the cursor. 
         */
        boxZoom: BoxZoomHandler;

        /**
         * The DoubleClickZoomHandler allows the user to zoom the map at a point by double clicking or double tapping. 
         */
        doubleClickZoom: DoubleClickZoomHandler;

        /**
         * The DragPanHandler allows the user to pan the map by clicking and dragging the cursor.
         */
        dragPan: DragPanHandler;

        /**
         * The DragRotateHandler allows the user to rotate the map by clicking and dragging 
         * the cursor while holding the right mouse button or ctrl key. 
         */
        dragRotate: DragRotateHandler;

        /**
         * The KeyboardHandler allows the user to zoom, rotate, and pan the map using the keyboard shortcuts.
         */
        keyboard: KeyboardHandler;

        /**
         * The ScrollZoomHandler allows the user to zoom the map by scrolling.
         */
        scrollZoom: ScrollZoomHandler;

        /**
         * The TouchPitchHandler allows the user to pitch the map with touch gestures.
         */
        touchPitch: TouchPitchHandler;

        /**
         * The TouchZoomRotateHandler allows the user to zoom and rotate the map by pinching on a touchscreen.
         */
        touchZoomRotate: TouchZoomRotateHandler;
    }

    export type GeoJSONFeature = GeoJSON.Feature<GeoJSON.Geometry> & {
        layer: AnyLayer;
        source: string;
        sourceLayer: string;
        state: { [key: string]: any };
    };

    type MapStyle = 'basic_main'
        | 'basic_night'
        | 'basic_main-lite'
        | 'basic_night-lite'
        | 'hybrid_main'
        | 'hybrid_night'
        | 'hybrid_main-lite'
        | 'hybrid_night-lite'
        | 'labels_main'
        | 'labels_night'
        | 'labels_main-lite'
        | 'labels_night-lite'
        | '2/basic_street-light'
        | '2/basic_street-dark'
        | '2/basic_street-light-driving'
        | '2/basic_street-dark-driving'
        | '2/basic_mono-light'
        | '2/basic_mono-dark'
        | '2/basic_street-satellite'
        | '2/hybrid_street-light'
        | '2/hybrid_street-dark'
        | '2/hybrid_street-light-driving'
        | '2/hybrid_street-dark-driving'
        | '2/hybrid_street-satellite'
        | '2/labels_street-light'
        | '2/labels_street-dark'
        | '2/labels_street-light-driving'
        | '2/labels_street-dark-driving'
        | '2/labels_street-satellite';

    type TrafficIncidentsStyle = 'incidents_day'
        | 'incidents_dark'
        | 'incidents_night'
        | 'incidents_s0'
        | 'incidents_s0-dark'
        | 'incidents_s1'
        | 'incidents_s2'
        | 'incidents_s3'
        | '2/incidents_light'
        | '2/incidents_dark';

    type TrafficFlowStyle = 'flow_absolute'
        | 'flow_reduced-sensitivity'
        | 'flow_relative-delay'
        | 'flow_relative0'
        | 'flow_relative0-dark'
        | '2/flow_relative-light'
        | '2/flow_relative-dark';

    type PoiStyle = 'poi_main'
        | '2/poi_light'
        | '2/poi_dark'
        | '2/poi_satellite'
        | '2/poi_dynamic-light'
        | '2/poi_dynamic-dark'
        | '2/poi_dynamic-mono-dark'
        | '2/poi_dynamic-mono-light'
        | '2/poi_mono-dark'
        | '2/poi_mono-light';

    export type MapStyleConfig = {
        map: MapStyle,
        trafficIncidents : TrafficIncidentsStyle,
        trafficFlow: TrafficFlowStyle,
        poi: PoiStyle
    }

    interface RequestParameters {
        url?: string;
        headers?: Object;
    }

    export interface MapOptions {
        key: string,
        container: HTMLElement | string,
        language?: string,
        geopoliticalView?: string,
        minZoom?: number,
        maxZoom?: number,
        minPitch?: number,
        maxPitch?: number,
        style?: Style|string|MapStyleConfig,
        stylesVisibility?: {
            map?: boolean,
            trafficFlow?: boolean,
            trafficIncidents?: boolean,
            poi?: boolean
        },
        hash?: boolean|string,
        interactive?: boolean,
        bearingSnap?: number,
        pitchWithRotate?: boolean,
        clickTolerance?: number,
        failIfMajorPerformanceCaveat?: boolean,
        preserveDrawingBuffer?: boolean,
        refreshExpiredTiles?: boolean,
        maxBounds?: tt.LngLatBoundsLike,
        scrollZoom?: boolean|tt.ScrollZoomHandlerOptions,
        boxZoom?: boolean,
        dragRotate?: boolean,
        dragPan?: boolean|tt.DragPanHandlerOptions,
        keyboard?: boolean,
        doubleClickZoom?: boolean,
        touchZoomRotate?: boolean|tt.TouchZoomRotateHandlerOptions,
        touchPitch?: boolean,
        trackResize?: boolean,
        center?: LngLatLike,
        zoom?: number,
        bearing?: number,
        pitch?: number,
        bounds?: tt.LngLatBoundsLike,
        fitBoundsOptions?: FitBoundsOptions | AnimationOptions | CameraOptions,
        renderWorldCopies?: boolean,
        maxTileCacheSize?: number,
        localIdeographFontFamily?: string,
        collectResourceTiming?: boolean,
        fadeDuration?: number,
        crossSourceCollisions?: boolean,
        attributionControlPosition?: string,
        transformRequest?: (url: string, resourceType: string) => RequestParameters
    }

    export type PromoteIdSpecification = { [key: string]: string } | string;

    export type AnySourceData =
        | GeoJSONSourceRaw
        | VideoSourceRaw
        | ImageSourceRaw
        | CanvasSourceRaw
        | VectorSourceRaw
        | RasterSource
        | RasterDemSource;

    export type AnySourceImpl =
        | GeoJSONSource
        | VideoSource
        | ImageSource
        | CanvasSource
        | VectorSource
        | RasterSource
        | RasterDemSource;

    export interface Source {
        type: 'vector' | 'raster' | 'raster-dem' | 'geojson' | 'image' | 'video' | 'canvas';
    }

    /**
     * GeoJSONSource
     */

    export interface GeoJSONSourceRaw extends Source, GeoJSONSourceOptions {
        type: 'geojson';
    }

    export class GeoJSONSource implements GeoJSONSourceRaw {
        type: 'geojson';

        constructor(options?: GeoJSONSourceOptions);

        setData(data: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | String): this;

        getClusterExpansionZoom(clusterId: number, callback: (error: any, zoom: number) => void): this;

        getClusterChildren(
            clusterId: number,
            callback: (error: any, features: GeoJSON.Feature<GeoJSON.Geometry>[]) => void,
        ): this;

        getClusterLeaves(
            cluserId: number,
            limit: number,
            offset: number,
            callback: (error: any, features: GeoJSON.Feature<GeoJSON.Geometry>[]) => void,
        ): this;
    }

    export interface GeoJSONSourceOptions {
        data?: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;

        maxzoom?: number;

        attribution?: string;

        buffer?: number;

        tolerance?: number;

        cluster?: number | boolean;

        clusterRadius?: number;

        clusterMaxZoom?: number;

        /**
         * Minimum number of points necessary to form a cluster if clustering is enabled. Defaults to `2`.
         */
        clusterMinPoints?: number;

        clusterProperties?: object;

        lineMetrics?: boolean;

        generateId?: boolean;

        promoteId?: PromoteIdSpecification;
    }

    /**
     * VideoSource
     */
    export interface VideoSourceRaw extends Source, VideoSourceOptions {
        type: 'video';
    }

    export class VideoSource implements VideoSourceRaw {
        type: 'video';

        constructor(options?: VideoSourceOptions);

        getVideo(): HTMLVideoElement;

        setCoordinates(coordinates: number[][]): this;
    }

    export interface VideoSourceOptions {
        urls?: string[];

        coordinates?: number[][];
    }

    /**
     * ImageSource
     */
    export interface ImageSourceRaw extends Source, ImageSourceOptions {
        type: 'image';
    }

    export class ImageSource implements ImageSourceRaw {
        type: 'image';

        constructor(options?: ImageSourceOptions);

        updateImage(options: ImageSourceOptions): this;

        setCoordinates(coordinates: number[][]): this;
    }

    export interface ImageSourceOptions {
        url?: string;

        coordinates?: number[][];
    }

    /**
     * CanvasSource
     */
    export interface CanvasSourceRaw extends Source, CanvasSourceOptions {
        type: 'canvas';
    }

    export class CanvasSource implements CanvasSourceRaw {
        type: 'canvas';

        coordinates: number[][];

        canvas: string | HTMLCanvasElement;

        play(): void;

        pause(): void;

        getCanvas(): HTMLCanvasElement;

        setCoordinates(coordinates: number[][]): this;
    }

    export interface CanvasSourceOptions {
        coordinates: number[][];

        animate?: boolean;

        canvas: string | HTMLCanvasElement;
    }

    interface VectorSourceRaw extends Source {
        type: 'vector';
        url?: string;
        tiles?: string[];
        bounds?: number[];
        scheme?: 'xyz' | 'tms';
        minzoom?: number;
        maxzoom?: number;
        attribution?: string;
        promoteId?: PromoteIdSpecification;
    }

    class VectorSource {
        id: string;
        type: 'vector';
        maxzoom: number;
        minzoom: number;
        tiles: string[];
        bounds: number[];
        tileSize: number;
        isTileClipped: boolean;
        reparseOverscaled: boolean;
        scheme: 'xyz' | 'tms';
        promoteId?: PromoteIdSpecification;
        /**
         * Sets the source `tiles` property and re-renders the map.
         *
         * @param tiles An array of one or more tile source URLs.
         * @returns {VectorSource} this
         */
        setTiles(tiles: string[]) : VectorSource

        /**
         * Sets the source `url` property and re-renders the map.
         *
         * @param url A URL to a tile resource. Supported protocols are `http:`, `https:`.
         * @returns {VectorSource} this
         */
        setUrl(url: string) : VectorSource
    }

    interface RasterSource extends Source {
        type: 'raster';
        url?: string;
        tiles?: string[];
        bounds?: number[];
        minzoom?: number;
        maxzoom?: number;
        tileSize?: number;
        scheme?: 'xyz' | 'tms';
        attribution?: string;
    }

    interface RasterDemSource extends Source {
        type: 'raster-dem';
        url?: string;
        tiles?: string[];
        bounds?: number[];
        minzoom?: number;
        maxzoom?: number;
        tileSize?: number;
        attribution?: string;
        encoding?: 'terrarium';
    }

    interface ScrollZoomHandlerOptions {
        around?: string
    }

    /**
     * The ScrollZoomHandler allows the user to zoom the map by scrolling.
     */
    class ScrollZoomHandler {
        /**
         * Returns a Boolean indicating whether the 'scroll to zoom' interaction is enabled.
         * @returns true if the 'scroll to zoom' interaction is enabled.
         */
        isEnabled(): boolean;
        /**
         * Enables the 'scroll to zoom' interaction.
         * @param options Object with options
         * @param options.around If 'center' is passed, map will zoom around center of map
         */
        enable(options?: ScrollZoomHandlerOptions): void;
        /**
         * Disables the 'scroll to zoom' interaction.
         */
        disable(): void;
        /**
         * Set the zoom rate of a mouse wheel.
         * @param wheelZoomRate The rate used to scale mouse wheel movement to a zoom value. (default 1/450)
         */
        setWheelZoomRate(wheelZoomRate: number): void;
        /**
         * Set the zoom rate of a trackpad.
         * @param zoomRate The rate used to scale trackpad movement to a zoom value. (default 1/100)
         */
        setZoomRate(zoomRate: number): void;
    }

    /**
     * The KeyboardHandler allows the user to zoom, rotate, and pan the map using keyboard shortcuts.
     */
    class KeyboardHandler {
        /**
         * Returns a Boolean indicating whether the 'keyboard' interaction is enabled.
         * @returns true if the 'keyboard' interaction is enabled.
         */
        isEnabled(): boolean;
        /**
         * Enables the 'keyboard' interaction.
         */
        enable(): void;
        /**
         * Disables the 'keyboard' interaction.
         */
        disable(): void;
        /**
         * Enables the "keyboard pan/rotate" interaction.
         */
        enableRotation(): void;
        /**
         * Disables the "keyboard pan/rotate" interaction, leaving the "keyboard zoom" interaction enabled.
         */
        disableRotation(): void;
    }

    interface TouchZoomRotateHandlerOptions {
        around?: string;
    }

    /**
     * The TouchZoomRotateHandler allows the user to zoom and rotate the map by pinching on a touchscreen.
     */
    class TouchZoomRotateHandler {
        /**
         * Returns a Boolean indicating whether the 'pinch to rotate and zoom' interaction is enabled.
         * @returns true if the 'pinch to rotate and zoom' interaction is enabled.
         */
        isEnabled(): boolean;
        /**
         * Disables the 'pinch to rotate and zoom' interaction.
         */
        disable(): void;
        /**
         * Enables the 'pinch to rotate and zoom' interaction.
         * @param options Object with options
         * @param options.around If 'center' is passed, map will zoom around center of map
         */
        enable(options?: TouchZoomRotateHandlerOptions): void;
        /**
         * Disables the 'pinch to rotate' interaction, leaving the 'pinch to zoom' interaction enabled.
         */
        disableRotation(): void;
        /**
         * Enables the 'pinch to rotate' interaction.
         */
        enableRotation(): void;
    }
    /**
     * The BoxZoomHandler allows the user to zoom the map to fit within a bounding box.
     * The bounding box is defined by clicking and holding shift while dragging the cursor. 
     */
    class BoxZoomHandler {
        /**
         * Disables the 'box zoom' interaction.
         */
        disable(): void;
        /**
         * Enables the 'box zoom' interaction.
         */
        enable(): void;
        /**
         * Returns a Boolean indicating whether the 'box zoom' interaction is active, i.e. currently being used.
         * @returns true if the 'box zoom' interaction is active. 
         */
        isActive(): boolean;
        /**
         * Returns a Boolean indicating whether the 'box zoom' interaction is enabled.
         * @returns  true if the 'box zoom' interaction is enabled. 
         */
        isEnabled(): boolean;
    }

    /**
     * The DoubleClickZoomHandler allows the user to zoom the map at a point by double clicking or double tapping.
     */
    class DoubleClickZoomHandler {
        /**
         * Disables the 'double click to zoom' interaction.
         */
        disable(): void;
        /**
         * Enables the 'double click to zoom' interaction.
         */
        enable(): void;
        /**
         * Returns a Boolean indicating whether the 'double click to zoom' interaction is active, i.e. currently being used.
         * @returns true if the 'double click to zoom' interaction is active. 
         */
        isActive(): boolean;
        /**
         * Returns a Boolean indicating whether the 'double click to zoom' interaction is enabled.
         * @returns true if the 'double click to zoom' interaction is enabled. 
         */
        isEnabled(): boolean;
    }

    interface DragPanHandlerOptions {
        linearity?: number,
        easing?: Function,
        maxSpeed?: number,
        deceleration?: number
    }

    /**
     * The DragPanHandler allows the user to pan the map by clicking and dragging the cursor.
     */
    class DragPanHandler {
        /**
         * Disables the 'drag to pan' interaction.
         */
        disable(): void;
        /**
         * Enables the 'drag to pan' interaction.
         * @param options Options object
         * @param options.linearity The factor used to scale the drag velocity 
         * @param options.easing The easing function applied to `map.panTo` when applying the drag.
         * @param options.maxSpeed The maximum value of the drag velocity.
         * @param options.deceleration The rate at which the speed reduces after the pan ends.
         */
        enable(options?: DragPanHandlerOptions): void;
        /**
         * Returns a Boolean indicating whether the 'drag to pan' interaction is active, i.e. currently being used.
         * @returns true if the 'drag to pan' interaction is active.
         */
        isActive(): boolean;
        /**
         * Returns a Boolean indicating whether the 'drag to pan' interaction is enabled.
         * @returns true if the 'drag to pan' interaction is enabled.
         */
        isEnabled(): boolean;
    }

    /**
     * The DragRotateHandler allows the user to rotate the map by clicking and dragging
     * the cursor while holding the right mouse button or ctrl key.
     */
    class DragRotateHandler {
        /**
         * Disables the 'drag to rotate' interaction.
         */
        disable(): void;
        /**
         * Enables the 'drag to rotate' interaction.
         */
        enable(): void;
        /**
         * Returns a Boolean indicating whether the 'drag to rotate' interaction is active, i.e. currently being used.
         * @returns true if the 'drag to rotate' interaction is active.
         */
        isActive(): boolean;
        /**
         * Returns a Boolean indicating whether the 'drag to rotate' interaction is enabled.
         * @returns true if the 'drag to rotate' interaction is enabled.
         */
        isEnabled(): boolean;
    }

    /**
     * The TouchPitchHandler allows the user to pitch the map by dragging up and down with two fingers.
     */
    class TouchPitchHandler {
        /**
         * Disables the 'drag to pitch' interaction.
         */
        disable(): void;
        /**
         * Enables the 'drag to pitch' interaction.
         */
        enable(): void;
        /**
         * Returns a Boolean indicating whether the 'drag to pitch' interaction is active, i.e. currently being used.
         * @returns true if the 'drag to pitch' interaction is active.
         */
        isActive(): void;
        /**
         * Returns a Boolean indicating whether the 'drag to pitch' interaction is enabled.
         * @returns true if the 'drag to pitch' interaction is enabled.
         */
        isEnabled(): void;
    }

    /**
     * This method sets the content of the TomTom-User-Agent header. We are collecting anonymous data for
     * statistics of usage of our services in order to increase the quality of our products.
     * @param productId Identifier (e.g., a name) of your application e.g.,&nbsp;MyApplication
     * @param productVersion Version of your application e.g.,&nbsp;1.0.2
     */
    function setProductInfo(productId: string, productVersion: string): void;
    /**
     * This method allows you to check if the user's browser is supported.
     * @param options Object with options
     * @param options.failIfMajorPerformanceCaveat If true, the function will return false if
     * the performance of maps would be dramatically worse than expected (e.g. a software
     * WebGL renderer would be used).
     * @returns true if browser is supported
     */
    function supported(options?: { failIfMajorPerformanceCaveat?: boolean }): boolean;

    /**
     * Options common to Map jumpTo(), easeTo(), and flyTo() methods, controlling the desired location, zoom, bearing,
     * and pitch of the camera. All properties are optional, and when a property is omitted the current camera value
     * for that property will remain unchanged.
     */
    export interface CameraOptions {
        /** The desired center. */
        center?: tt.LngLatLike;
        /** The desired zoom level. */
        zoom?: number;
        /**
         * Map rotation bearing in degrees counter-clockwise from northThe desired bearing, in degrees.
         * The bearing is the compass direction that is "up", for example, a bearing of 90° orients the
         * map so that East is up.  */
        bearing?: number;
        /** The desired pitch, in degrees. */
        pitch?: number;
        /** If `zoom` is specified, `around` determines the point around which the zoom is centered. */
        around?: tt.LngLatLike;
    }
    /**
     * Options common to map movement methods that involve animation, such as Map easeTo(),
     * controlling the duration and easing function of the animation. All properties are optional.
     */
    export interface AnimationOptions {
        /** The animation's duration, measured in milliseconds. */
        duration?: number;
        /** A function taking a time in the range 0..1 and returning a number where 0 is the initial
         * state and 1 is the final state. */
        easing?: (time: number) => number;
        /** Offset of the target center relative to a real map container center at the end of animation.
         * Can be either Point or an array of numbers. */
        offset?: tt.Point|number[];
        /** If `false`, no animation will occur. */
        animate?: boolean;
        /** If 'true', then the animation is considered essential and will not be affected by `prefers-reduced-motion`.*/
        essential?: boolean;
    }

    export interface FitBoundsOptions {
        linear?: boolean;
        padding?: number;
        offset?: tt.PointLike;
        maxZoom?: number;
        maxDuration?: number;
    }

    export type EventData = {[key: string]: any};

    /** Object representing an incident */
    export type IncidentFeature = {
        type: "Feature",
        geometry: {
            type: string,
            coordinates: [number, number]
        },
        properties: {
            id: string,
            incidentCategory: string,
            incidentSeverity: string
        }
    }

    type TTControl =
        | tt.Control
        | tt.GeolocateControl
        | tt.FullscreenControl
        | tt.AttributionControl
        | tt.NavigationControl
        | tt.ScaleControl;

    /**
     * Controls must implement `onAdd` and `onRemove` methods, and must own an HTML element,
     * which is often a `div`.
     */
    export interface Control {
        onAdd(map: tt.Map): HTMLElement;
        onRemove(map: tt.Map): void;
        getDefaultPosition?(): string;
    }

    export interface Light {
        anchor?: 'viewport' | 'map';
        intensity?: number;
        color?: string;
        position?: number[];
    }

    export interface Transition {
        duration?: number;
        delay?: number;
    }

    export interface Style {
        bearing?: number;
        center?: number[];
        glyphs?: string;
        layers: AnyLayer[];
        light?: Light;
        name?: string;
        pitch?: number;
        sources: {
            [key: string]: AnySourceData
        };
        sprite?: string;
        transition?: Transition;
        version: number;
        zoom?: number;
    }

    export type Layout = LayoutType;

    type AnyLayout = 
        | BackgroundLayout
        | CircleLayout
        | FillExtrusionLayout
        | FillLayout
        | HeatmapLayout
        | HillshadeLayout
        | LineLayout
        | RasterLayout
        | SymbolLayout;

    type AnyPaint = 
        | BackgroundPaint
        | CirclePaint
        | FillExtrusionPaint
        | FillPaint
        | HeatmapPaint
        | HillshadePaint
        | LinePaint
        | RasterPaint
        | SymbolPaint;

    export interface Layer {
        id: string;
        type:
            | 'fill'
            | 'line'
            | 'symbol'
            | 'circle'
            | 'fill-extrusion'
            | 'raster'
            | 'background'
            | 'heatmap'
            | 'hillshade';
        metadata?: any;
        ref?: string;
        source?: string | AnySourceData;
        'source-layer'?: string;
        minzoom?: number;
        maxzoom?: number;
        interactive?: boolean;
        filter?: any[];
        layout?: AnyLayout;
        paint?: AnyPaint;
    }
    export interface BackgroundLayer extends Layer {
        type: 'background';
        layout?: BackgroundLayout;
        paint?: BackgroundPaint;
    }

    export interface CircleLayer extends Layer {
        type: 'circle';
        layout?: CircleLayout;
        paint?: CirclePaint;
    }

    export interface FillExtrusionLayer extends Layer {
        type: 'fill-extrusion';
        layout?: FillExtrusionLayout;
        paint?: FillExtrusionPaint;
    }

    export interface FillLayer extends Layer {
        type: 'fill';
        layout?: FillLayout;
        paint?: FillPaint;
    }

    export interface HeatmapLayer extends Layer {
        type: 'heatmap';
        layout?: HeatmapLayout;
        paint?: HeatmapPaint;
    }

    export interface HillshadeLayer extends Layer {
        type: 'hillshade';
        layout?: HillshadeLayout;
        paint?: HillshadePaint;
    }

    export interface LineLayer extends Layer {
        type: 'line';
        layout?: LineLayout;
        paint?: LinePaint;
    }

    export interface RasterLayer extends Layer {
        type: 'raster';
        layout?: RasterLayout;
        paint?: RasterPaint;
    }

    export interface SymbolLayer extends Layer {
        type: 'symbol';
        layout?: SymbolLayout;
        paint?: SymbolPaint;
    }

    export type AnyLayer =
        | BackgroundLayer
        | CircleLayer
        | FillExtrusionLayer
        | FillLayer
        | HeatmapLayer
        | HillshadeLayer
        | LineLayer
        | RasterLayer
        | SymbolLayer
        | CustomLayer;

    /**
     * Custom layers allow a user to render directly into the map's GL context using the map's camera.
     * These layers can be added between any regular layers using Map addLayer method.
     * Custom layers must have a unique id and must have the type of "custom".
     * They must implement render and may implement prerender, onAdd and onRemove.
     * They can trigger rendering using Map triggerRepaint method and they should appropriately
     * handle webglcontextlost and webglcontextrestored map events.
     *
     * The renderingMode property controls whether the layer is treated as a "2d" or "3d" map layer. Use:
     * * "renderingMode": "3d" to use the depth buffer and share it with other layers
     * * "renderingMode": "2d" to add a layer with no depth. If you need to use the depth buffer for a "2d" layer
     * you must use an offscreen framebuffer and CustomLayerInterface#prerender
     */
    export interface CustomLayer {
        /*  A unique layer id. */
        id: string;
        /* The layer's type. Must be `"custom"` */
        type: 'custom';
        /* Either `"2d"` or `"3d"` . Defaults to `"2d"` */
        renderingMode: '2d'|'3d';

        /**
         * Optional method called when the layer has been added to the Map with Map addLayer method.
         * This gives the layer a chance to initialize gl resources and register event listeners.
         * @param map The Map this custom layer was just added to.
         * @param gl The gl context for the map.
         */
        onAdd?(map: Map, gl: WebGLRenderingContext): void;
        /**
         * Optional method called when the layer has been removed from the Map with Map addLayer method.
         * This gives the layer a chance to clean up gl resources and event listeners.
         * @param map The Map this custom layer was just removed from.
         * @param gl The gl context for the map.
         */
        onRemove?(map: Map, gl: WebGLRenderingContext): void;
        /**
         * Optional method called during a render frame to allow a layer to prepare resources or render into a texture.
         *
         * The layer cannot make any assumptions about the current GL state and must bind a framebuffer before rendering.
         * @param [gl] The gl context for the map.
         * @param [matrix] The map's camera matrix. It projects spherical mercator coordinates to gl coordinates.
         * The mercator coordinate `(0, 0)` represents the top left corner of the mercator world and `(1, 1)` represents
         * the bottom right corner. When the renderingMode is "3d" , the z coordinate is conformal.
         * A box with identical x, y, and z lengths in mercator units would be rendered as a cube.
         * tt.MercatorCoordinate method fromLngLat can be used to project a LngLat to a mercator coordinate.
         */
        prerender?(gl: WebGLRenderingContext, matrix: number[]): void;
        /**
         * Called during a render frame allowing the layer to draw into the GL context.
         * The layer can assume blending and depth state is set to allow the layer to properly blend and clip other layers.
         * The layer cannot make any other assumptions about the current GL state.
         * If the layer needs to render to a texture, it should implement the prerender method to do this and only use
         * the render method for drawing directly into the main framebuffer.
         *
         * The blend function is set to `gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`.
         * This expects colors to be provided in premultiplied alpha form where the r, g and b values are already multiplied
         * by the a value. If you are unable to provide colors in premultiplied form you may want to change the blend function
         * to `gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`.
         *
         * The layer cannot make any assumptions about the current GL state and must bind a framebuffer before rendering.
         * @param [gl] The gl context for the map.
         * @param [matrix] The map's camera matrix. It projects spherical mercator coordinates to gl coordinates.
         * The mercator coordinate `(0, 0)` represents the top left corner of the mercator world and `(1, 1)` represents
         * the bottom right corner. When the renderingMode is "3d" , the z coordinate is conformal.
         * A box with identical x, y, and z lengths in mercator units would be rendered as a cube.
         * tt.MercatorCoordinate method fromLngLat can be used to project a LngLat to a mercator coordinate.
         */
        render?(gl: WebGLRenderingContext, matrix: number[]): void;
    }

    export type Expression = [ExpressionName, ...any[]];

    export type ExpressionName =
        // Types
        | 'array'
        | 'boolean'
        | 'collator'
        | 'format'
        | 'literal'
        | 'number'
        | 'object'
        | 'string'
        | 'image'
        | 'to-boolean'
        | 'to-color'
        | 'to-number'
        | 'to-string'
        | 'typeof'
        // Feature data
        | 'feature-state'
        | 'geometry-type'
        | 'id'
        | 'line-progress'
        | 'properties'
        // Lookup
        | 'at'
        | 'get'
        | 'has'
        | 'in'
        | 'index-of'
        | 'length'
        | 'slice'
        // Decision
        | '!'
        | '!='
        | '<'
        | '<='
        | '=='
        | '>'
        | '>='
        | 'all'
        | 'any'
        | 'case'
        | 'match'
        | 'coalesce'
        // Ramps, scales, curves
        | 'interpolate'
        | 'interpolate-hcl'
        | 'interpolate-lab'
        | 'step'
        // Variable binding
        | 'let'
        | 'var'
        // String
        | 'concat'
        | 'downcase'
        | 'is-supported-script'
        | 'resolved-locale'
        | 'upcase'
        // Color
        | 'rgb'
        | 'rgba'
        // Math
        | '-'
        | '*'
        | '/'
        | '%'
        | '^'
        | '+'
        | 'abs'
        | 'acos'
        | 'asin'
        | 'atan'
        | 'ceil'
        | 'cos'
        | 'e'
        | 'floor'
        | 'ln'
        | 'ln2'
        | 'log10'
        | 'log2'
        | 'max'
        | 'min'
        | 'pi'
        | 'round'
        | 'sin'
        | 'sqrt'
        | 'tan'
        // Zoom, Heatmap
        | 'zoom'
        | 'heatmap-density';

    export type MapEvent = {
        error: ErrorEvent;
        load: TTEvent<'load'>;
        remove: TTEvent<'remove'>;
        render: TTEvent<'render'>;
        resize: TTEvent<'resize'>;

        webglcontextlost: MapContextEvent<'webglcontextlost'>;
        webglcontextrestored: MapContextEvent<'webglcontextrestored'>;

        dataloading: MapDataEvent<'dataloading'>;
        data: MapDataEvent<'data'>;
        tiledataloading: MapDataEvent<'tiledataloading'>;
        sourcedataloading: MapSourceDataEvent<'sourcedataloading'>;
        styledataloading: MapStyleDataEvent<'styledataloading'>;
        sourcedata: MapSourceDataEvent<'sourcedata'>;
        styledata: MapStyleDataEvent<'styledata'>;

        boxzoomcancel: MapZoomEvent<'boxzoomcancel'>;
        boxzoomstart: MapZoomEvent<'boxzoomstart'>;
        boxzoomend: MapZoomEvent<'boxzoomend'>;

        touchcancel: MapTouchEvent<'touchcancel'>;
        touchmove: MapTouchEvent<'touchmove'>;
        touchend: MapTouchEvent<'touchend'>;
        touchstart: MapTouchEvent<'touchstart'>;

        click: MapMouseEvent<'click'>;
        contextmenu: MapMouseEvent<'contextmenu'>;
        dblclick: MapMouseEvent<'dblclick'>;
        mousemove: MapMouseEvent<'mousemove'>;
        mouseup: MapMouseEvent<'mouseup'>;
        mousedown: MapMouseEvent<'mousedown'>;
        mouseout: MapMouseEvent<'mouseout'>;
        mouseover: MapMouseEvent<'mouseover'>;

        movestart: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
        move: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
        moveend: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;

        zoomstart: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
        zoom: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
        zoomend: TTEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;

        rotatestart: TTEvent<MouseEvent | TouchEvent | undefined>;
        rotate: TTEvent<MouseEvent | TouchEvent | undefined>;
        rotateend: TTEvent<MouseEvent | TouchEvent | undefined>;

        dragstart: TTEvent<MouseEvent | TouchEvent | undefined>;
        drag: TTEvent<MouseEvent | TouchEvent | undefined>;
        dragend: TTEvent<MouseEvent | TouchEvent | undefined>;

        pitchstart: TTEvent<MouseEvent | TouchEvent | undefined>;
        pitch: TTEvent<MouseEvent | TouchEvent | undefined>;
        pitchend: TTEvent<MouseEvent | TouchEvent | undefined>;

        wheel: MapWheelEvent;
    }

    export type MapLayerEventType = {
        click: MapLayerMouseEvent<'click'>;
        dblclick: MapLayerMouseEvent<'dblclick'>;
        mousedown: MapLayerMouseEvent<'mousedown'>;
        mouseup: MapLayerMouseEvent<'mouseup'>;
        mousemove: MapLayerMouseEvent<'mousemove'>;
        mouseenter: MapLayerMouseEvent<'mouseenter'>;
        mouseleave: MapLayerMouseEvent<'mouseleave'>;
        mouseover: MapLayerMouseEvent<'mouseover'>;
        mouseout: MapLayerMouseEvent<'mouseout'>;
        contextmenu: MapLayerMouseEvent<'contextmenu'>;
        touchstart: MapLayerTouchEvent<'touchstart'>;
        touchend: MapLayerTouchEvent<'touchend'>;
        touchcancel: MapLayerTouchEvent<'touchcancel'>;
    };

    export type MapLayerMouseEvent<T extends 'mousedown' | 'mouseup' | 'click' | 'dblclick'
        | 'mousemove' | 'mouseover' | 'mouseenter' | 'mouseleave' | 'mouseout'
        | 'contextmenu'>
        = MapMouseEvent<T> & { features?: GeoJSON.Feature[] };

    export type MapLayerTouchEvent<T extends 'touchstart' | 'touchend' | 'touchcancel' | 'touchmove'>
        = MapTouchEvent<T> & { features?: GeoJSON.Feature[] };

    export interface MapMouseEvent<T extends 'mousedown' | 'mouseup' | 'click' | 'dblclick'
        | 'mousemove' | 'mouseover' | 'mouseenter' | 'mouseleave' | 'mouseout'
        | 'contextmenu'> extends TTEvent<MouseEvent> {
        type: T;
        point: tt.Point;
        lngLat: tt.LngLat;
        preventDefault(): void;
        defaultPrevented: boolean;
    }

    export interface MapTouchEvent<T extends 'touchstart' | 'touchend' | 'touchcancel' | 'touchmove'> extends TTEvent<TouchEvent> {
        type: T;
        point: tt.Point;
        lngLat: tt.LngLat;
        points: tt.Point[];
        lngLats: tt.LngLat[];
        preventDefault(): void;
        defaultPrevented: boolean;
    }

    export interface MapWheelEvent extends TTEvent<WheelEvent> {
        type: 'wheel';
        preventDefault(): void;
        defaultPrevented: boolean;
    }

    export class TTEvent<O extends unknown = undefined> {
        type: string;
        target: tt.Map;
        originalEvent: O;
    }

    export interface ErrorEvent extends TTEvent {
        type: 'error';
        error: Error;
    }

    export interface MapZoomEvent<T extends 'boxzoomstart' | 'boxzoomend' | 'boxzoomcancel'> extends TTEvent<MouseEvent> {
        type: T;
        boxZoomBounds: tt.LngLatBounds;
    }

    export interface MapContextEvent<T extends 'webglcontextlost' | 'webglcontextrestored'> extends TTEvent<WebGLContextEvent> {
        type: T;
    }

    export interface MapStyleDataEvent<T extends 'styledata' | 'styledataloading'> extends MapDataEvent<T> {
        dataType: 'style';
    }

    export interface MapSourceDataEvent<T extends 'sourcedataloading' | 'sourcedata'> extends MapDataEvent<T> {
        dataType: 'source';
        isSourceLoaded: boolean;
        source: Source;
        sourceId: string;
        sourceDataType: 'metadata' | 'content';
        tile: any;
        coord: tt.PointLike;
    }

    export interface MapDataEvent<T extends 'dataloading' | 'data' | 'tiledataloading' | 'sourcedataloading' | 'sourcedata'
        | 'styledata' | 'styledataloading'> extends TTEvent {
        dataType: string;
        type: T;
    }

    export type Listener<E extends TTEvent<unknown> = TTEvent> = (e: E) => void;

    /**
     * The TomTomAttributionControl control presents the map's attribution information. We have provided functionality
     * to extend it: you are able to add a HTML part to our control.
     * @example
     * ```javascript
     * var map = tt.map({ ... });
     * var attributions = ['<a href="https://www.tomtom.com/mapshare/tools/">Report map issue</a>'];
     * map.getAttributionControl().addAttribution(attributions);
     *
     * @class TomTomAttributionControl
     * @constructor
     */
    export class TomTomAttributionControl extends AttributionControl {
        /**
         * Adds the HTML content of the attribution control.
         * @param toAdd Text that will be added to attributions.
         * When multiple attributions are provided, "|" should be used as a separator.
         */
        addAttribution(toAdd: string): void;

        /**
         * Gets currently set separator, which will be used when merging attributions together.
         * Default: ' | '
         * @returns string
         */
        getSeparator(): string;

        /**
         * Removes the HTML content of the attribution control.
         * @param toRemove Text that will be removed from the attributions.
         */
        removeAttribution(toRemove: string): void;

        /**
         * This method allows you to override default (' | ') separator, which is used when merging few attributions together.
         * @param separator New separator.
         */
        setSeparator(separator: string): void;
    }
}
