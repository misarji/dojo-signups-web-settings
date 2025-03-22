# Hook: useLightboxSettings

|Property|Type|Description|
|---|---|---|
|isLoaded|boolean|If the settings data has been loaded and can be used. Do not use the settings instance while this is false.
|setSettings|function|Pass the raw lightbox settings JSON into this function to set the settings|
|create|function|Create a brand new lightbox setting instance. More information below. Requires values.|
|getSettings|Instance|Instance of the settings Class. Will be null if data is not provided using `setSettings` or `create`.|
|getInput|function|creates a new input. Refer to the input docs. The input can then be added to a page.|
|isUpdated|boolean|true if a change has been made to the settings|
|resetIsUpdated|func|resets isUpdated back to false|
### Create
This function requires an argument with an object containing the brand name and ID.
```
{
  name: 'DojoMojo',
  brandId: 123,
}
```