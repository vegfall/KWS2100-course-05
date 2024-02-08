import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";
import { Fill, Stroke, Style, Circle } from "ol/style";

const schoolLayer = new VectorLayer({
  className: "schools",
  source: new VectorSource({
    url: "schools.json",
    format: new GeoJSON(),
  }),
  style: new Style({
    image: new Circle({
      stroke: new Stroke({ color: "blue", width: 2 }),
      fill: new Fill({ color: "white" }),
      radius: 4,
    }),
  }),
});

export function SchoolLayerCheckbox() {
  const [checked, setChecked] = useState(true);

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
