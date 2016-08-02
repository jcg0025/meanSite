
document.addEventListener('DOMContentLoaded', function(){
    //Get all instances of <tbody>
    var data = document.getElementsByTagName('tbody');

    //Find the table you want in this case index 1 of the data array
    for (var i = 0; i < data.length; i++) {
        console.log(data);
        var table = data[1];
    }

    //Get table rows
    var cells = table.getElementsByTagName('tr');
    console.log('rows: '+cells.length);

    //Set up arrays
    var riverCodes = [];
    var rawNames = [];

    //Iterate over each row
    for (var i = 1; i < cells.length; i++) {
        var row = cells[i];

        var td = row.getElementsByTagName('td');
        // console.log(td);
        //Anchor containing the river number
        if (td.length > 1) {
            var aTag = td[0].getElementsByTagName('a');
        
        //Check to see if anchor exists
        if (aTag.length > 0) { 

            //Trim the fat
            // if (i <= 209) {
                riverCodes.push(aTag[0].innerHTML);
                // console.log('code '+aTag[0].innerHTML);
                var riverName = td[1].innerHTML;
                rawNames.push(riverName);
            // }
        }  
        } 
    }
    var riverNames = [];
    for (var i = 0; i < rawNames.length; i++) {
        var name = rawNames[i];
        var prettyName = name.slice(6, -6);
        riverNames.push(prettyName);
    }

    var objectArray = [];
    for (var i=0; i < riverCodes.length; i++) {
        if (riverCodes.length == riverNames.length) {
           var river = {
               name: riverNames[i],
               code: riverCodes[i]
           }
           var jriver = JSON.stringify(river)
           objectArray.push(jriver);
        }
    }
    var list = document.getElementsByClassName('list');
    console.log(list);
    for (var i = 0; i < objectArray.length; i++) {
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(objectArray[i]+",");         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("list").appendChild(node);
        
    }
    console.log('check: '+riverNames.length);

});

//HTML TO APPEND TO<div id="data">
// <div>
//     <ul style='list-style: none; display: inline-block' id='list'>
        
//     </ul>
// </div>