const Graph = require('./graph');

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  describe('#addVertex', () => {
    it('should add vertex to graph', () => {
      const node = graph.addVertex('a');
      expect(node.value).toBe('a');
      expect(graph.nodes.size).toBe(1);
    });

    it('should not add duplicated values', () => {
      const node1 = graph.addVertex('a');
      const node2 = graph.addVertex('a');
      expect(graph.nodes.size).toBe(1);
      expect(node1).toBe(node2);
    });
  });

  describe('#removeVertex', () => {
    beforeEach(() => {
      graph.addVertex('a');
    });

    it('should remove vertex', () => {
      expect(graph.removeVertex('a')).toBe(true);
      expect(graph.nodes.size).toBe(0);
      expect(graph.removeVertex('a')).toBe(false);
    });
  });

  describe('#addEdge', () => {
    it('should create node if they dont exist', () => {
      graph.addEdge('a', 'b');
      expect(graph.nodes.size).toBe(2);
    });

    it('should add node a as adjacent of b', () => {
      const [a, b] = graph.addEdge('a', 'b');
      expect(a.adjacents.map(n => n.value)).toEqual(['b']);
      expect(b.adjacents.map(n => n.value)).toEqual([]);

      graph.addEdge('b', 'a');
      expect(b.adjacents.map(n => n.value)).toEqual(['a']);
    });

    it('should add both connection on undirected graph', () => {
      graph = new Graph(Graph.UNDIRECTED);
      const [a, b] = graph.addEdge('a', 'b');
      expect(a.adjacents.map(n => n.value)).toEqual(['b']);
      expect(b.adjacents.map(n => n.value)).toEqual(['a']);
    });
  });

  xdescribe('#removeEdge', () => {
    beforeEach(() => {
      graph.addEdge('a', 'b');
    });

    it('should remove edges if they exist', () => {
      const [a, b] = graph.removeEdge('a', 'b');
      expect(a.adjacents.map(n => n.value)).toEqual([]);
      expect(b.adjacents.map(n => n.value)).toEqual([]);
    });
  });
});