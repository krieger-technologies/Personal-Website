// Slim Plotly build: the full plotly.js bundle ships every trace type (3D, gl,
// maps, finance...), but the site only draws a bar chart and a US choropleth.
// Registering just those two keeps the projects chunk small.
import Plotly from "plotly.js/lib/core";
import bar from "plotly.js/lib/bar";
import choropleth from "plotly.js/lib/choropleth";
import createPlotlyComponent from "react-plotly.js/factory";

Plotly.register([bar, choropleth]);

const Plot = createPlotlyComponent(Plotly);

export default Plot;
