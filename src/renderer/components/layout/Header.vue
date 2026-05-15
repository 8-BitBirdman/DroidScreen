<template>
	<el-header>
		<span>{{ title }}</span>
	</el-header>
</template>

<script>
export default {
	name: 'LayoutHeader',
	data() {
		return {
			title: 'DroidScreen',
		}
	}
}
</script>

<style>
.el-header {
	-webkit-app-region: drag;
	height: 5.2vh !important;
	text-align: center;
	background-color: #0d0d0d;
	color: #fff;
	font-size: 22px;
	font-weight: 500;
	letter-spacing: 1px;
	line-height: 4.6vh;
	border-bottom: 1px solid #222;
}
.handle-bar {
	-webkit-app-region: no-drag;
}
</style>
