import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";
import { Fill, Stroke, Style, Circle } from "ol/style";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { FeatureLike } from "ol/Feature";

const schoolLayer = new VectorLayer({
  className: "schools",
  source: new VectorSource({
    url: "schools.json",
    format: new GeoJSON(),
  }),
  style: schoolStyle,
});

interface SchoolProperties {
  antall_elever: number;
}

type SchoolFeature = {
  getProperties(): SchoolProperties;
} & Feature<Point>;

function schoolStyle(feature: FeatureLike) {
  const schoolFeature = feature as FeatureLike;

  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "blue", width: 2 }),
      fill: new Fill({ color: "white" }),
      radius: 3 + schoolFeature.getProperties().antall_elever / 150,
    }),
  });
}

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
