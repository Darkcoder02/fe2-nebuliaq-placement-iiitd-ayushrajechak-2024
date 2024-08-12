import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";

function NodeGraph({ data }) {
  const svgRef = useRef();
  const [graphData, setGraphData] = useState(data);

  useEffect(() => {
    const width = 800;
    const height = 800;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((event, d) => {
        if (d.source && d.target) {
          return `<strong>From:</strong> ${d.source.id}<br/><strong>To:</strong> ${d.target.id}<br/><strong>Invocations:</strong> ${d.invocations}<br/><strong>Latency:</strong> ${d.latency}`;
        } else {
          return `<strong>${d.id}</strong><br/>Invocations: ${d.invocations}<br/>Success Rate: ${d.successRate}%<br/>Type: ${d.type}<br/> Cluster: ${d.cluster}<br/>Port: ${d.port}`;
        }
      });

    svg.call(tip);

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d) => d.id)
          .distance(200)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => Math.sqrt(d.invocations))
      .attr("stroke", "#ECF87F")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("r", 30)
      .attr("fill", (d) => {
        const successRate = d.successRate;
        const color = d3.interpolateRdYlGn(successRate / 100);
        return color;
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    const images = svg
      .selectAll("image")
      .data(graphData.nodes)
      .enter()
      .append("image")
      .attr("xlink:href", (d) => d.icon)
      .attr("x", (d) => d.x - 15)
      .attr("y", (d) => d.y - 15)
      .attr("width", 30)
      .attr("height", 30)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

    svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graphData.nodes)
      .enter()
      .append("text")
      .attr("dx", 35)
      .attr("dy", 8)
      .text((d) => d.id)
      .attr("fill", "#1E5162");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      images.attr("x", (d) => d.x - 15).attr("y", (d) => d.y - 15);

      svg
        .selectAll(".labels text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [graphData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newNode = {
      id: form.nodeId.value,
      port: form.port.value,
      namespace: form.namespace.value,
      cluster: form.cluster.value,
      invocations: parseInt(form.invocations.value, 10),
      successRate: parseInt(form.successRate.value, 10),
      type: form.type.value,
      icon: form.icon.value,
    };

    const newLink = {
      source: form.source.value,
      target: form.target.value,
      invocations: parseInt(form.linkInvocations.value, 10),
      latency: form.latency.value,
    };

    setGraphData((prevData) => ({
      nodes: [...prevData.nodes, newNode],
      links: [...prevData.links, newLink],
    }));

    form.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-9/12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-100 p-4 rounded-lg"
        >
          <h3 className="font-bold text-2xl">Add a New Node</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Node Name:"
              type="text"
              name="nodeId"
              required
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="port"
              required
              className="p-2 border rounded-md"
              placeholder="Port:"
            />
            <input
              type="text"
              name="namespace"
              required
              className="p-2 border rounded-md"
              placeholder="Namespace"
            />
            <input
              type="text"
              name="cluster"
              required
              className="p-2 border rounded-md"
              placeholder="Cluster"
            />
            <input
              type="number"
              name="invocations"
              required
              className="p-2 border rounded-md"
              placeholder="Invocations"
            />

            <input
              type="number"
              name="successRate"
              required
              className="p-2 border rounded-md"
              placeholder="Success Rate"
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-2 mt-2">
            <input
              type="text"
              name="type"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Type"
            />
            <input
              type="text"
              name="icon"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Icon URL"
            />
          </div>

          <h3 className="font-bold text-2xl my-4">Add a New Link</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="source"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Source"
            />

            <input
              type="text"
              name="target"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Target"
            />

            <input
              type="number"
              name="linkInvocations"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Invocations"
            />

            <input
              type="text"
              name="latency"
              required
              className="p-2 border rounded-md w-full"
              placeholder="Latency"
            />
          </div>

          <button
            className="p-4 bg-slate-500 inline-flex justify-center my-4 rounded-md"
            type="submit"
          >
            Add Node and Link
          </button>
        </form>
      </div>
      <p className="mt-2 text-xl">Scroll Down</p>
      <svg ref={svgRef}></svg> 
    </div>
  );
}

export default NodeGraph;
