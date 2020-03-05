var app1=new Vue({
	el:"#appdd",
	data:{
		flag:false,
		kgflag:false,
		time:'22'
	},
	methods:{
		change(){
			
			if (this.kgflag==true) {
				
				this.$http.get('http://139.9.213.227:7000/test1').then(result =>{})
			} else if(this.kgflag==false){
				this.$http.get('http://139.9.213.227:7000/test2').then(result =>{})
			}
		},
		changeStatus: function($event,num){
				if ($event==true) {
					
					this.$http.get('http://139.9.213.227:7000/test1').then(result =>{})
				} else if($event==false){
					this.$http.get('http://139.9.213.227:7000/test2').then(result =>{})
				}
			}
	},
	beforeCreate(){
		this.$http.get('http://139.9.213.227:7000/test3').then(res=>{
			if(res.body=="open"){
				this.kgflag=true
				this.flag=true
			}else if(res.body=="close"){
				this.kgflag=false
				this.flag=true
			}else{
				this.flag=false
			}
		})
		this.$http.get('http://139.9.213.227:7000/time').then(res=>{
			this.time=res.body
		})
	}
})
var app2=new Vue({
	el:"#mensuo",
	data:{
		ms:true
	}
})
$(function(){
	$("#name1").click(function(){
		$("#name1").addClass("listnamebottom")
		$("#name2").removeClass("listnamebottom")
		$("#name3").removeClass("listnamebottom")
		$("#cl").addClass("weitiao")
		$("#fs").removeClass("weitiao")
		app2.ms=true
	})
	$("#name2").click(function(){
		$("#name2").addClass("listnamebottom")
		$("#name1").removeClass("listnamebottom")
		$("#name3").removeClass("listnamebottom")
		$("#cl").removeClass("weitiao")
		$("#fs").addClass("weitiao")
		app2.ms=false
	})
	$("#name3").click(function(){
		$("#name3").addClass("listnamebottom")
		$("#name2").removeClass("listnamebottom")
		$("#name1").removeClass("listnamebottom")
		$("#cl").removeClass("weitiao")
		$("#fs").addClass("weitiao")
		app2.ms=false
	})
	setInterval(function(){
		
					$.ajax({
						type:"get",
						url:"http://139.9.213.227:7000/test3",
						success:function(res){
							if (res=="open") {
								app1.flag=true
								app1.kgflag=true
								
							} else if(res=="close"){
								app1.flag=true
								app1.kgflag=false
							}else if(res=="fail"){
								app1.flag=false
							}
						}
					});
				},1500)
	setInterval(function(){
		
					$.ajax({
						type:"get",
						url:"http://139.9.213.227:7000/time",
						success:function(res){
							app1.time=res
						}
					});
				},1000)
    
})