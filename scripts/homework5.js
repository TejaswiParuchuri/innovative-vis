
var mapSvg;
var legendCountry;
var div;
var lineInnerHeight;
var lineInnerWidth;

var plot;
var xScale;
var yScale;

var svg;
var colorSvg;
var root;
var node;
var label;
var focus;
var label_child;
var flight_data;
var div;
let view;
var dogs_selected=[]

var months={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}


var dogs_colormap={"Dezik":"#CD5C5C","Tsygan":"#FF4500","Lisa":"#FFFF00","Chizhik":"#EE82EE","Mishka":"#FF00FF","Ryzhik":"#ADFF2F","Smeliy":"#E0FFFF","Neputeviy":"#0000FF","ZIB":"#F4A460","Lisa-2":"#228B22","Ryzhik-2":"#722F37","Damka":"#ff9900","Mishka-2":"#990099","Ryzhik-3":"#FE28A2","Rita":"#e4181e","Linda":"#073980","Bulba":"#fd5c63","Knopka":"#48D1CC","Malyshka":"#3EB489","Albina":"#BA55D3","Kozyavka":"#39FF14","Damka-2":"#800080","Dzhoyna":"#F8F8FF","Ryzhaya":"#DB7093","Belka":"#4D4DFF","Modnitsa":"#9ACD32","Laika":"#C71585","Palma":"#E6E6FA","Pushok":"#8DA399","Kusachka / Otvazhnaya":"#8A2BE2","Palma-2":"#99FFFF","Belyanka":"#55DD33","Pestraya":"#B31B1B","Zhulba":"#545AA7","Snezhinka / Zhemchuzhnaya":"#FFC72C","Malyok":"#50C878","Lisichka":"#002244","Bars / Chaika":"#c8102E","Strelka":"#F0E68C","Neva":"#5D8AA8","Mushka":"#DADD98","Pchyolka":"#AFDBF5","Shutka":"#FF0800","Chernuskha":"#6B8E23","Kometka":"#81D8D0","Zvezdochka":"lightgrey","Ugolyok / Snezhok":"#FFD700","Veterok / Bzdunok":"#D8BFD8"}

var dogs_colormap1={"Dezik":"#CD5C5C","Tsygan":"#FF4500","Lisa":"#FFFF00","Chizhik":"#EE82EE","Mishka":"#FF00FF","Ryzhik":"#ADFF2F","Smeliy":"#E0FFFF","Neputeviy":"#0000FF","ZIB":"#F4A460","Lisa-2":"#228B22","Ryzhik-2":"#722F37","Damka":"#ff9900","Mishka-2":"#990099","Ryzhik-3":"#FE28A2","Rita":"#e4181e","Linda":"#073980","Bulba":"#fd5c63","Knopka":"#48D1CC","Malyshka":"#3EB489","Albina":"#BA55D3","Kozyavka":"#39FF14","Damka-2":"#800080","Dzhoyna":"#F8F8FF","Ryzhaya":"#DB7093"}

var dogs_colormap2={"Belka":"#4D4DFF","Modnitsa":"#9ACD32","Laika":"#C71585","Palma":"#E6E6FA","Pushok":"#8DA399","Kusachka / Otvazhnaya":"#8A2BE2","Palma-2":"#99FFFF","Belyanka":"#55DD33","Pestraya":"#B31B1B","Zhulba":"#545AA7","Snezhinka / Zhemchuzhnaya":"#FFC72C","Malyok":"#50C878","Lisichka":"#002244","Bars / Chaika":"#c8102E","Strelka":"#F0E68C","Neva":"#5D8AA8","Mushka":"#DADD98","Pchyolka":"#AFDBF5","Shutka":"#FF0800","Chernuskha":"#6B8E23","Kometka":"#81D8D0","Zvezdochka":"lightgrey","Ugolyok / Snezhok":"#FFD700","Veterok / Bzdunok":"#D8BFD8"}

