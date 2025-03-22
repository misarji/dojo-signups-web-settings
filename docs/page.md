# Page
|Property|Type|Mobile?|Description|
|---|---|---|---|
|title|Object|Y|The content and settings for the title. More information below|
|subtitle|Object|Y|The content and settings for the subtitle. More information below|
|heroImage|Object||The settings for the hero image. More information below|
|addInput|Function||Takes an instance of Input. Adds an input to the page. Removes it if it appears on any other page|
|removeInput|Function||Takes an instance of Input.Removes an input from the page|
|isDeletable|Boolean||If the page can be deleted. Currently pages with the phone input cannot be deleted|
|primaryButton|Object|Y|The content for the primary button. More information below|
|secondaryButton|Object|Y|The content for the secondary button. More information below|

### Title and subtitle
|Property|Type|Description|
|---|---|---|
|content|String|The content of the title. Generated HTML from a WYSIWYG|
|isViewable|Boolean|Set to false to hide this section|

### Hero image
|Property|Type|Description|
|---|---|---|
|url|String(url)|Link to the image|
|fileName|String|Original file name(image.jpg)|

### Primary and secondary buttons
|Property|Type|Description|
|---|---|---|
|content|String|The content of the buttons. Generated HTML from a WYSIWYG|
|isViewable|Boolean|If the button should be hidden. Secondary button only|