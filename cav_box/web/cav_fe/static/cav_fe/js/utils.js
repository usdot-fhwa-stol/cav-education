function removeArryElementbyName(array, element_name)
{
    let index = 0;
    array.forEach(ele=>{
        if(ele.label.includes(element_name))
        {
            array.splice(index,1);
        }
        index++;
    })
}


function removeArryElementDatabyName(array, element_name)
{
    array.forEach(ele=>{
        if(ele.label.includes(element_name))
        {
            ele.data=[];
        }
    })
}

function removeDatasetsFirstElementDatabyName(array, element_name)
{
    array.forEach(ele=>{
        if(ele.label.includes(element_name))
        {
            ele.data.shift();
        }
    })
}

function updateArryElementDataCountbyName(array, element_name, count)
{
    array.forEach(ele=>{
        if(ele.label.includes(element_name))
        {
            ele.data.push(count);
        }
    })
}
