// CSS geometry keeps the hero crisp at every size without a WebGL dependency.
export default function HeroSculpture() {
  return (
    <div className="hero-sculpture" aria-hidden="true">
      <div className="sculpture-stage" data-tilt>
        <div className="sculpture-floor" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="sculpture-float">
          <div className="core-cube">
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map(face => (
              <div key={face} className={`cube-face cube-${face}`}>
                <span className="cube-mark">{'</>'}</span>
                <span className="cube-corner cube-corner-tl" />
                <span className="cube-corner cube-corner-br" />
              </div>
            ))}
          </div>
        </div>
        <div className="floating-panel panel-code">
          <span className="panel-chrome"><i /><i /><i /><span>engineer.ts</span></span>
          <code><span className="code-purple">const</span> engineer = {'{'}<br />
            &nbsp; build: <span className="code-cyan">'end to end'</span>,<br />
            &nbsp; ship: <span className="code-cyan">'with confidence'</span><br />{'}'}</code>
        </div>
        <div className="floating-panel panel-deploy">
          <span className="deploy-symbol">↗</span>
          <span><strong>Code → Cloud</strong><small>build · deploy · observe</small></span>
        </div>
        <span className="sculpture-coordinate">01 / SYSTEM ARCHITECTURE</span>
        <span className="sculpture-spark spark-one" />
        <span className="sculpture-spark spark-two" />
      </div>
    </div>
  )
}
