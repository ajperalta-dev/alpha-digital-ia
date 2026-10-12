const layers = [
  [{ x: 35, y: 35 }, { x: 35, y: 85 }, { x: 35, y: 135 }],
  [{ x: 130, y: 20 }, { x: 130, y: 65 }, { x: 130, y: 110 }, { x: 130, y: 155 }],
  [{ x: 230, y: 35 }, { x: 230, y: 85 }, { x: 230, y: 135 }],
  [{ x: 325, y: 60 }, { x: 325, y: 110 }],
];

export function NeuralReveal({ lang }: { lang: 'es' | 'en' }) {
  return (
    <div className="alpha-neural-reveal absolute top-6 bottom-28 left-6 right-6 flex flex-col justify-center" aria-hidden="true">
      <svg viewBox="0 0 360 180" className="min-h-0 w-full flex-1 overflow-visible" fill="none">
        {layers.slice(0, -1).flatMap((layer, layerIndex) => layer.flatMap((from, fromIndex) =>
          layers[layerIndex + 1].map((to, toIndex) => (
            <g key={`${layerIndex}-${fromIndex}-${toIndex}`}>
              <path d={`M${from.x} ${from.y}L${to.x} ${to.y}`} stroke="currentColor" className="text-cyan-500/30" />
              <path d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength="100"
                stroke={layerIndex === 2 ? '#d5b45b' : '#22d3ee'} strokeWidth="1.5"
                className="alpha-neural-signal" style={{ animationDelay: `${layerIndex * .4 + toIndex * .15 + fromIndex * .08}s` }} />
            </g>
          ))))}
        {layers.flatMap((layer, layerIndex) => layer.map((node, nodeIndex) => (
          <g key={`${layerIndex}-${nodeIndex}`}>
            <circle cx={node.x} cy={node.y} r="12" className="alpha-neural-node"
              stroke={layerIndex === 3 ? '#d5b45b' : '#22d3ee'} strokeWidth="1.5"
              style={{ animationDelay: `${layerIndex * .3 + nodeIndex * .15}s` }} />
            <circle cx={node.x} cy={node.y} r="4" fill={layerIndex === 3 ? '#d5b45b' : '#22d3ee'} />
          </g>
        )))}
      </svg>
      <div className="flex justify-between px-2 pt-2 text-[9px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-200">
        <span>{lang === 'es' ? 'Datos' : 'Data'}</span>
        <span>{lang === 'es' ? 'Red neuronal' : 'Neural network'}</span>
        <span>{lang === 'es' ? 'Predicción' : 'Prediction'}</span>
      </div>
    </div>
  );
}
