import DiamondObject from './DiamondObject';

// object3D key (from artist config) -> R3F component.
const OBJECTS = { diamond: DiamondObject };

export function getObject3D(key) {
  return OBJECTS[key] || DiamondObject;
}
