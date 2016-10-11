[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# cordova-config-utils

This hook can update platform configuration files based on preferences and config-file data defined in your normal config.xml, that are normally not used/ignored by Cordova. Use-cases include e.g. on iOS setting `ENABLE_BITCODE = NO` or disabling Application Transport Security (ATS). Currently only the `AndroidManifest.xml`, iOS `*-Info.plist` and `*.xcodeproj/project.pbxproj` files are supported.

Based off [this awesome hook](https://github.com/diegonetto/generator-ionic/blob/master/templates/hooks/after_prepare/update_platform_config.js) from Diego Netto, thanks!

## Install
```
npm install cordova-config-utils
```
After install an `after_prepare` folder will be added to your `hooks` folder with the `011_update_config.js` script in it.

## Usage

You can use `<preference>` and `<config-file>` tags:

### Preferences

1.  Preferences defined outside of the platform element will apply to all platforms
2.  Preferences defined inside a platform element will apply only to the specified platform
3.  Platform preferences take precedence over common preferences
4.  The preferenceMappingData object contains all of the possible custom preferences to date including the  target file they belong to, parent element, and destination element or attribute Config Files

### Config-Files

1.  config-file elements MUST be defined inside a platform element, otherwise they will be ignored.
2.  config-file target attributes specify the target file to update. (AndroidManifest.xml or *-Info.plist)
3.  config-file parent attributes specify the parent element (AndroidManifest.xml) or parent key (*-Info.plist) that the child data will replace or be appended to.
4.  config-file elements are uniquely indexed by target AND parent for each platform.
5.  If there are multiple config-file's defined with the same target AND parent, the last config-file will be used
6.  Elements defined WITHIN a config-file will replace or be appended to the same elements relative to the parent element
7.  If a unique config-file contains multiples of the same elements (other than uses-permssion elements which are selected by by the uses-permission name attribute), the last defined element will be retrieved.

## Examples

### Android

```xml
<platform name="android">
  <!-- These preferences are actually available in Cordova by default although not currently documented -->
  <preference name="android-minSdkVersion" value="8" />
  <preference name="android-maxSdkVersion" value="19" />
  <preference name="android-targetSdkVersion" value="19" />
  <!-- Custom preferences examples -->
  <preference name="android-windowSoftInputMode" value="stateVisible" />
  <preference name="android-installLocation" value="auto" />
  <preference name="android-launchMode" value="singleTop" />
  <preference name="android-activity-hardwareAccelerated" value="false" />
  <preference name="android-manifest-hardwareAccelerated" value="false" />
  <preference name="android-configChanges" value="orientation" />
  <preference name="android-theme" value="@android:style/Theme.Black.NoTitleBar" />
  <config-file target="AndroidManifest.xml" parent="/*">
      <supports-screens
          android:xlargeScreens="false"
          android:largeScreens="false"
          android:smallScreens="false" />
      <uses-permission android:name="android.permission.READ_CONTACTS" android:maxSdkVersion="15" />
      <uses-permission android:name="android.permission.WRITE_CONTACTS" />
  </config-file>
</platform>
```
>NOTE: For possible manifest values see http://developer.android.com/guide/topics/manifest/manifest-intro.html

### iOS

```xml
<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSAppTransportSecurity">
      <dict>
        <key>NSAllowsArbitraryLoads</key><true/>
      </dict>
    </config-file>

    <config-file platform="ios" target="project.pbxproj">
      <build-property name="ENABLE_BITCODE" value="NO" />
    </config-file>
</platform>
```

## Notes
* Currently, items aren't removed from the platform config files if you remove them from config.xml.
For example, if you add a custom permission, build, then remove it, it will still be in the manifest.
* If you make a mistake, for example adding an element to the wrong parent, you may need to remove and add your platform, or revert to your previous manifest/plist file.
