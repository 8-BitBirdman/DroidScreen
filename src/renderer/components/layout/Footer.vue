<template>
	<el-footer>
		<span>Powered by <a @click="$openExternal('https://electronjs.org')" class="footer-link">Electron</a> &amp; <a @click="$openExternal('https://github.com/Genymobile/scrcpy')" class="footer-link">scrcpy</a> &nbsp;— DroidScreen</span>
	</el-footer>
</template>

<script>
export default {
	name: 'LayoutFooter'
}
</script>

<style>
.el-footer {
	height: 7vh !important;
	background-color: #0d0d0d;
	border-top: 1px solid #222;
	clear: both;
	overflow: hidden;
	line-height: 7vh;
	font-size: 15px;
	text-align: center;
	color: #888;
}
.footer-link {
	transition: all 0.3s;
	color: #aaa;
}
.footer-link:hover {
	font-size: 16px;
	color: #fff;
}
</style>
