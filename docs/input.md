# Input

|Property|Type|Description|
|---|---|---|
|type|String|The type of input. Refer to types below|
|isTemplate|Boolean|A template input has special properties and the label cannot be changed. Only one of each template fields appear per lightbox. Refer to types below|
|label|String|The input identifer|
|placeholder|String|The placeholder value that will appear in the input|
|isRequired|Boolean|If the lightbox form can be submitted without the entrant filling out this input|
|dropdownOptions|Array of Strings|If the type is a dropdown then this is the list of the values that appear in the dropdown|
|espValue|String|The brand ESP field that this input is mapped to|

### Types
|Type|Template?|Description|
|---|---|---|
|phone|Y||
|email|Y||
|firstName|Y||
|lastName|Y||
|zipCode|Y||
|birthday|Y|Date picker|
|city|Y||
|state|Y|Dropdown with states|
|customText||Can be reused as needed|
|customDropdown||Can be reused as needed. The `dropdownOptions` property contains the options|