# Settings

|Property|Type|Mobile?|Description|
|---|---|---|---|
|type|String| |`popup`, `embed`. Defines the type of signup form|
|viewMode|String| |`desktop`, `mobile`. Gets and set the current view mode of the lightbox|
|name|String||Name of the lightbox.|
|status|String||`active`, `inactive`. Active is published|
|brandId|Integer||Sets and gets the brand ID|
|brandName|String|Name of the brand|
|termsUrl|String|Url of the brand's terms page|
|privacyUrl|String|Url of the brand's privacy page|
|domain|String(url)||Set and get the domain name where the lightbox will appear|
|launchedAt|Date||The date of the first time the campaign was set to published|
|createdAt|Date||The date of the first time this lightbox was saved|
|espSettings|Object||The esp settings where the entries will be added. More information below|
|trigger|Object||The rules that the lightbox follow to figure out when to open. More information below|
|heroImage|Object||Settings for the hero image in the lightbox. More information below|
|brandLogo|Object|Y|Settings for the brand logo. More information below|
|primaryButton|Object|Y|Settings for the primary button. More information below|
|secondaryButton|Object|Y|Settings for the secondary button. More information below|
|fields|Object|Y|Settings for the fields. More information below|
|autoCloseDelay|Number||Time (in seconds) when to close the lightbox after submission. Default: null|
|themeColors|Object|Y|The theme color settings. More information below|
|getSaveObj|Function||returns the JSON object of the settings. Can be used to send the settings to the backend or to the lightbox in the builder|
|addPage|Function||Returns an instance of Path. creates a new page and places it before the last one(Thank you page)|
|removePage|Function||Accepts an instance of a page which will then be removed. The last page and the page with the phone input cannot be deleted|
|pages|Array||Returns an array of Page instances|

### View Mode
The settings can have separate styles for the desktop and mobile versions. By default the mobile version does not exist and falls back to the desktop version. This way the brand has to only edit the desktop version and the mobile version will be updated as well. Most of the time the brand will want to have the same styles and content for both versions.

If a brand wants to edit or view the desktop version then the `viewMode` can be set to either `desktop` or `mobile`. When the mobile version of the lightbox is edited, the desktop and mobile designs will be separated from that moment on. Please make sure to keep this in mind. This applies to text too. A brand updating the text on mobile will also need to change it on the desktop version if they want to keep it consistent.

### ESP Settings
|Property|Type|Description|
|---|---|---|
|brandIntegrationId|Integer|Optional. ID of the selected ESP integration from the brand_integrations table|
|listId|String|Optional. ID of the selected list in the ESP|
|espDojoProperty|String|Optional. ESP property that DojoMojo can use to identify that the entry came from DojoMojo|

### Triggers
|Property|Type|Description|
|---|---|---|
|type|String|`immediately`, `exit`, `delay`. Options for when the lightbox will open|
|delay|Integer|If type delay then how many seconds to wait|
|displayFrequency|String|`never`, `every-session`, `delay`. Options for whether or not the lightbox will display for a user that has already closed in the past|
|displayFrequencyDelay|Integer|If type delay then how many days to wait before showing lightbox to user again|
|allowListUrls|Array of path objects|A list of paths which the lightbox can appear on. Path Object described below.|
|denyListUrls|Arrow of path objects|A list of paths which the lightbox should not appear on. Path Object described below.|

Types
- immediately - (default) Open the lightbox right away.
- exit - Open the lightbox when the user is leaving the page. Detected by moving the cursor beyond the top of the screen.
- delay - Open after a specified amount of seconds.

Display Frequency options
- never - Do not show to user again after they dismiss signup form once
- every-session - (default) Show to user every session regardless of previous dismissal
- delay - Delay showing signup form to user again until after a certain number of days (set by brand); defaults to 30 days.

Path Object
|Property|Type|Description|
|---|---|---|
|path|String|String to search in the path of the url.|
|type|String|`contain`, `exact`. How to match the given path to the path in the url.|

Paths search only the path part of the urls. i.e. in `https://www.google.com/user/5?fields=name` only the `/user/5?fields=name` will be searched. To select the home page add a path of type `exact` with the path `/`

Path Types
- contain - Searches url path for an instance of the specified path
- exact - the url path must exactly match the specified path.

### Hero Image
|Property|Type|Description|
|---|---|---|
|Position|String|`left`, `right`, `top`, `none`. Position of the hero image in the lightbox|

The image itself is set at the page level since each page can have its own image.

### Brand Logo
|Property|Type|Description|
|---|---|---|
|url|String|Link to the image|
|fileName|String|Original file name(image.jpg)|
|size|Integer|Size of the logo. //TODO determine the range|
|borderRadius|Integer|curve of the border radius. Default: 4|

### Primary and Secondary Buttons
|Property|Type|Description|
|---|---|---|
|design|String|Allowed button designs listed below|
|color|String|Hex value. Color of the design|
|borderRadius|Integer|curve of the border radius. Default: 4|

Designs
- Primary button: `filled`, `outline`
- Secondary button: `outline`, `text link`

### Fields
|Property|Type|Description|
|---|---|---|
|borderRadius|Integer|curve of the border radius. Default: 4|

### Theme Colors
|Property|Type|Description|
|---|---|---|
|background|String|Hex color|
|closeIcon|String|Hex color|
|legalText|String|Hex color|
|legalLinks|String|Hex color|
|inputBorder|String|Hex color|
|inputBackground|String|Hex color|
|inputPlaceholder|String|Hex color|
|inputText|String|Hex color|
