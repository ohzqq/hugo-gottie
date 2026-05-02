

import "/gottie/wasm_exec.js"
import "/gottie/dotlottie.js"

const tmpl = document.createElement("template")
tmpl.id = "gottie-player-template"
tmpl.innerHTML = `
      <template id="canvas-slot">
      <div class="gottie-player-canvas" slot="canvas" style="">
        <canvas class="gottie-canvas" style="width: 100%;height:100%;"></canvas> 
      </div>
      </template>
      <template id="controls-slot"> 
	<div class="gottie-controls">
		<div class="gottie-left-controls">
			<button class="gottie-control-btn gottie-play-btn" 
              data-state="" 
							title="play"></button>
			<button class="gottie-control-btn gottie-loop-btn" 
              data-state="loop-on" 
							title="loop"></button>
		</div>
		<div class="gottie-middle-controls">
			<input min="0" 
						 class="gottie-timeline-slider" 
             max="" step="1" type="range" value="0"></input>
		</div>

		<div class="gottie-right-controls">
      <span class="gottie-settings"> 
				<button class="gottie-control-btn gottie-settings-btn" 
								title="settings"></button>
			<div class="gottie-settings-menu">
				<div class="gottie-settings-content">
					<div role="" class="gottie-mode-selector gottie-settings-item">
						<div class="gottie-settings-label">mode</div>
						<div role="group" class="gottie-settings-item-content"> 
							<label> 
								<input type="radio"
											 name="mode"
                       class="bounce-radio"
                       value="bounce">
								</input>
								bounce
							</label>
							<label> 
								<input type="radio"
											 name="mode"
                       class="forward-radio"
                       value="forward">
								</input>
								forward
							</label>
						</div>
					</div>
					<div class="gottie-settings-item" role="">
						<div class="gottie-settings-label gottie-anim-label">animations</div>
						<div class="gottie-settings-item-content"> 
              <select class="gottie-src-select gottie-settings-selector"> 
              </select>
            </div>
						<div class="gottie-settings-item-content"> 
              <select class="gottie-load-select gottie-settings-selector"> 
              </select>
            </div>
					</div>
					<div class="gottie-settings-item" role="">
            <div class="gottie-settings-label gottie-speed-label">
              </div>
						<div class="gottie-settings-item-content"> 
			<input min="0.25" 
						 class="gottie-speed-slider" 
             max="2" step="0.25" type="range" value=""></input>
		</div>
					</div>
					</div>
				</div>
      </span>
<button class="gottie-control-btn gottie-fullscreen-btn" data-state="fullscreen-enter"></button>
			</div>
		</div>
	</div>
    </template>
`
document.body.appendChild(tmpl)

const animTmpl = document.createElement("template")
animTmpl.id = "gottie-anim-tmpl"
animTmpl.innerHTML = `
	<gottie-anim></gottie-anim>
`

document.body.appendChild(animTmpl)


const go = new Go();
WebAssembly.instantiateStreaming(fetch("/gottie/gottie-player.wasm"), go.importObject)
	.then(r => {
		try {
			const result = go.run(r.instance);
      window.GottiePlayer = new gottiePlayer();
		} catch (runError) {
			console.error("Go.run error:", runError);
		}
	})
	.catch(err => {
	console.error("WASM loading error:", err);
})
  .then(idk => {
});

