import "./wasm_exec.js"
import "./dotlottie.js"

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
	//customElements.define("gottie-anim", GottieAnim);
});