var lineMargin = { top: 20, right: 60, bottom: 40, left: 80 };

var dictionary_mapping={};
var dogs_dictionary={};

var leaf_color={"Female":"#F400A1","Male":"#4169E1"}
var fate_color={"Survived":"white","Died":"black"}

function create_dogs_dictionary(dogs_data)
{
	for(i=0;i<dogs_data.length;i++)
	{
		if(dogs_data[i]['Fate'].split(" ").length==1)
		{
			dogs_dictionary[dogs_data[i]['Name (Latin)']]={'value': dogs_data[i]['Flights'].split(",").length,'name': dogs_data[i]['Name (Latin)'], 'Gender' : dogs_data[i]['Gender'], 'Fate':dogs_data[i]['Fate'].split(" ")[0]}
		}
		else
		{
			dogs_dictionary[dogs_data[i]['Name (Latin)']]={'value' : dogs_data[i]['Flights'].split(",").length,'name': dogs_data[i]['Name (Latin)'], 'Gender' : dogs_data[i]['Gender'], 'Fate':dogs_data[i]['Fate'].split(" ")[0], 'DiedDate': dogs_data[i]['Fate'].split(" ")[1]}
		}
	}
}

function onload_change()
{
	
	svg.selectAll(".nodeCircle > *").remove();
	svg.selectAll(".colorCircle > *").remove();
	svg.selectAll("g> *").remove();
	colorSvg.selectAll("g > *").remove();
	//colorSvg.remove();
	create_dictionary(flight_data);
}

