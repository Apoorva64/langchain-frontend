import React, {useCallback} from 'react'
import type {Edge, EdgeTypes, Node, NodeTypes} from "reactflow";
import {addEdge, Background, Controls, MiniMap, OnConnect, ReactFlow, useEdgesState, useNodesState} from "reactflow";
import "reactflow/dist/style.css";

export const initialNodes = [
    {id: "a", type: "input", position: {x: 0, y: 0}, data: {label: "wire"}},
    {
        id: "b",
        type: "default",
        position: {x: -100, y: 100},
        data: {label: "drag me!"},
    },
    {id: "c", position: {x: 100, y: 100}, data: {label: "your ideas"}},
    {
        id: "d",
        type: "output",
        position: {x: 0, y: 200},
        data: {label: "with React Flow"},
    },
] satisfies Node[];

export const nodeTypes = {
    // Add any of your custom nodes here!
} satisfies NodeTypes;

export const initialEdges = [
    {id: "a->c", source: "a", target: "c", animated: true},
    {id: "b->d", source: "b", target: "d"},
    {id: "c->d", source: "c", target: "d", animated: true},
] satisfies Edge[];

export const edgeTypes = {
    // Add your custom edge types here!
} satisfies EdgeTypes;

function App() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        ><ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <Background/>
            <MiniMap/>
            <Controls/>
        </ReactFlow></div>
    );
}

export default App
