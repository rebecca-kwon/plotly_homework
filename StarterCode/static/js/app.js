// populates meta data 
function demInfo(sample)
{
    // console.log(sample);

    d3.json("samples.json").then((data)=> {
       let metaData=data.metadata;
    //    console.log(metaData);     

        // filter
        let result=metaData.filter(sampleResult => sampleResult.id==sample);

        // console.log(result);

        let resultData=result[0];
        // console.log(resultData);


        //clear before appending 
        d3.select('#sample-metadata').html("")


        Object.entries(resultData).forEach(([key, value])=>{
            d3.select('#sample-metadata')
                .append("h5").text(`${key}: ${value}`);
        })

    });
}


// builds bar graphs 
function buildBar(sample)
{
    // console.log(sample);
    d3.json("samples.json").then((data)=> {
        let sampleData=data.samples;
        // console.log(sampleData);

         // filter
         let result=sampleData.filter(sampleResult => sampleResult.id==sample);
 
         // console.log(result);
 
         let resultData=result[0];
         // console.log(resultData);
 
        
        let otu_ids=resultData.otu_ids;
        let otu_labels=resultData.otu_labels;
        let sampleValues=resultData.sample_values;

        let yticks=otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xvals=sampleValues.slice(0,10);
        let txtlabels=otu_labels.slice(0,10);

        let barChart={
            y: yticks.reverse(),
            x: xvals.reverse(),
            text: txtlabels.reverse(),
            type: "bar",
            orientation:"h"
        }

        let layout={
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar",[barChart],layout);
 
     });
}

// builds bubble graphs 
function buildBubble(sample)
{
    // console.log(sample);
    d3.json("samples.json").then((data)=> {
        let sampleData=data.samples;
        // console.log(sampleData);

         // filter
         let result=sampleData.filter(sampleResult => sampleResult.id==sample);
 
         // console.log(result);
 
         let resultData=result[0];
         // console.log(resultData);
 
        
        let otu_ids=resultData.otu_ids;
        let otu_labels=resultData.otu_labels;
        let sampleValues=resultData.sample_values;

        let bubbleChart={
            y: sampleValues,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker:{
                size: sampleValues,
                color:otu_ids,
                colorscale:"Earth"
            }
        }

        let layout={
            title: "Bacteria Cultures Per Sample",
            hovermode:"closest",
            xaxis:{title:"OTU ID"}
        };

        Plotly.newPlot("bubble",[bubbleChart],layout);
 
     });
}

// initialize dashboard
function initialize()
{
    // access dropdown 
    var select = d3.select("#selDataset");

    //get data 
    d3.json("samples.json").then((data)=> {
        let sampleNames=data.names;
        // console.log(sampleNames)
    
        sampleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value",sample);
        });

      //first sample 
      let firstSample=sampleNames[0];

      demInfo(firstSample)

      buildBar(firstSample);
      buildBubble(firstSample);
    });

  
}


// updates dashboard
function optionChanged(item)
{
    //prints item 
    demInfo(item);
    // console.log(item);
    buildBar(item);
    buildBubble(item);
}


initialize();
