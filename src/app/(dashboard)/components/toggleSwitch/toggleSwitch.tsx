"use client";

const ToggleSwitch = () => {
  return (
	<>
		<label className="switch-button" htmlFor="switch">
            <div className="switch-outer">
              <input id="switch" type="checkbox" />
              <div className="button">
                <span className="button-toggle"></span>
                <span className="button-indicator"></span>
              </div>
            </div>
        </label>
	</>
  )
}

export default ToggleSwitch;