const services = {
  service: [
    {
      id: "Service A",
      port: "8080",
      namespace: "default",
      cluster: "cluster-1",
      invocations: 1000,
      successRate: 95,
      type: "HTTP",
    },
    {
      id: "Service B",
      port: "9090",
      namespace: "default",
      cluster: "cluster-1",
      invocations: 800,
      successRate: 80,
      type: "gRPC",
    },
    {
      id: "Service C",
      port: "7070",
      namespace: "k8s",
      cluster: "cluster-2",
      invocations: 1500,
      successRate: 99,
      type: "MySQL",
    },
  ],
  interactions: [
    {
      source: "Service A",
      target: "Service B",
      invocations: 500,
      latency: "200ms",
    },
    {
      source: "Service B",
      target: "Service C",
      invocations: 300,
      latency: "150ms",
    },
    {
      source: "Service A",
      target: "Service C",
      invocations: 200,
      latency: "100ms",
    },
  ],
};

export default services;