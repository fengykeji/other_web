<template>
  <div id="app">

  <!--<div class="header">
				<a class="back" href="javascript:history.back(-1)"><</a>
				<ul>
						<li>
							<a href="#">项目</a>
						</li>
						<li>
							<a href="#">分析</a>
						</li>
				</ul>
			<a href="#"class="share" ></a>
			</div>-->
  		<div id="main_content">
  			<router-view/>
 		 </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return{
  		show:false
  	}
  },
  methods:{
  	ajustScreen(){
  		if((screen.height>800)&&(screen.width<600)){
  			var app=document.querySelector("#app");
  			app.style.height=screen.height-100+"px";
  			app.style.marginTop="50px";
  			app.style.marginBottom="50px";
  		}else{
  			var app=	document.querySelector("#app");
  			app.style.height=screen.height+"px";
  			app.style.marginTop="0px";
  			app.style.marginBottom="0px";
  		}
  	}
  },
  created(){
  	
  },
  mounted(){
  	// this.ajustScreen();
  }
}
</script>

<style scoped>
/* @media only screen and (width: 320px) {
  html {
    font-size: 16px;
  }
}
@media only screen and (width: 360px) {
  html {
    font-size: 18px;
  }
}
@media only screen and (width: 375px) {
  html {
    font-size: 18.75px;
  }
}
@media only screen and (width: 400px) {
  html {
    font-size: 20px;
  }
}
@media only screen and (width: 412px) {
  html {
    font-size: 20.55px;
  }
}
@media only screen and (width: 414px) {
  html {
    font-size: 20.7px;
  }
}
@media only screen and (min-width: 600px) {
  html {
    font-size: 30px;
  }
}
@media only screen and (min-width: 640px) {
  html {
    font-size: 32px;
  }
}
@media only screen and (min-width: 768px) {
  html {
    font-size: 38.4px;
  }
 }
@media only screen and (min-width: 1024px) {
  html {
    font-size: 51.2px;
  }
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
}
body,
div,
li,
img,
h2,
h3,
h4,
h5,
ul,
dl,
dt,
dd,
p {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-align: left;
}
body {
  font-family: roman, Arial, Helvetica, sans-serif;
  -webkit-text-size-adjust: none;
  display: block;
 
}
h2,
h3,
h4,
h5 {
  font-weight: bold;
  text-align: left;
}
font,p{
	text-align: left;
}

ul {
  list-style: none;
}
a {
  display: block;
  text-decoration: none;
  color:#333;
}
img {
  display: block;
  width: 100%;
}
::before,
::after{
    content:'';
    display: block;
    line-height: 0;
    height: 0;
    visibility: hidden;
    clear: both;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
	display: block;
  overflow: scroll;
}
#app .safe_block{
	float:left;
	width:100%;
	height:50px;
}
#app .header{
	width:100%;
	height:2.1875rem;
	background: #fff;
}
#app ul{
	float:left;
	width:60%;
	display: flex;
}
#app  li{
	float:left;
	height:2.1875rem;
	padding:0px 10px;
	flex:1;
}
#app a{
	float:left;
	width:40px;
	font-size: 1rem;
	font-weight:500;
	height:2.1875rem;
	line-height:2.1875rem;
	color:#666;
}
#app ul li a{
	width:2rem;
}
#app .back{
	width:20%;
	padding-left:0.5rem;
	font-size: 26px;
}
#app .share{
	width:40px;
	float:right;
	height:2.4375rem;
	background: url(./assets/share.gif) no-repeat;
	height:2rem;
	margin-right:0.125rem;
	margin-top:0.125rem;
}
#app li:nth-child(1) a{
	font-weight: bold;
	border-bottom: 2px solid blue;
} */
</style>
