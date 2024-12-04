// ==UserScript==
// @name             Croatian WMS layers
// @namespace        https://greasyfork.org/en/users/1366579-js55ct
// @description      Displays layers from Croatian WMS services in WME
// @version          2024.12.04.03
// @author           JS55CT
// @match            https://*.waze.com/*/editor*
// @match            https://*.waze.com/editor
// @exclude          https://*.waze.com/user/editor*
// @downloadURL      https://update.greasyfork.org/scripts/519676/Croatian%20WMS%20layers.user.js
// @updateURL        https://update.greasyfork.org/scripts/519676/Croatian%20WMS%20layers.user.js
// @grant            unsafeWindow
// @license          MIT
// ==/UserScript==

/*  Scripts modified from Czech WMS layers (https://greasyfork.org/cs/scripts/35069-czech-wms-layers) orgianl authors: petrjanik, d2-mac, MajkiiTelini */

(function () {

var W;
var OL;
var I18n;
var ZIndexes = {};

const scriptMetadata = GM_info.script;
const scriptName = scriptMetadata.name;
const debug = false;

function init(e) {
  if (debug) console.log(`${scriptName}: Croatian WMS layers Script Started......`);

  W = unsafeWindow.W;
  OL = unsafeWindow.OpenLayers;
  I18n = unsafeWindow.I18n;

  ZIndexes.base = W.map.olMap.Z_INDEX_BASE.Overlay + 10;
  ZIndexes.overlay = W.map.olMap.Z_INDEX_BASE.Overlay + 150;
  ZIndexes.popup = W.map.olMap.Z_INDEX_BASE.Popup + 150;

  var groupTogglerHRV = addGroupToggler(false, "layer-switcher-group_hok", "WMS Croatia");

  // where .params.VERSION >= "1.3.0" use "CRS:" else use  "SRS:"" for the Coordinate System Value
  // New Croatian WMS service definition

  var service_wms_dgu_hok = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "HOK",
      CRS: "EPSG:3765",
      STYLES: "raster", 
    },
    attribution: "WMS Državne geodetske uprave RH - Hrvatska osnovna karta",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_dgu_tk25 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "TK25",
      CRS: "EPSG:3765",
      STYLES: "raster", 
    },
    attribution: "WMS Državne geodetske uprave RH - Topografska karta 1:25000",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_dgu_tk25 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "TK25",
      CRS: "EPSG:3765",
      STYLES: "raster", 
    },
    attribution: "WMS Državne geodetske uprave RH - Topografska karta 1:25000",
    tileSize: new OL.Size(512, 512),
  };

  var service_katastarska_opcina = {
    type: "WMS",
    url: "http://geoportal.dgu.hr/services/auth/rpj/ows?SERVICE=WMS&authKey=c24b3b67-05a2-4178-9cd4-f2e9cdb5ea59&",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "katastarska_opcina", 
      CRS: "EPSG:3857", 
      STYLES: "rpj_katastarska_opcina",
    },
    attribution: "WMS servis Državne geodetske uprave - Katastarska Općina",
    comment: "Katastralne općine Hrvatske"
  };


  var serviceCadastralZoning = {
    type: "WMS",
    url: "https://api.uredjenazemlja.hr/services/inspire/cp_wms/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "CP.CadastralZoning",
      CRS: "EPSG:3765", 
      STYLES: "CP.CadastralZoning.Default",
    },
    attribution: "Katastarske čestice i katastarske općine - WMS",
    tileSize: new OL.Size(512, 512),
  };

  var serviceCadastralParcel = {
    type: "WMS",
    url: "https://api.uredjenazemlja.hr/services/inspire/cp_wms/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "CP.CadastralParcel",
      CRS: "EPSG:3765", 
      STYLES: "CP.CadastralParcel.Default",
    },
    attribution: "Katastarske čestice i katastarske općine - WMS",
    tileSize: new OL.Size(512, 512),
  };

  //House Numbers
  var service_kucni_broj = {
    type: "WMS",
    url: "http://geoportal.dgu.hr/services/auth/rpj/ows?SERVICE=WMS&authKey=c24b3b67-05a2-4178-9cd4-f2e9cdb5ea59&",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true", 
      LAYERS: "kucni_broj",
      CRS: "EPSG:3857",
      STYLES: "kucni_broj",
    },
    attribution: "WMS servis Državne geodetske uprave - Kucni Broj",
    comment: "House numbers layer"
  };

  // Streets
  var service_ulica = {
    type: "WMS",
    url: "http://geoportal.dgu.hr/services/auth/rpj/ows?SERVICE=WMS&authKey=c24b3b67-05a2-4178-9cd4-f2e9cdb5ea59&",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true", 
      LAYERS: "ulica",
      CRS: "EPSG:3857",
      STYLES: "ulica",
    },
    attribution: "WMS servis Državne geodetske uprave - ulica",
    comment: "Street Names"
  };



  var service_wms_orthophoto_2022 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/services/inspire/orthophoto_2022/ows",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "OI.OrthoimageCoverage",
      CRS: "EPSG:3765",
      STYLES: "raster",
    },
    attribution: "Digitalni ortofoto u mjerilu 1:5000_2022. godina",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_orthophoto_2021 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/services/inspire/orthophoto_2021/ows",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "OI.OrthoimageCoverage",
      CRS: "EPSG:3765",
      STYLES: "raster",
    },
    attribution: "Digitalni ortofoto u mjerilu 1:5000_2021. godina",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_orthophoto_2020 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/services/inspire/orthophoto_2020/ows",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "OI.OrthoimageCoverage",
      CRS: "EPSG:3765",
      STYLES: "raster",
    },
    attribution: "Digitalni ortofoto u mjerilu 1:5000_2020. godina",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_orthophoto_2014_2016 = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/services/inspire/orthophoto_2014-2016/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "OI.OrthoImagery",
      CRS: "EPSG:3765",
      STYLES: "raster",
    },
    attribution: "GeoPortal DGU - Digitalni ortofoto 2014-2016",
    tileSize: new OL.Size(512, 512),
  };

  var service_wms_orthophoto_Zagreb = {
    type: "WMS",
    url: "https://geoportal.dgu.hr/services/inspire/orthophoto_1000/wms",
    params: {
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetMap",
      FORMAT: "image/png",
      TRANSPARENT: "true",
      LAYERS: "OI.OrthoimageCoverage",
      CRS: "EPSG:3765",
      STYLES: "OI.OrthoimageCoverage.Default",
    },
    attribution: "GeoPortal DGU - Digitalni ortofoto 2014-2016",
    tileSize: new OL.Size(512, 512),
  };

  //menu
  var WMSLayerTogglers = {};
  // Add WMS layers
  WMSLayerTogglers.wms_hok5 = addLayerToggler(groupTogglerHRV, "Base Map (HOK)", [addNewLayer("Croatia:wms_dgu_hok", service_wms_dgu_hok , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_hok5 = addLayerToggler(groupTogglerHRV, "Base Map (Topographic)", [addNewLayer("Croatia:wms_dgu_tk25", service_wms_dgu_tk25 , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Općina (Municipality)", [addNewLayer("Croatia:wms_katastarska_opcina", service_katastarska_opcina , ZIndexes.overlay, 1.0)]); //notworking
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Cadastral Zoning", [addNewLayer("Croatia:wms_cadastralZoning", serviceCadastralZoning , ZIndexes.overlay, 1.0)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Cadastral Parcels", [addNewLayer("Croatia:wms_cadastralParcels", serviceCadastralParcel , ZIndexes.overlay, 1.0)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Ulica (Street Name)", [addNewLayer("Croatia:wms_ulica", service_ulica , ZIndexes.overlay, 1.0)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Kucni Broj (House #)", [addNewLayer("Croatia:wms_kucni_broj", service_kucni_broj , ZIndexes.overlay, 1.0)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Orthophoto 2022", [addNewLayer("Croatia:wms_orthophoto_2022", service_wms_orthophoto_2022 , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Orthophoto 2021", [addNewLayer("Croatia:wms_orthophoto_2021", service_wms_orthophoto_2021 , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Orthophoto 2020", [addNewLayer("Croatia:wms_orthophoto_2020", service_wms_orthophoto_2020 , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Orthophoto 2014-16", [addNewLayer("Croatia:wms_orthophoto_2014_2016", service_wms_orthophoto_2014_2016 , ZIndexes.base, 0.6)]);
  WMSLayerTogglers.wms_orthophoto = addLayerToggler(groupTogglerHRV, "Orthophoto ( Zagreb & Krapina-Zagorje)", [addNewLayer("Croatia:wms_orthophoto_Zagreb", service_wms_orthophoto_Zagreb , ZIndexes.base, 0.6)]);

  var isLoaded = false;
  window.addEventListener(
    "beforeunload",
    function () {
      if (localStorage && isLoaded) {
        var JSONStorageOptions = {};
        for (var key in WMSLayerTogglers) {
          JSONStorageOptions[key] = document.getElementById(WMSLayerTogglers[key].htmlItem).checked;
        }
        localStorage.WMSLayers = JSON.stringify(JSONStorageOptions);
      }
    },
    false
  );
  window.addEventListener(
    "load",
    function () {
      isLoaded = true;
      if (localStorage.WMSLayers) {
        var JSONStorageOptions = JSON.parse(localStorage.WMSLayers);
        for (var key in WMSLayerTogglers) {
          if (JSONStorageOptions[key]) {
            document.getElementById(WMSLayerTogglers[key].htmlItem).click();
          }
        }
      }
    },
    false
  );
  setZOrdering(WMSLayerTogglers);
  W.map.events.register("addlayer", null, setZOrdering(WMSLayerTogglers));
  W.map.events.register("removelayer", null, setZOrdering(WMSLayerTogglers));
  W.map.events.register("moveend", null, setZOrdering(WMSLayerTogglers));

  if (debug) console.log(`${scriptName}: Croatian WMS layers Script Loaded`);
  
}

/**********************************************************************************************
OL.Layer.WMS(name (String), url (String), params (Object), options (Object, optional) )

params (Object): This object contains key-value pairs of parameters to send to the WMS service. Common parameters include:
* LAYERS: Specifies the names of the layers you want to request from the WMS service.
* TRANSPARENT: Usually set to "true" to request transparent images that can be overlaid on other layers.
* FORMAT: The image format for the tiles, commonly "image/png" for transparency.
* VERSION: The version of the WMS request protocol, such as "1.1.1" or "1.3.0".
* STYLES: Defines styles to apply to layers, often an empty string if default styles are desired.

options (Object, optional): This optional object provides additional configuration options for the layer. Common options include:
* opacity: Sets the opacity of the layer, typically between 0 (fully transparent) and 1 (fully opaque).
* isBaseLayer: Boolean value indicating whether this layer is a base layer.
* projection: Defines the spatial reference system for the layer.
* tileSize: Specifies the size of the tile as an OL.Size object.
* attribution: Provides attribution text for the layer, often displayed on the map to give credit to data providers.
***************************************************************************************************/

function addNewLayer(id, service, zIndex = 0, opacity = 1) {
  if (debug) console.log(`${scriptName}: addNewKayer() called for: ${id}`);

  var newLayer = {};

  // Determine if CRS or SRS should be used
  const wmsVersion = service.params.VERSION || "1.3.0"; // Default to 1.3.0 if not specified
  const coordinateSystemParam = wmsVersion >= "1.3.0" ? "CRS" : "SRS";

  // Set the appropriate coordinate reference system
  const coordinateSystemValue = service.params[coordinateSystemParam] || "EPSG:3765"; // Default to EPSG:3765 for Croatia

  newLayer.zIndex = zIndex == 0 ? ZIndexes.overlay : zIndex;
  newLayer.layer = new OL.Layer.WMS(
    id,
    service.url,
    {
      layers: service.params.LAYERS,
      transparent: service.params.TRANSPARENT || "true",
      format: service.params.FORMAT || "image/png",
      version: wmsVersion,
      [coordinateSystemParam]: coordinateSystemValue,
      styles: service.params.STYLES || "",
    },
    {
      opacity: opacity,
      tileSize: service.tileSize || new OL.Size(512, 512), // Use service-defined tile size if available
      isBaseLayer: false,
      visibility: true,
      transitionEffect: "resize",
      attribution: service.attribution,
      projection: new OL.Projection(coordinateSystemValue), //EPSG:3765 is specifically designed for use in Croatia.
    }
  );

  if (debug) console.log(`${scriptName}: addNewKayer() newLayer:`, newLayer);

  return newLayer;
}

function addGroupToggler(isDefault, layerSwitcherGroupItemName, layerGroupVisibleName) {
  var group;
  if (isDefault === true) {
    group = document.getElementById(layerSwitcherGroupItemName).parentElement.parentElement;
  } else {
    var layerGroupsList = document.getElementsByClassName("list-unstyled togglers")[0];
    group = document.createElement("li");
    group.className = "group";
    var togglerContainer = document.createElement("div");
    togglerContainer.className = "layer-switcher-toggler-tree-category";
    var groupButton = document.createElement("wz-button");
    groupButton.color = "clear-icon";
    groupButton.size = "xs";
    var iCaretDown = document.createElement("i");
    iCaretDown.className = "toggle-category w-icon w-icon-caret-down";
    iCaretDown.dataset.groupId = layerSwitcherGroupItemName.replace("layer-switcher-", "").toUpperCase();
    var togglerSwitch = document.createElement("wz-toggle-switch");
    togglerSwitch.className = layerSwitcherGroupItemName + " hydrated";
    togglerSwitch.id = layerSwitcherGroupItemName;
    togglerSwitch.checked = true;
    var label = document.createElement("label");
    label.className = "label-text";
    label.htmlFor = togglerSwitch.id;
    var togglerChildrenList = document.createElement("ul");
    togglerChildrenList.className = "collapsible-" + layerSwitcherGroupItemName.replace("layer-switcher-", "").toUpperCase();
    label.appendChild(document.createTextNode(layerGroupVisibleName));
    groupButton.addEventListener("click", layerTogglerGroupMinimizerEventHandler(iCaretDown));
    togglerSwitch.addEventListener("click", layerTogglerGroupMinimizerEventHandler(iCaretDown));
    groupButton.appendChild(iCaretDown);
    togglerContainer.appendChild(groupButton);
    togglerContainer.appendChild(togglerSwitch);
    togglerContainer.appendChild(label);
    group.appendChild(togglerContainer);
    group.appendChild(togglerChildrenList);
    layerGroupsList.appendChild(group);
  }
  
  if (debug) console.log(`${scriptName}: Group Toggler created for ${layerGroupVisibleName}`);

  return group;
}

function addLayerToggler(groupToggler, layerName, layerArray) {
  var layerToggler = {};
  layerToggler.layerName = layerName;
  var layerShortcut = layerName.replace(/ /g, "_").replace(".", "");
  layerToggler.htmlItem = "layer-switcher-item_" + layerShortcut;
  layerToggler.layerArray = layerArray;
  var layer_container = groupToggler.getElementsByTagName("UL")[0];
  var layerGroupCheckbox = groupToggler.getElementsByClassName("layer-switcher-toggler-tree-category")[0].getElementsByTagName("wz-toggle-switch")[0];
  var toggler = document.createElement("li");
  var togglerCheckbox = document.createElement("wz-checkbox");
  togglerCheckbox.id = layerToggler.htmlItem;
  togglerCheckbox.className = "hydrated";
  togglerCheckbox.appendChild(document.createTextNode(layerName));
  toggler.appendChild(togglerCheckbox);
  layer_container.appendChild(toggler);
  for (var i = 0; i < layerArray.length; i++) {
    togglerCheckbox.addEventListener("change", layerTogglerEventHandler(layerArray[i]));
    layerGroupCheckbox.addEventListener("change", layerTogglerGroupEventHandler(togglerCheckbox, layerArray[i]));
    layerArray[i].layer.name = layerName + (layerArray.length > 1 ? " " + i : "");
  }
  registerKeyShortcut("WMS: " + layerName, layerKeyShortcutEventHandler(layerGroupCheckbox, togglerCheckbox), layerShortcut);
  if (debug) console.log(`${scriptName}: Layer Toggler created for ${layerName}`);
  return layerToggler;
}

function registerKeyShortcut(actionName, callback, keyName) {
  I18n.translations[I18n.locale].keyboard_shortcuts.groups.default.members[keyName] = actionName;
  W.accelerators.addAction(keyName, { group: "default" });
  W.accelerators.events.register(keyName, null, callback);
  W.accelerators._registerShortcuts({ ["name"]: keyName });
}

function layerTogglerEventHandler(layerType) {
  return function () {
    if (this.checked) {
      W.map.addLayer(layerType.layer);
      layerType.layer.setVisibility(this.checked);
    } else {
      layerType.layer.setVisibility(this.checked);
      W.map.removeLayer(layerType.layer);
    }
  };
}

function layerKeyShortcutEventHandler(groupCheckbox, checkbox) {
  return function () {
    if (!groupCheckbox.disabled) {
      checkbox.click();
    }
  };
}

function layerTogglerGroupEventHandler(checkbox, layerType) {
  return function () {
    if (this.checked) {
      if (checkbox.checked) {
        W.map.addLayer(layerType.layer);
        layerType.layer.setVisibility(this.checked && checkbox.checked);
      }
    } else {
      if (checkbox.checked) {
        layerType.layer.setVisibility(this.checked && checkbox.checked);
        W.map.removeLayer(layerType.layer);
      }
    }
    checkbox.disabled = !this.checked;
  };
}

function layerTogglerGroupMinimizerEventHandler(iCaretDown) {
  return function () {
    var ulCollapsible = iCaretDown.parentElement.parentElement.parentElement.getElementsByTagName("UL")[0];
    if (!iCaretDown.classList.contains("upside-down")) {
      iCaretDown.classList.add("upside-down");
      ulCollapsible.classList.add("collapse-layer-switcher-group");
    } else {
      iCaretDown.classList.remove("upside-down");
      ulCollapsible.classList.remove("collapse-layer-switcher-group");
    }
  };
}

function setZOrdering(layerTogglers) {
  return function () {
    for (var key in layerTogglers) {
      for (var j = 0; j < layerTogglers[key].layerArray.length; j++) {
        if (layerTogglers[key].layerArray[j].zIndex > 0) {
          var l = W.map.getLayerByName(layerTogglers[key].layerName);
          if (l !== undefined) {
            l.setZIndex(layerTogglers[key].layerArray[j].zIndex);
          }
        }
      }
    }
  };
}

document.addEventListener("wme-map-data-loaded", init, { once: true });
})();