function create_mapping(date)
{
	if(dictionary_mapping['19'+date.getYear()]=== undefined)
		{
			dictionary_mapping['19'+date.getYear()]={}
			if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1] === undefined)
			{
				dictionary_mapping['19'+date.getYear()][date.getMonth()+1]={}
				if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()] === undefined)
				{
					dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()]={}
				}
			}
			else{
				if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()] === undefined)
				{
					dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()]={}
				}
			}
		}
		else{
			if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1] === undefined)
			{
				dictionary_mapping['19'+date.getYear()][date.getMonth()+1]={}
				if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()] === undefined)
				{
					dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()]={}
				}
			}
			else{
				if(dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()] === undefined)
				{
					dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()]={}
				}
			}
		}
}
function create_dictionary(flight_data)
{
	let gender_id=document.getElementById("gender-select").value;
	let fate_id=document.getElementById("fate-select").value;
	dictionary_mapping={};
	var start_year=document.getElementById("start-select").value-1900;
	var end_year=document.getElementById("end-select").value-1900;
	dogs_selected=[];
	if (start_year>end_year)
	{
		temp=start_year;
		start_year=end_year;
		end_year=temp;
	}
	//console.log(start_year,end_year);
	for(i=0;i<flight_data.length;i++)
	{
		let date = new Date(flight_data[i]['Date']);
		date.setHours(date.getHours()+7);
		//console.log(date,date.getYear(),date.getMonth()+1,date.getDate());
		//console.log(date.getYear());
		if(date.getYear()>=start_year && date.getYear()<=end_year)
		{
		var dog_names=flight_data[i]['Dogs'].split(',');	
		if(gender_id=='All' && fate_id=='All')
		{
			dog_names.forEach(name=>
			{
				create_mapping(date);
				if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
				if(dogs_dictionary[name]["DiedDate"]=== undefined)
				{
					dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]=dogs_dictionary[name];
				}
				else
				{
					//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
					var a=new Date(dogs_dictionary[name]["DiedDate"]);
					var b=new Date(flight_data[i]['Date']);
					//console.log(a,b);
					if(a.getTime() != b.getTime())
					{
						dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': 'Survived'}
					}
					else
					{
						dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value':dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': dogs_dictionary[name]['Fate']}
					}
				}
			});
		}
		else if(gender_id=='All')
		{
			dog_names.forEach(name=>
			{
				if(fate_id=="Survived")
				{
					
					if(dogs_dictionary[name]["DiedDate"]=== undefined)
					{
						create_mapping(date);
						if(!dogs_selected.includes(name)){
							dogs_selected.push(name);}
						dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]=dogs_dictionary[name];
					}
					else
					{
						//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
						var a=new Date(dogs_dictionary[name]["DiedDate"]);
						var b=new Date(flight_data[i]['Date']);
						//console.log(a,b);
						if(a.getTime() != b.getTime())
						{
							create_mapping(date);
							if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
							dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': 'Survived'}
						}
					}
				}
				else if(fate_id=="Died" )
				{	if(dogs_dictionary[name]["DiedDate"]!= undefined)
					{
						
						//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
						var a=new Date(dogs_dictionary[name]["DiedDate"]);
						var b=new Date(flight_data[i]['Date']);
						//console.log(a,b);
						if(a.getTime() == b.getTime())
						{
							//console.log(a,b);
							create_mapping(date);
							if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
							dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': dogs_dictionary[name]['Fate']}
						}
					}
				}
				
			});
		}
		else if(fate_id=='All')
			{
			dog_names.forEach(name=>
			{
				if(dogs_dictionary[name]['Gender']==gender_id)
				{
					create_mapping(date);
					if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
					//console.log('I am here');
					if(dogs_dictionary[name]["DiedDate"]=== undefined)
					{
						dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]=dogs_dictionary[name];
					}
					else
					{
						//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
						var a=new Date(dogs_dictionary[name]["DiedDate"]);
						var b=new Date(flight_data[i]['Date']);
						//console.log(a,b);
						if(a.getTime() != b.getTime())
						{
							dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': 'Survived'}
						}
						else
						{
							dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value':dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': dogs_dictionary[name]['Fate']}
						}
					}
				}
				
			});
		}
		else
		{
			dog_names.forEach(name=>
			{
				
				if(fate_id=="Survived")
				{
				    if(dogs_dictionary[name]['Gender']==gender_id)
					{
						if(dogs_dictionary[name]["DiedDate"]=== undefined)
						{
							create_mapping(date);
							if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
							dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]=dogs_dictionary[name];
						}
						else
						{
							
							//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
							var a=new Date(dogs_dictionary[name]["DiedDate"]);
							var b=new Date(flight_data[i]['Date']);
							//console.log(a,b);
							if(a.getTime() != b.getTime())
							{
								create_mapping(date);
								if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
								dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': 'Survived'}
							}
						}
					}
				}
				else if(fate_id=="Died")
				{
					if(dogs_dictionary[name]['Gender']==gender_id)
					{
						if(dogs_dictionary[name]["DiedDate"]!= undefined)
						{
							
							//console.log(Date(dogs_dictionary[name]["DiedDate"]),Date(flight_data[i]['Date']));
							var a=new Date(dogs_dictionary[name]["DiedDate"]);
							var b=new Date(flight_data[i]['Date']);
							//console.log(a,b);
							if(a.getTime() == b.getTime())
							{
								create_mapping(date);
								if(!dogs_selected.includes(name)){
				dogs_selected.push(name);}
								dictionary_mapping['19'+date.getYear()][date.getMonth()+1][date.getDate()][name]={'value' :dogs_dictionary[name]['value'], 'name': dogs_dictionary[name]['name'], 'Gender' : dogs_dictionary[name]['Gender'], 'Fate': dogs_dictionary[name]['Fate']}
							}
						}
					}
				}
			});
		}
		}
	}
	//console.log(dogs_selected);
	draw_circles();
	draw_colorlegned();
}
function draw_colorlegned()
{
	colorSvg=d3.select('#colors').append("svg")
	.attr("width", lineWidth)
	.attr("height", lineHeight )
	.append("g")
	.attr("transform",`translate(${lineMargin.left-70},${lineMargin.top+60})`);
	
	  colorCircles=colorSvg.selectAll('.colorCircle')
	  temp_colormap1=[]
	  temp_colormap2=[]
	  for(var i in Object.keys(dogs_colormap1))
	  {
		  if(dogs_selected.includes(Object.keys(dogs_colormap1)[i]))
		  {
			  temp_colormap1.push(Object.keys(dogs_colormap1)[i]);
		  }
	  }
	  for(var i in Object.keys(dogs_colormap2))
	  {
		  if(dogs_selected.includes(Object.keys(dogs_colormap2)[i]))
		  {
			  temp_colormap2.push(Object.keys(dogs_colormap2)[i]);
		  }
	  }
	  
	  colorCircles.data(temp_colormap1,d=>d).join(enter=>{const g=enter.append("g").attr('class','colorCircle').attr("transform",(d,i)=> `translate(${10},${10+i*20})`)
	
	
	g.append('circle')
				 .style('fill',(d,i)=>dogs_colormap1[d])
				 .attr('r',8)
				 .style('stroke',"black")
	g.append('text').style("font", "12px sans-serif")
				.attr("transform",(d,i)=> `translate(${18},${5})`)
				.text(d => d); })
				
	
   colorCircles.data(temp_colormap2,d=>d).join(enter=>{const g=enter.append("g").attr('class','colorCircle').attr("transform",(d,i)=> `translate(${100},${10+i*20})`)
	
	
	g.append('circle')
				 .style('fill',(d,i)=>dogs_colormap2[d])
				 .attr('r',8)
				 .style('stroke',"black")
	g.append('text').style("font", "12px sans-serif")
				.attr("transform",(d,i)=> `translate(${18},${5})`)
				.text(d => d); })
	
	//console.log(colorCircles);
	
	colorSvg.selectAll('.colorCircle')
	.on('mousemove',function(dog_name,i) {
		
		outer_circle=svg.selectAll('.outercircle')
		.filter(function(d){return d.data.name==dog_name})
		.transition()
	    .duration(200)
		.attr("r", d => (d.r*lineWidth/view[2])+10)
		.transition()
		.duration(200)
		.attr("r",d=>(d.r*lineWidth/view[2]));	
		
		inner_circle=svg.selectAll('.innerCircle')
		.filter(function(d){return d.data.name==dog_name})
		.transition()
	    .duration(200)
		.attr("r", d => ((d.r-3)*lineWidth/view[2])+10)
		.transition()
		.duration(200)
		.attr("r",d=>((d.r-3)*lineWidth/view[2]));	
		
		
		

				
					
					}	)
	.on('mouseout',function(d,i){//create_dictionary(flight_data)
	});
	return colorSvg.node();
}

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {

  
  


    //svg = d3.select('#map');
	//colorSvg=d3.select('#colors');
	
  
    lineWidth = +d3.select('#map').style('width').replace('px','');
  lineHeight = +d3.select('#map').style('height').replace('px','');

  lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
  lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;
	//console.log(lineInnerWidth);

	
		
  
  
	div = d3.select("body").append("div")
	 .attr("class","label-map")
     .style("opacity", 0);
  
  // Load all the files before doing anything else
  Promise.all([d3.csv('data/Dogs-Database.csv'),
               d3.csv('data/Flights-Database.csv')])
          .then(function(values){
    
    dogs_data = values[0];
    flight_data = values[1];
	
	create_dogs_dictionary(dogs_data);	
	//console.log(dogs_dictionary)
	create_dictionary(flight_data);
	
	
	//console.log(d3.hierarchy(json_data).sum(d => d.value))
	
});
});

