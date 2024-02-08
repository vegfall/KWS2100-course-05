import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";

const schoolLayer = new VectorLayer({
  className: "schools",
  source: new VectorSource({
    url: "schools.json",
    format: new GeoJSON(),
  }),
});

export function SchoolLayerCheckbox() {
  const [checked, setChecked] = useState(false);

  useLayer(schoolLayer, checked);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} schools
      </label>
    </div>
  );
}
