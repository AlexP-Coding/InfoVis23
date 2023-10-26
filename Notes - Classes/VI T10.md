# Relationsips

Items can be related to each other through:
- Hierarchy
- ...

## Node-Link
We care more about topology (what is connected to what) than geometry (where things are)

We can change node-link expressivenes:
- Node size
- Color hue
- Link shape

Scalability suffers though, space-wise for example

### Directed vs Non-Directed Graphs
Non-directed graphs:
- Degree (# connected nodes)

Directed graphs:
- In-degree (in-links)
- Out-degree (out-links)

### Tasks achievable
Topology-based:
- Adjacency
- Common connections
- Connections
- Cycles

Attribute-based:
- Degree of node
- Most connected nodes
- Shortest path

One mark used for nodes, another for links

### Principles
Approach to edges/links:
- Minimize crossings
- Minimize total edge len (so we dont get lost)
- Minimize overall area
- Minimize longest edge
- Uniform edge len
- Straight lines or at least curves to minimize len

Overall:
- Every node visible
- For every node we can count its degree
- Can follow every link
- (Meaningful) Clusters easily identifiable

### Usage
Social Networks:
- Person who is bridge
- Person who everyone tends to know

### Algorithms
Force-Directed Graph:
- Nodes have weights and are connected by springs
- Close together -> force pushes nodes away
- Far away -> force pushes closer
- Issues:
    - Take awhile to understand 
    - Poor reproducibility
    - Unstable
    - Hard to keep context
    - Still hell with scalability (e.g.: hairballs)

Trees:
- Graphs with no cycles
- Directed edges
- Root of tree, special node (does not need to be the top tho)
- Tend to start narrow at top and enlarge
- Scalability issue due to several descendants
- Variants:
    - Radial tree (root node goes at center, different nodes can be determined to be the center):
        - Bubble tree (spreads children in bubble around the node)
        - Hyperbolic tree (depicted on hyperbolic plane, edges on edge of sphere; vis always fits, esp. if we change the center node) 
    - Dendograph (agregation results, like sports)


## Non-Node links
Adjacency matrix:
- More scalable, so good alternative to large graphs
- Reorder lines and columns to make information clearer

Tree-Map:
- Regions partitioned by Hierarchy
- Size usually has a given meaning
- Color of areas might have a meaning as well
- We may zoom in into region (like selecting new root node)
- Work for up to 1M items
- Square file algorithm, that tries to make marks square-like
- Issue - we're not good at comparing areas, so value estimate is not great
- Structure notion is less good

Chord Diagrams:
- Links are archs around the circle
- Not great for scalability
- Variants:
    - Lines
    -Areas (depending on connection strength)
- Fix cluttering 
    - Edge bundling:
        1. When there's lots of links from the same area, converge them into a thicker line
        2. The ticker line will move toward the edge of the circle where the links are going
        3. They only split again into narrower bundles the closer to the destination
        4. End up splitting all the way to go to respective location
    - Arc diagrams:
        - Good for data with identifiable order