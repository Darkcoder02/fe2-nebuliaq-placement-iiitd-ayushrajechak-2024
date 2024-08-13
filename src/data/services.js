const services = {
  nodes: [
    {
      id: "Service A",
      port: "8080",
      namespace: "default",
      cluster: "cluster-1",
      invocations: 1000,
      successRate: 95,
      type: "HTTP",
      icon:'https://cdn-icons-png.flaticon.com/512/1674/1674969.png'
    },
    {
      id: "Service B",
      port: "9090",
      namespace: "default",
      cluster: "cluster-1",
      invocations: 800,
      successRate: 80,
      type: "gRPC",
      icon:'https://avatars.githubusercontent.com/u/19352526?s=280&v=4'
    },
    {
      id: "Service C",
      port: "7070",
      namespace: "k8s",
      cluster: "cluster-2",
      invocations: 1500,
      successRate: 99,
      type: "MySQL",
      icon:"https://static-00.iconduck.com/assets.00/database-mysql-icon-1849x2048-81vgyimd.png"
    },
    { id: "Service D", port: 8083, namespace: "default", cluster: "cluster-3", invocations: 100, successRate: 50, type: "Redis", icon: "https://static-00.iconduck.com/assets.00/redis-icon-2048x1749-do6trbyo.png" },
    { id: "Service E", port: 8084, namespace: "default", cluster: "cluster-2", invocations: 400, successRate: 20, type: "Kafka", icon: "https://e7.pngegg.com/pngimages/630/547/png-clipart-kafka-vertical-logo-tech-companies-thumbnail.png" },
    { id: "Service F", port: 8085, namespace: "default", cluster: "cluster-1", invocations: 250, successRate: 34, type: "OpenAI", icon: "https://static-00.iconduck.com/assets.00/openai-icon-2021x2048-4rpe5x7n.png" },
  ],
  links: [
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
    { source: "Service C", target: "Service D", invocations: 200, latency: "40ms" },
    { source: "Service D", target: "Service E", invocations: 100, latency: "50ms" },
    { source: "Service E", target: "Service F", invocations: 300, latency: "25ms" },
    { source: "Service F", target: "Service A", invocations: 100, latency: "15ms" },
  ],
};

export default services;