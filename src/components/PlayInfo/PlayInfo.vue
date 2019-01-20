<template functional>
	<div class="play-info">
		<h2>How to play</h2>
		<span><code>↑</code> : Rotate tetris</span>
		<span><code>→</code> : Move tetris to the right</span>
		<span><code>↓</code> : Move tetris to the bottom faster</span>
		<span><code>←</code> : Move tetris to the left</span>
	</div>
</template>

<style scoped>
.play-info {
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 22px;
  color: white;
  grid-gap: 20px;
}
</style>
