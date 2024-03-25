interface CurrentPlayerActionProps {}

export const CurrentPlayerAction = ({}: CurrentPlayerActionProps) => {
  return (
    <div className="toolbar">
      <div className="item">
        <span className="number">1</span>
        <div className="value">Quarter</div>
      </div>
      <div className="item">
        <span className="number">2</span>
        <div className="value">Half</div>
      </div>
      <div className="item">
        <span className="number">3</span>
        <div className="value">Full</div>
      </div>
      <div className="item">
        <span className="number number_left">4 </span>
        <span className="number">5</span>
      </div>
      <div className="item">
        <span className="number">5</span>
        <div className="value">Raise</div>
      </div>
      <div className="item">
        <span className="number">7</span>
        <div className="value">Call</div>
      </div>
      <div className="item">
        <span className="number">8</span>
        <div className="value">Fold</div>
      </div>
      <div className="item">
        <span className="number">9</span>
        <div className="value">All in</div>
      </div>
    </div>
  )
}
