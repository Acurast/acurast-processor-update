const versions = require("./versions.json");

// This file valides that the versions.json file is structured correctly.

// On the top level, there should be an object with two keys: "0" for android and "1" for ios.
// Each of these objects should have a number as the key (build number) and the value should be a string (human readable version).
// The string should be a valid semver version.

const platforms = {
    android: 0,
    ios: 1
}

function validateVersions(versions) {
    // Check if versions object exists and has the required platforms
    if (!versions || typeof versions !== 'object') return false;
    if (!versions[platforms.android] || !versions[platforms.ios]) return false;

    // Check if each platform contains valid version mappings
    for (const platform of [platforms.android, platforms.ios]) {
        const platformVersions = versions[platform];

        // Check if platform versions is an object
        if (typeof platformVersions !== 'object') return false;

        // Check each version entry
        for (const [buildNumber, version] of Object.entries(platformVersions)) {
            // Build number should be a numeric string
            if (!/^\d+$/.test(buildNumber)) return false;

            // Version should be a string matching semver-like pattern
            if (typeof version !== 'string') return false;
            if (!/^\d+\.\d+\.\d+(?:[-][a-zA-Z\d]+)?$/.test(version)) return false;
        }
    }

    return true;
}

// Validate versions on import
if (!validateVersions(versions)) {
    throw new Error('Invalid versions.json structure');
}
