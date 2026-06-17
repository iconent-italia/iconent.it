import IconPendant from './IconPendant';

// object3D key (from artist config) -> R3F component.
// Tony Effe: ciondolo "17" + Colosseo + 777. `diamond` resta alias per retro-compat.
const OBJECTS = { pendant17: IconPendant, diamond: IconPendant };

export function getObject3D(key) {
  return OBJECTS[key] || IconPendant;
}