function displayData(display_data)
{
	//console.log(d3.event.pageX + 10,d3.event.pageY + 15,display_data)
	div.html(display_data)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY + 15) + "px");
}



function draw_circles()
{
	var json='{"name": "flights", "children": [ { ';
	//console.log(json);
	//console.log(dictionary_mapping);
	for(const year in dictionary_mapping)
	{
		json+='"name": '+year+', "children":[{';
		for(const month in dictionary_mapping[year])
		{
			json+='"name": '+month+', "children":[{';
			for(const day in dictionary_mapping[year][month])
			{
				json+='"name": '+day+', "children":[{';
				for(const dog in dictionary_mapping[year][month][day])
				{
					//console.log(dictionary_mapping[year][month][day][dog])
					json+=' "value": '+dictionary_mapping[year][month][day][dog]['value']+',"name": "'+dictionary_mapping[year][month][day][dog]['name']+'","Gender": "'+dictionary_mapping[year][month][day][dog]['Gender']+'","Fate": "'+dictionary_mapping[year][month][day][dog]['Fate']+  '" },{';
				}
				json=json.slice(0,-3);
				//console.log(day);
				json+='}]},{'
			}
			json=json.slice(0,-3);
		json+='}]},{'
		}
		json=json.slice(0,-3);
	json+='}]},{';
	}
	json=json.slice(0,-3);
	json+='}]}';
	//console.log(json);
	json_data=JSON.parse(json);
	
	
	pack = json_data => d3.pack()
    .size([lineWidth, lineHeight])
    .padding(8)
  (d3.hierarchy(json_data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

  color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(151,10%,90%)", "hsl(228,20%,40%)"])
    .interpolate(d3.interpolateHcl)

  root = pack(json_data);
  focus = root;
  

  //console.log(root);
  
  svg=d3.select('#map').append("svg")
		.attr("viewBox", `${-lineWidth/2} ${-lineHeight/2} ${lineWidth} ${lineHeight}`)
		   .style("display", "block")
      .style("margin", "0 -14px")
	  .style("background-color", "red")
	  .style("cursor", "pointer")
      .on("click", (event) => zoom(d3.event, root));
	  
	//console.log(svg);
		//.attr("transform",`translate(${lineMargin.left},${lineMargin.top})`);

 // console.log("url(#"+data/dog1.jpg+")");
 
 /*node=svg.selectAll('.nodeCircle')
	  
	  node.data(root.descendants().slice(1),d=>d).join(enter=>{const g=enter.append("g").attr('class','nodeCircle')
	
	g.append('circle')
	 .attr('class','outercircle')
				 .attr("fill", d => d.children ? color(d.depth): leaf_color[d.data.Gender])
				 .attr("stroke",d=>d.children ? null : fate_color[d.data.Fate])
	  .attr("stroke-width",d=>d.children?null:"2")
	  
	  g.append('circle')
				 .attr('class','innerCircle')
				 .attr('fill',d=>dogs_colormap[d.data.name]!=undefined?dogs_colormap[d.data.name]:"lightgrey")})*/


 

  zoomTo([root.x, root.y, root.r * 2]);
  
  	
	  
  return svg.node();
}

function zoomTo(v) {
    const k = lineWidth / v[2];
	
	//console.log("I am in zoom",v);
    view = v;
	
    
	/*label_child.attr("transform", d => `translate(${(d.x -v[0]) * k},${(d.y-v[1] ) * k})`);*/
	//temp=svg.selectAll('.nodeCircle);
    //temp.selectAll('.nodeCircle').selectAll('.outercircle').attr("transform", d => `translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`);
	
	node=svg.selectAll('.nodeCircle')
	  
	  node.data(root.descendants().slice(1),d=>d).join(enter=>{const g=enter.append("g").attr('class','nodeCircle')
	
	svg.selectAll('text').remove();
      
	label = svg.append("g").style("font", "sans-serif")
	  .style("font-weight","bold")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      //.style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.depth==2?months[d.data.name]:d.data.name);

	  
	g.append('circle')
	 .attr('class','outercircle')
				 .attr("fill", d => d.children ? color(d.depth): leaf_color[d.data.Gender])
				 .attr("stroke",d=>d.children ? null : fate_color[d.data.Fate])
				 .attr("transform", d => `translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`)
				 .attr("r",d=>d.r*k)
				.attr("stroke-width",d=>d.children?null:"2")
				
	g.append('circle')
				 .attr('class','innerCircle')
				 .attr('fill',d=>dogs_colormap[d.data.name]!=undefined?dogs_colormap[d.data.name]:"lightgrey")
				 .attr("transform", d => !d.children?`translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`:null)
				 .attr("r",d=>!d.children?(d.r-3)*k:null)
	},
	  update=>{
		  update.selectAll('.outercircle')
		  update.call(update => update.transition().attr('transform',(d)=> `translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`).attr("r",d=>d.r*k))
		  update.selectAll('.innerCircle')
		  update.call(update => update.transition().attr("transform", d => !d.children?`translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`:null).attr("r",d=>!d.children?(d.r-3)*k:null))
	  })
 
     	svg.selectAll('.nodeCircle')
	.on("mouseover", function(d) { 
				//console.log(d);
				d3.select(this).transition()
					   .duration('50')
					   .attr('opacity', '.85')
					   
				  div.transition()
					   .duration(500)
					   .style("opacity", 1);
					   
					   
				if(d.children)
				{
					d3.select(this).attr("stroke", "red");  
				}
				if(d.depth==1)
				{
					var display="Year: "+d.data.name;
				}
				if(d.depth==2)
				{
					var display="Year: "+d.parent.data.name+"<br/>Month: "+months[d.data.name];
				}
				if(d.depth==3)
				{
					var display="Year: "+d.parent.parent.data.name+"<br/>Month: "+months[d.parent.data.name]+"<br/>Day: "+d.data.name;
				}
				if(d.depth==4)
				{
					var display="Year: "+d.parent.parent.parent.data.name+"<br/>Month: "+months[d.parent.parent.data.name]+"<br/>Day: "+d.parent.data.name+"<br/>Dog: "+d.data.name+"<br/>Trips: "+d.data.value;
					outer_circle=svg.selectAll('.outercircle')
								.filter(function(dog){return d.data.name==dog.data.name})
								.transition()
								.duration(100)
								.attr("r", dog => (dog.r*lineWidth/view[2])+10)
								.transition()
								.duration(100)
								.attr("r",dog=>(dog.r*lineWidth/view[2]));	
								
								inner_circle=svg.selectAll('.innerCircle')
								.filter(function(dog){return d.data.name==dog.data.name})
								.transition()
								.duration(100)
								.attr("r", dog => ((dog.r-3)*lineWidth/view[2])+10)
								.transition()
								.duration(100)
								.attr("r",dog=>((dog.r-3)*lineWidth/view[2]));	
					
				}
				displayData(display);
			})
      .on("mouseout", function(d) { 
				d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
	  div.transition()
               .duration(50)
               .style("opacity", 0);
				if(d.children){d3.select(this).attr("stroke", null); }})
	  
      .on("click", d => focus !== d && d.depth!=4 && (zoom(d3.event, d), d3.event.stopPropagation()));
	  
	    
	  
    //svg.selectAll('.nodeCircle').selectAll('.outercircle')("r", d => (d.r * k));
	
	//circle_child.attr("transform", d => !d.children?`translate(${(d.x-v[0] ) * k},${(d.y-v[1] ) * k})`:null)
	//circle_child.attr("r",d=>!d.children?((d.r-4) * k):null)
	
	  
	  
	label.attr("transform", d => d.depth==4?`translate(${(d.x-v[0] ) * k},${(d.y-v[1]-d.r+10 ) * k})`:`translate(${(d.x-v[0] ) * k},${(d.y-v[1]-d.r+20 ) * k})`);
}


function zoom(event, d) {
 
    const focus0 = focus;
	
	
    focus = d;

    const transition = svg.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });
    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }