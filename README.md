# Croatian WMS Layers

![Version](https://img.shields.io/badge/version-2024.12.03.00-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

This is a user script designed for integrating Croatian WMS (Web Map Service) layers into the WME (Waze Map Editor). It allows users to view Croatian base maps, orthophotos, and cadastral layers directly within the WME interface.

## Features

- Display Croatian base map (HOK5).
- Overlay orthophoto imagery from 2014-2016.
- Display cadastral zoning and parcels.

## Installation

To install this user script, you'll need a userscript manager extension such as Tampermonkey or Greasemonkey. Once installed, follow these steps:

1. Download the script directly from [GreasyFork](https://greasyfork.org/en/users/1366579-js55ct).
2. Click the "Install this script" button.
3. The script will automatically be available in the WME interface.

## Usage

- Once installed, navigate to the WME.
- Use the layer toggler to switch between different map layers.
- Adjust layer opacity and order as needed.

## Supported Domains

The script is set to run on the following domains:
- `https://*.waze.com/*/editor*`
- `https://*.waze.com/editor`

## Configuration

This script uses the following configurations for WMS services:

- **Base Map (HOK5):** Hrvatska osnovna karta WMS service.
- **Orthophoto 2014-2016:** GeoPortal DGU service.
- **Cadastral Zoning:** Katastarske čestice i katastarske općine WMS.
- **Cadastral Parcels:** Katastarske čestice i katastarske općine WMS.

## Technical Details

- The script initializes with essential Waze components, including the map and internationalization modules.
- Custom functions are used to add layers, manage toggler behavior, and handle key shortcuts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Scripts modified from Czech WMS layers:
- Authors: petrjanik, d2-mac, MajkiiTelini

[GitHub repository](https://github.com/JS55CT/WME-Croatian-WMS-Map).